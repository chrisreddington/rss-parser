// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
const core = require("@actions/core");
const github = require("@actions/github");

// Setup packages to enable the fetching of RSS feeds and parsing of XML.
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// itemCount is used for test purposes
let itemCount = 0;

// Function to check that the provided URL is 
// valid (and begins with http or https)
async function check_url(feed_url) {
  try {
    url = new URL(feed_url);
    
    // Check that the URL begins with http or https
    if (url.protocol !== "http:" && url.protocol !== "https:") {   
      core.setFailed(`URL does not begin with http or https: ${input}`);
    }
  } catch (_) {
    core.setFailed(`${feed_url} is not a valid URL`);
  }
}

async function create_branch(octokit, itemObject, config) {
  try {
    const branch = await octokit.rest.git.getRef({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `heads/${itemObject.slug}`,
    });

    // If the branch already exists, use the existing reference
    core.info(`Branch ${itemObject.slug} already exists, using existing reference.`);
    return branch;
  } catch (error) {
    // If the branch doesn't exist (i.e. not found), create it
    try {
      return await octokit.rest.git.createRef({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: `refs/heads/${itemObject.slug}`,
        sha: github.context.sha,
      });
    } catch (error) {
      core.setFailed(`GitHub branch was not created: ${error}`);
    }
  }
}

async function create_issue(octokit, itemObject) {
  try {
    // TODO: Check if the issue already exists
    // TODO: Use a custom template for the issue body
    octokit.rest.issues.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: itemObject.title,
      body: `# ${itemObject.url}
      
      [Read more](${itemObject.url})`,
    });
  } catch (error) {
    core.setFailed(`GitHub issue was not created: ${error}`);
  }
}

async function create_or_update_file(octokit, itemObject, config, branch) {
  try {
    // Check if the file already exists
    const file = await octokit.rest.repos.getContent({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      path: `${config.subfolder}${itemObject.slug}${config.extension}`,
      ref: `refs/heads/${itemObject.slug}`,
    });

    core.info(`File ${itemObject.slug} already exists, doing nothing.`);
  } catch (error) {
    // If the file doesn't exist, create it
    try {
      return octokit.rest.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: `${config.subfolder}${itemObject.slug}${config.extension}`,
        message: `Create file for ${itemObject.title}`,
        content: Buffer.from(
          `${itemObject.title} - Check more at ${itemObject.url}`
        ).toString("base64"),
        branch: itemObject.slug,
      });
    } catch (error) {
      core.setFailed(`GitHub file was not created: ${error}`);
    }
  }
}

async function create_pull_request(octokit, itemObject, config) {
  try {
    const pullRequest = await octokit.rest.pulls.list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      head: `${github.context.repo.owner}:${itemObject.slug}`,
      base: "main",
    });

    // If the pull request exists, return it
    if (pullRequest.data.length > 0) {
      core.info(
        `Pull request for ${itemObject.slug} already exists, using existing reference.`
      );
      return pullRequest;
    }

    // If the pull request doesn't exist, create it
    return octokit.rest.pulls.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: itemObject.title,
      head: itemObject.slug,
      base: "main",
      sha: github.context.sha,
    });
  } catch (error) {
    core.setFailed(`GitHub pull request was not created: ${error}`);
  }
}

// Function to fetch the RSS feed from the provided
// URL and parse the XML into a DOM object
async function fetch_feed(feed_url) {
  try {
    const response = await got(feed_url);
    const feedOutput = new JSDOM(response.body, { contentType: "text/xml" });
    const items = feedOutput.window.document.querySelectorAll("item");
    return items;
  } catch (error) {
    core.setFailed(`An error occurred while fetching the RSS feed: ${error}`);
  }
}

// Function to parse the RSS feed and take appropriate action
async function parse_feed(octokit, items, config) {
  // Initialise an empty array to hold the output
  let output = [];

  // Loop through each item found in the RSS feed
  [...items].forEach(async (item) => {
    // Increment itemCount for test purposes
    this.itemCount++;

    // Get the slug from the item URL
    // If the last item in the array is empty, use the second to last item
    // Otherwise, use the default of last item.
    let slugArray = item.querySelector("link").textContent.split("/");
    let slug = slugArray[slugArray.length - 1];
    if (slugArray[slugArray.length - 1] === "") {
      slug = slugArray[slugArray.length - 2];
    }

    // If the config contains a branch prefix, prepend it to the slug name
    if (config.branch_prefix !== "") {
      slug = `${config.branch_prefix}-${slug}`;
    }

    // Create an object to hold the item data
    let itemObject = {
      title: item.querySelector("title").textContent,
      url: item.querySelector("link").textContent,
      slug: slug,
    };

    // Take appropriate action based on the script_output config
    switch (config.script_output) {
      case "issue":
        const issue = await create_issue(octokit, itemObject);
        break;
      case "json":
        output = [...output, itemObject];
        break;
      case "pull_request":
        const branch = await create_branch(octokit, itemObject, config);
        const file = await create_or_update_file(
          octokit,
          itemObject,
          config,
          branch
        );
        const pull_request = await create_pull_request(
          octokit,
          itemObject,
          file
        );
        break;
    }
  });

  // If the script_output is json, output the array of objects
  if (config.script_output === "json") {
    console.log(output);
    core.setOutput("items", output);
  }
}

module.exports = {
  check_url,
  fetch_feed,
  parse_feed,
  itemCount,
};

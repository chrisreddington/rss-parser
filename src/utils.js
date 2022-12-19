// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
const core = require('@actions/core');
const github = require('@actions/github');

// Setup packages to enable the fetching of RSS feeds and parsing of XML.
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let itemCount = 0;

async function check_url(feed_url) {
  // Check that the provided URL is valid
  try {
    url = new URL(feed_url);
  
    if (url.protocol === "http:" || url.protocol === "https:") {
    } else {
      core.setFailed(`URL does not begin with http or https: ${input}`);
    }
  } catch (_) {
    core.setFailed(`URL is not valid: ${feed_url}`);
  }
}

async function fetch_feed(feed_url) {
  // Fetch the RSS feed from the provided URL
  try {
    const response = await got(feed_url);
    const feedOutput = new JSDOM(response.body, {contentType: "text/xml"});
    const items = feedOutput.window.document.querySelectorAll("item");
    return items;
  } catch (error) {
    core.setFailed(`An error occurred while fetching the RSS feed: ${error}`);
  }
}

async function parse_feed(octokit, items, config) {
  let output = [];

  [...items].forEach(async (item) => {
    this.itemCount++;

    // Get the slug from the URL
    let slug;
    let slugArray = item.querySelector("link").textContent.split("/");

    // If the last item in the array is empty, use the second to last item
    // Otherwise, use the last item
    if (slugArray[slugArray.length - 1] === ""){
      slug = slugArray[slugArray.length - 2]
    } else {
      slug = slugArray[slugArray.length - 1]
    }    

    // If the config contains a branch prefix, add it to the slig name
    if (config.branch_prefix !== "") {
      slug = `${config.branch_prefix}-${slug}`;
    }

    // Create an object of item and url
    let itemObject = {
      title: item.querySelector("title").textContent,
      url: item.querySelector("link").textContent,
      slug: slug
    };

    if (config.script_output === "issue") {
      try {
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
    } else if (config.script_output === "json") {
      try {
        // Add that item to the array
        output.push(itemObject);
      } catch (error) {
        core.setFailed(`JSON output was not created: ${error}`);
      }
    } else if (config.script_output === "pull_request") {
      const branch = await create_branch(octokit, itemObject, config);
      const file = await create_or_update_file(octokit, itemObject, config, branch);
      const pull_request = await create_pull_request(octokit, itemObject, file);
    }
  });

  if (config.script_output === "json") {
    // Return the array of items
    console.log(output);
    core.setOutput("items", output);
  }
}

async function create_branch(octokit, itemObject, config) {
  // Check if the branch already exists
  try {
    const branch = await octokit.rest.git.getRef({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `heads/${itemObject.slug}`
    });

    core.info(`Branch ${itemObject.slug} already exists, using existing reference.`);

    // If the branch exists, return it
    return branch;
  } catch (error) {
    // If the branch doesn't exist, create it
    try {
      return await octokit.rest.git.createRef({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: `refs/heads/${itemObject.slug}`,
        sha: github.context.sha
      });
    } catch (error) {
      core.setFailed(`GitHub branch was not created: ${error}`);
    }
  }  
}

async function create_or_update_file(octokit, itemObject, config, branch) {
  // Use octokit to create a new file in the new branch
  // Base 64 encode the content

  // If the subfolder is empty, don't add a slash
  if (config.subfolder === "") {
    config.subfolder = "";
  } else {
    // If the sub folder already has a slash, don't add another
    if (config.subfolder[config.subfolder.length - 1] !== "/") {
      config.subfolder = `${config.subfolder}/`;
    }
  }

  // Check that the extension begins with a dot
  if (config.extension[0] !== ".") {
    config.extension = `.${config.extension}`;
  }

  try {
    return octokit.rest.repos.createOrUpdateFileContents({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      path: `${config.subfolder}${itemObject.slug}${config.extension}`,
      message: `Create file for ${itemObject.title}`,
      content: Buffer.from(`${itemObject.title} - Check more at ${itemObject.url}`).toString('base64'),
      branch: itemObject.slug
    });
  } catch (error) {
    core.setFailed(`GitHub file was not created: ${error}`);
  }
}

async function create_pull_request(octokit, itemObject, config, file) {
  // Use octokit to create a new pull request
  try {

    // Check if pull request already exists between the branch and main
    const pullRequest = await octokit.rest.pulls.list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      head: `${github.context.repo.owner}:${itemObject.slug}`,
      base: "main"
    });

    // If the pull request exists, return it
    if (pullRequest.data.length > 0) {
      core.info(`Pull request for ${itemObject.slug} already exists, using existing reference.`);
      return pullRequest;
    }

    // If the pull request doesn't exist, create it
    return octokit.rest.pulls.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: itemObject.title,
      head: itemObject.slug,
      base: "main",
      sha: github.context.sha
    });
  } catch (error) {
    core.setFailed(`GitHub pull request was not created: ${error}`);
  }
}

module.exports = {
  check_url,
  fetch_feed,
  parse_feed,
  itemCount
};
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

async function create_branch(octokit, branch_name, config) {
  try {
    const branch = await octokit.rest.git.getRef({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `heads/${branch_name}`,
    });

    // If the branch already exists, use the existing reference
    core.info(`Branch ${branch_name} already exists, using existing reference.`);
    return branch;
  } catch (error) {
    // If the branch doesn't exist (i.e. not found), create it
    try {
      return await octokit.rest.git.createRef({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: `refs/heads/${branch_name}`,
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
        const branch = await create_branch(octokit, itemObject.slug, config);
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

async function check_last_parsed(feed_url, octokit, items, config) {
  // Function to create or update the last_parsed file
  let config_branch = `${config.branch_prefix}-config`;
  let last_parsed_file = {
    data: {
      content: ""
    }
  }
  let last_parsed_object = {
    date: new Date().toISOString(),
    feed_url: feed_url,
    subfolder: config.subfolder,
    script_output: config.script_output,
    branch_prefix: config.branch_prefix,
    extension: config.extension,
  };

  
  try {
    // Get the last parsed file
    last_parsed_file = await octokit.rest.repos.getContent({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      path: config.last_parsed_file,
      branch: config_branch,
    });

    core.debug("Last parsed file exists. Performing checks.");
  } catch (error) {
    core.debug(`Error: ${error} - Attempting to create config file...`);
    let last_parsed_array = [last_parsed_object];

    let branch = await create_branch (octokit, config_branch, config);

    if (branch !== null){
      // Write the new array to the file
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: `${config.last_parsed_file}`,
        message: `Initialise the last-parsed config file ${config.last_parsed_file}`,
        content: Buffer.from(JSON.stringify(last_parsed_array)).toString(
          "base64"
        ),
        branch: config_branch,
      });
  
      last_parsed_file.data.content = Buffer.from(JSON.stringify(last_parsed_array)).toString(
        "base64"
      );
      return JSON.stringify(last_parsed_array);
    }
  }

  try {
    // Get contents of last parsed file
    const last_parsed_file_contents = Buffer.from(
      last_parsed_file.data.content,
      "base64"
    ).toString();
    
    // Assume the file contains a valid JSON array
    let last_parsed_raw = JSON.parse(last_parsed_file_contents);
    last_parsed_array = last_parsed_raw.map((item) => JSON.parse(item));

    // Check if the array contains an item with all of the same properties except the date
    const last_parsed_item = last_parsed_array.find(
      (item) =>
        item.feed_url === last_parsed_object.feed_url &&
        item.subfolder === last_parsed_object.subfolder &&
        item.script_output === last_parsed_object.script_output &&
        item.branch_prefix === last_parsed_object.branch_prefix &&
        item.extension === last_parsed_object.extension
    );

    let last_parsed_date;

    // If the array contains an item with all of the same properties except the date, update the date
    if (last_parsed_item) {
      last_parsed_date = new Date(last_parsed_item.date);
    } else {
      // Set last_parsed_date to the current time
      last_parsed_date = new Date(); 
    }

    // Sort the items by date
    items = items.sort((a, b) => {
      return new Date(b.querySelector("pubDate").textContent) - new Date(a.querySelector("pubDate").textContent);
    });

    // Get the date of the last item in the RSS feed
    const last_item_date = new Date(
      [...items][items.length - 1].querySelector("pubDate").textContent
    );

    // If the last parsed date is after the last item date, exit the script
    if (last_parsed_date > last_item_date) {
      core.debug("The last parsed date is after the last item date. No need to process the posts.");
      return "no_need_to_process";
    }
  } catch (error) {
    core.setFailed(`Encountered an issue when checking last parsed config: ${error}`);
  }
}

async function update_last_parsed(feed_url, octokit, config) {
  let config_branch = `${config.branch_prefix}-config`;
  try {
    // Get the last parsed file
    const last_parsed_file = await octokit.rest.repos.getContent({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      path: `${config.last_parsed_file}`,
      branch: config_branch
    });
  
    // Get contents of last parsed file
    const last_parsed_file_contents = Buffer.from(
      last_parsed_file.data.content,
      "base64"
    ).toString();

    // Assume the file contains a valid JSON array
    let last_parsed_raw = JSON.parse(last_parsed_file_contents);
    last_parsed_array = last_parsed_raw.map((item) => JSON.parse(item));

    // Check if the array contains an item with all of the same properties except the date
    const last_parsed_item = last_parsed_array.find(
      (item) =>
        item.feed_url === feed_url &&
        item.subfolder === config.subfolder &&
        item.script_output === config.script_output &&
        item.branch_prefix === config.branch_prefix &&
        item.extension === config.extension
    );

    // If the array contains an item with all of the same properties except the date, update the date
    if (last_parsed_item) {
      last_parsed_item.date = new Date().toISOString();
    }

    // Write the new array to the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      path: `${config.last_parsed_file}`,
      message: `Update the last-parsed config file ${config.last_parsed_file}`,
      content: Buffer.from(JSON.stringify(last_parsed_array)).toString(
        "base64"
      ),
      branch: `config_branch`,
    });

    return JSON.stringify(last_parsed_array);
  } catch (error) {
    core.setFailed(`Encountered an issue when updating last parsed config: ${error}`);
  }
}

module.exports = {
  check_last_parsed,
  check_url,
  fetch_feed,
  parse_feed,
  update_last_parsed,
  itemCount,
};

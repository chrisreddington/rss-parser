// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
import * as core from '@actions/core';
import * as github from '@actions/github';

// Setup packages to enable the fetching of RSS feeds and parsing of XML.
import got from 'got';
import { JSDOM } from 'jsdom';

// itemCount is used for test purposes
let itemCount = 0;
let current_parse_date;

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
      ref: `refs/heads/${itemObject.slug}`,
      path: `${config.subfolder}${itemObject.slug}${config.extension}`
    });

    core.info(`File ${itemObject.slug} already exists, doing nothing.`);
  } catch (error) {
    // If the file doesn't exist, create it
    try {
      return octokit.rest.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        branch: itemObject.slug,
        path: `${config.subfolder}${itemObject.slug}${config.extension}`,
        content: Buffer.from(
          `${itemObject.title} - Check more at ${itemObject.url}`
        ).toString("base64"),
        message: `Create file for ${itemObject.title}`,
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
      head: itemObject.slug,
      sha: github.context.sha,
      base: "main",
      title: itemObject.title,
      message: `👀 This pull request requires your attention.
      
      Review the [${config.feed_url}](${config.feed_url}) feed's new item: [${itemObject.title}](${itemObject.url}). 
      
      Decide whether you want to add this item to your repository or not. 
      
      - ✅ If you decide to add it, please merge this pull request.
      - ❌ If you decide not to add it, please close this pull request.`,
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
    current_parse_date = new Date();
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
  // Instantiate variables
  let config_last_parsed_records_file;
  let config_last_parsed_records_content;

  // Initialise variables
  let config_branch = `${config.branch_prefix}-config`;
  let is_new_config_last_parsed_record = false;
  let local_config_last_parsed_record = {
    branch_prefix: config.branch_prefix,
    date: new Date().toISOString(),
    extension: config.extension,
    feed_url: feed_url,
    script_output: config.script_output,
    subfolder: config.subfolder
  };

  // Check that the last parsed file exists
  try {
    // Get the last parsed file
    config_last_parsed_records_file = await octokit.rest.repos.getContent({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `refs/heads/${config_branch}`,
      path: config.last_parsed_file,
    });

    // Get the data from the config last parsed record
    config_last_parsed_records_content = config_last_parsed_records_file.data.content;
    core.debug("[check_last_parsed] Last parsed file exists for this configuration. Performing checks...");
  } catch (error) {
    // If we're here, it's likely we received a 404 from the getContent call.
    // Output that the config last parsed file does not exist
    core.debug(`[check_last_parsed] Error: ${error} -- Attempting to create config file...`);

    // It doesn't exist, so create an array with a new config last parsed record
    let config_last_parsed_records_array = [local_config_last_parsed_record];

    // Initialise the file if the branch exists (if it doesn't, it will be created)
    let branch = await create_branch(octokit, config_branch, config);
    if (branch !== null) {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        branch: config_branch,
        path: config.last_parsed_file,
        content: Buffer.from(JSON.stringify(config_last_parsed_records_array)).toString(
          "base64"
        ),
        message: `Initialise the config last parsed records file (${config.last_parsed_file})`,
      });

      // Convert last_parsed_array to a JSON string, and translate the output
      // into a base64 string
      config_last_parsed_records_content = Buffer.from(
        JSON.stringify(config_last_parsed_records_array)
      ).toString("base64");

      return JSON.stringify(config_last_parsed_records_array);
    }
  }

  // Check whether the current config exists in the config last parsed records
  try {
    // Convert the base64 string to a JSON array
    let config_last_parsed_records_array = JSON.parse(
      Buffer.from(config_last_parsed_records_content, "base64").toString()
    );
    // Initialise last_parsed_date
    let config_last_parsed_date;

    // Check if the array contains an item with all of the same properties except the date
    const current_config_exist_check = config_last_parsed_records_array.find(
      (item) =>
        item.branch_prefix === local_config_last_parsed_record.branch_prefix &&
        item.extension === local_config_last_parsed_record.extension && 
        item.feed_url === local_config_last_parsed_record.feed_url &&
        item.script_output === local_config_last_parsed_record.script_output && 
        item.subfolder === local_config_last_parsed_record.subfolder
    );
    
    // If the array contains an item with all of the same properties except the date, 
    // then we know the current config has been run before and the date it was ran.
    if (current_config_exist_check !== undefined) {
      config_last_parsed_date = new Date(current_config_exist_check.date);
      core.debug(`[check_last_parsed] Last parsed item found. Setting last parsed date to ${config_last_parsed_date}.`);
    } else {
      // If the array does not contain an item with all of the same properties except the date, add the item to the array
      core.info("[check_last_parsed] Config last parsed record not found. Adding the current config last parsed record to the array...")
      config_last_parsed_records_array.push(local_config_last_parsed_record);
      is_new_config_last_parsed_record = true;
      config_last_parsed_date = new Date();
    }

    // Output the last parsed date and first run bool for debugging
    core.debug("[check_last_parsed] last_parsed_date: " + config_last_parsed_date);
    core.debug("[check_last_parsed] is_first_run: " + is_new_config_last_parsed_record);

    // RSS Feeds are not required to be in chronological order,
    // so sort the items by date and get the date of the last item
    [...items].sort((a, b) => {
      return new Date(a.querySelector("pubDate").textContent) -
        new Date(b.querySelector("pubDate").textContent);
    });

    const last_item_date = new Date(
      [...items][items.length - 1].querySelector("pubDate").textContent
    );

    // Output the last item date for debugging
    core.debug("[check_last_parsed] last_item_date: " + last_item_date);

    // If the last parsed date is greater than the last item date (i.e. no new items)
    // and this is not the first run, return no_need_to_process
    if (config_last_parsed_date > last_item_date && !is_new_config_last_parsed_record) {
      core.debug("[check_last_parsed] The last parsed date is after the last item date. No need to process the posts.");
      core.info("No new posts to process. Exiting...");
      return "no_need_to_process";
    }

    if (is_new_config_last_parsed_record) {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        branch: config_branch,
        sha: config_last_parsed_records_file.data.sha,
        path: `${config.last_parsed_file}`,
        content: Buffer.from(JSON.stringify(config_last_parsed_records_array)).toString(
          "base64"
        ),
        message: `Update the last-parsed config file ${config.last_parsed_file}`,
      });
    }

    // If we have reached this point, then -
    // 1. The last parsed date is before the last item date (i.e. newer posts)
    // 2. This is the first run (e.g. There's a new set of configuration parameters
    // Return need_to_process
    return "need_to_process";
  } catch (error) {
    core.setFailed(`last_item_date Encountered an issue: ${error}`);
  }
}

async function update_last_parsed(feed_url, octokit, config) {
  let config_branch = `${config.branch_prefix}-config`;
  try {
    // Get the last parsed file
    const config_last_parsed_records_file = await octokit.rest.repos.getContent({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `refs/heads/${config_branch}`,
      path: `${config.last_parsed_file}`,
    });

    // Convert the base64 string to a JSON array
    let last_parsed_array = JSON.parse(
      Buffer.from(config_last_parsed_records_file.data.content, "base64").toString()
    );

    // Check if the array contains an item with all of the same properties except the date
    const current_config_last_parsed_record = last_parsed_array.find(
      (item) =>
        item.branch_prefix === config.branch_prefix &&
        item.extension === config.extension && 
        item.feed_url === feed_url &&
        item.script_output === config.script_output &&
        item.subfolder === config.subfolder
    );

    // If the array contains an item with all of the same properties except the date, update the date
    if (current_config_last_parsed_record) {
      current_config_last_parsed_record.date = current_parse_date.toISOString();
      core.debug(`[update_last_parsed] Updated the last parsed date for the current config to ${current_parse_date.toISOString()}.`);
    }

    // Write the new array to the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      branch: config_branch,
      sha: config_last_parsed_records_file.data.sha,
      path: `${config.last_parsed_file}`,
      content: Buffer.from(JSON.stringify(last_parsed_array)).toString(
        "base64"
      ),
      message: `Update the last-parsed config file ${config.last_parsed_file}`,
    });

    return JSON.stringify(last_parsed_array);
  } catch (error) {
    core.setFailed(`[update_last_parsed] Encountered an issue: ${error}`);
  }
}

async function validate_config (config){
  // If the extension does not start with a dot, add one
  if (config.extension[0] !== ".") {
    config.extension = `.${config.extension}`;
    core.info("[validate_config] Adding a dot to the beginning of the extension. Please update your input to include the dot.");
  }

  // Check that the extension only contains alphanumeric characters
  if (!/^\.[a-zA-Z0-9]+$/.test(config.extension)) {
    core.setFailed(`[validate_config] The extension parameter must only contain alphanumeric characters.`);
  }
  
  // If the script output is not in a list of valid script outputs, cause the action to fail
  if (!['issue', 'json', 'pull_request'].includes(config.script_output)) {
    core.setFailed(`[validate_config] The script_output parameter must be either 'issue', 'json' or 'pull_request'.`);
  }

  // If the subfolder is empty, don't add a slash
  // If the configured subfolder is just a /, remove it - Files in the 
  // parent directory should not have a slash
  if (config.subfolder === "" || config.subfolder === "/") {
    config.subfolder = "";
  } else {
    // If the sub folder already has a slash, don't add another
    if (config.subfolder[config.subfolder.length - 1] !== "/") {
      config.subfolder = `${config.subfolder}/`;
    }
  }

  return config
}

export default {
  check_last_parsed,
  check_url,
  fetch_feed,
  parse_feed,
  update_last_parsed,
  validate_config,
  itemCount
};
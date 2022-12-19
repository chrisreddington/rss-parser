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

async function parse_feed(octokit, items, script_output) {
  let output = [];

  [...items].forEach((item) => {
    this.itemCount++;

    // Get the slug from the URL
    let slug;
    let slugArray = item.querySelector("link").textContent.split("/");

    // If the last item in the array is empty, use the second to last item
    // Otherwise, use the last item
    if (slugArray.pop() === "") {
      slug = slugArray[slugArray.length - 2];
    } else {
      slug = slugArray[slugArray.length - 1];
    }

    // Create an object of item and url
    let itemObject = {
      title: item.querySelector("title").textContent,
      url: item.querySelector("link").textContent,
      slug: slug
    };

    if (script_output === "issue") {
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
    } else if (script_output === "json") {
      try {
        // Add that item to the array
        output.push(itemObject);
      } catch (error) {
        core.setFailed(`JSON output was not created: ${error}`);
      }
    } else if (script_output === "pull_request") {
      
      // Use octokit to create a new branch
      try {
        octokit.rest.git.createRef({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          ref: `refs/heads/${itemObject.slug}`,
          sha: github.context.sha
        });
      } catch (error) {
        core.setFailed(`GitHub branch was not created: ${error}`);
      }

      // Use octokit to create a new file in the new branch
      try {
        octokit.rest.repos.createOrUpdateFileContents({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          path: "/tweets/" + itemObject.slug + ".tweet",
          message: `Create file for ${itemObject.title}`,
          content: `${itemObject.title} - Check more at ${itemObject.url}`,
          branch: itemObject.slug
        });
      } catch (error) {
        core.setFailed(`GitHub file was not created: ${error}`);
      }

      // Use octokit to create a new pull request
      try {
        octokit.rest.pulls.create({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          title: itemObject.title,
          head: itemObject.slug,
          base: "master"
        });
      } catch (error) {
        core.setFailed(`GitHub pull request was not created: ${error}`);
      }
    }
  });

  if (script_output === "json") {
    // Return the array of items
    console.log(output);
    core.setOutput("items", output);
  }
}

module.exports = {
  check_url,
  fetch_feed,
  parse_feed,
  itemCount
};
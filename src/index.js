// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
const core = require('@actions/core');
const github = require('@actions/github');

// Setup packages to enable the fetching of RSS feeds and parsing of XML.
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Pull in the inputs from the workflow.
const feed_url = core.getInput('feed_url');
const script_output = core.getInput('script_output');

// Authenticate the Octokit REST client with the token provided as an input into the GitHub Action
const github_token = core.getInput('github_token');
const octokit = github.getOctokit(github_token)

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

// If valid, then fetch the RSS feed and parse the XML
got(feed_url).then((response) => {
  // Parse the feed output as XML, and grab the items
  let feedOutput = new JSDOM(response.body, { contentType: "text/xml" });
  let items = feedOutput.window.document.querySelectorAll("item");

  let returnedItems = [];
  
  [...items].forEach((item) => {

    // Create an object of item and url
    let itemObject = {
      title: item.querySelector("title").textContent,
      url: item.querySelector("link").textContent
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
      // Add that item to the array
      returnedItems.push(itemObject);
    }
  });

  if (script_output === "json") {
    // Return the array of items
    console.log(returnedItems);
  }
})
.catch((error) => {
  core.setFailed(`Action failed with error ${error}`);
});
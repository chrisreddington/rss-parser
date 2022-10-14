// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
const core = require('@actions/core');
const github = require('@actions/github');

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
const utils = require('./utils');

// The main function to run when the action is called
async function run() {
  // Pull in the inputs from the workflow.
  const feed_url = core.getInput('feed_url');
  const script_output = core.getInput('script_output');
  
  // Authenticate the Octokit REST client with the token provided as an input into the GitHub Action
  const github_token = core.getInput('github_token');
  const octokit = github.getOctokit(github_token);

  // Check that the provided URL is valid
  await utils.check_url(feed_url);

  // Fetch the RSS feed from the provided URL
  let items = await utils.fetch_feed(feed_url);

  // Parse the RSS feed and take appropriate action
  await utils.parse_feed(octokit, items, script_output);
}

run();
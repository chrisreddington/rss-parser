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

  // Setup the config object to hold the inputs from the workflow.
  let config = {};

  config.script_output = core.getInput('script_output');
  config.subfolder = core.getInput('subfolder');
  config.extension = core.getInput('extension');
  config.branch_prefix = core.getInput('branch_prefix');
  config.last_parsed_file = core.getInput('last_parsed_file');

  core.debug(`Config: ${JSON.stringify(config)}`);

  // If the subfolder is not provided, set it to 'social'
  if (config.subfolder === '') {
    config.subfolder = 'social';
  }

  // If the subfolder is empty, don't add a slash
  if (config.subfolder === "") {
    config.subfolder = "";
  } else {
    // If the sub folder already has a slash, don't add another
    if (config.subfolder[config.subfolder.length - 1] !== "/") {
      config.subfolder = `${config.subfolder}/`;
    }
  }

  // If the extension is not provided, set it to '.social'
  if (config.extension === '') {
    config.extension = '.social';
  }

  // Check that the extension begins with a dot
  if (config.extension[0] !== ".") {
    config.extension = `.${config.extension}`;
  }

  // If the last parsed file is not provided, set it to 'rss-parser-last-parsed.json'
  if (config.last_parsed_file === '') {
    config.last_parsed_file = 'rss-parser-last-parsed.json';
  }
    
  // Authenticate the Octokit REST client with the token provided as an input into the GitHub Action
  const github_token = core.getInput('github_token');
  const octokit = github.getOctokit(github_token);

  // Check that the provided URL is valid
  await utils.check_url(feed_url);

  // Fetch the RSS feed from the provided URL
  let items = await utils.fetch_feed(feed_url);

  let last_parsed_result = await utils.check_last_parsed(feed_url, octokit, items, config);

  if (last_parsed_result !== 'no_need_to_process') {
    // Parse the RSS feed and take appropriate action
    await utils.parse_feed(octokit, items, config);
    // Update the last parsed file
    await utils.update_last_parsed(feed_url, octokit, config);
  }
}

run();
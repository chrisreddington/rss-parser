// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
import * as core from '@actions/core';
import * as github from '@actions/github';

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from './utils.js';

// The main function to run when the action is called
export async function run() {
  // Setup the config object to hold the inputs from the workflow.
  let config = {
    branch_prefix: core.getInput('branch_prefix'),
    extension: core.getInput('extension'),
    feed_url: core.getInput('feed_url'),
    last_parsed_file: core.getInput('last_parsed_file'),
    script_output: core.getInput('script_output'),
    subfolder: core.getInput('subfolder')
  };

  // Validate the config
  config = await utils.validate_config(config);

  // Output the config to the debug log
  core.debug(`config: ${JSON.stringify(config)}`);
    
  // Authenticate the Octokit REST client with the token provided as an input into the GitHub Action
  const github_token = core.getInput('github_token');
  const octokit = github.getOctokit(github_token);

  // Check that the provided URL is valid
  await utils.check_url(config.feed_url);

  // Fetch the RSS feed from the provided URL
  let items = await utils.fetch_feed(config.feed_url);
  
  // Output the items to the debug log
  core.debug(`items: ${JSON.stringify([...items])}`);

  // Check if a parse is needed
  let last_parsed_result = await utils.check_last_parsed(config.feed_url, octokit, items, config);
  core.debug(`last_parsed_result: ${JSON.stringify(last_parsed_result)}`);

  // If a parse is needed, parse the feed and take appropriate action
  if (last_parsed_result !== 'no_need_to_process') {
    // Parse the RSS feed and take appropriate action
    await utils.parse_feed(octokit, items, config);
    // Update the last parsed file
    await utils.update_last_parsed(config.feed_url, octokit, config);
  }
}
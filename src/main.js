// Setup core to provide an interface to the workflow commands, input and output variables, exit statuses, and debug messages.
// Setup github to return an authenticated Octokit REST client and access to GitHub Actions contexts.
import * as core from '@actions/core';
import * as github from '@actions/github';

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import {check_last_parsed, check_url, fetch_feed, parse_feed,  update_last_parsed, validate_config} from './utils.js';

// The main function to run when the action is called
export async function run() {
  // Pull in the inputs from the workflow.
  const feed_url = core.getInput('feed_url');

  // Setup the config object to hold the inputs from the workflow.
  let config = {
    branch_prefix: core.getInput('branch_prefix'),
    extension: core.getInput('extension'),
    last_parsed_file: core.getInput('last_parsed_file'),
    script_output: core.getInput('script_output'),
    subfolder: core.getInput('subfolder')
  };

  // Validate the config
  config = await validate_config(config);

  // Output the config to the debug log
  core.debug(`config: ${JSON.stringify(config)}`);
    
  // Authenticate the Octokit REST client with the token provided as an input into the GitHub Action
  const github_token = core.getInput('github_token');
  const octokit = github.getOctokit(github_token);

  // Check that the provided URL is valid
  await check_url(feed_url);

  // Fetch the RSS feed from the provided URL
  let items = await fetch_feed(feed_url);
  
  // Output the items to the debug log
  core.debug(`items: ${JSON.stringify([...items])}`);

  // Check if a parse is needed
  let last_parsed_result = await check_last_parsed(feed_url, octokit, items, config);
  core.debug(`last_parsed_result: ${JSON.stringify(last_parsed_result)}`);

  // If a parse is needed, parse the feed and take appropriate action
  if (last_parsed_result !== 'no_need_to_process') {
    // Parse the RSS feed and take appropriate action
    await parse_feed(octokit, items, config);
    // Update the last parsed file
    await update_last_parsed(feed_url, octokit, config);
  }
}
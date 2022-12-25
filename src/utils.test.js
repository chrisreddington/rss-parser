// mock the github module
import * as github from '@actions/github';
import { JSDOM } from 'jsdom';

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from './utils.js';

// mock the octokit token
const github_token = '1234567890';

const input_config = {
  branch_prefix: 'prefix',
  extension: 'ext',
  feed_url: 'https://www.github.com/feed',
  last_parsed_file: '.github/last_parsed.json',
  script_output: 'pull_request',
  subfolder: 'subfolder'
};

// create a dom object based on xml input
const dom = new JSDOM(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:georss="http://www.georss.org/georss" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" > <channel> <title>The GitHub Blog</title> <atom:link href="https://github.blog/feed/" rel="self" type="application/rss+xml" /> <link>https://github.blog/</link> <item> <title>Introducing GitHub Advanced Security SIEM integrations for security professionals</title> <link>https://github.blog/2022-10-13-introducing-github-advanced-security-siem-integrations-for-security-professionals/</link> <pubDate>Thu, 13 Oct 2022 19:25:03 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67795</guid></item> <item> <title>The Story of Scalar</title> <link>https://github.blog/2022-10-13-the-story-of-scalar/</link> <pubDate>Thu, 13 Oct 2022 15:00:12 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67767</guid> <post-id xmlns="com-wordpress:feed-additions:1">67767</post-id>	</item> <item> <title>The GitHub Universe 2022 agenda is live</title> <link>https://github.blog/2022-10-11-the-github-universe-2022-agenda-is-live/</link> <pubDate>Tue, 11 Oct 2022 19:39:36 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67730</guid> <post-id xmlns="com-wordpress:feed-additions:1">67730</post-id>	</item> <item> <title>View GitHub code scanning findings directly in VS Code and GitHub Codespaces</title> <link>https://github.blog/2022-10-11-view-github-code-scanning-findings-directly-in-vs-code-and-github-codespaces/</link> <pubDate>Tue, 11 Oct 2022 19:10:12 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67648</guid> <post-id xmlns="com-wordpress:feed-additions:1">67648</post-id>	</item> <item> <title>On the go with GitHub Projects on GitHub Mobile (public beta)</title> <link>https://github.blog/2022-10-11-on-the-go-with-github-projects-on-github-mobile-public-beta/</link> <pubDate>Tue, 11 Oct 2022 16:00:52 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67715</guid> <post-id xmlns="com-wordpress:feed-additions:1">67715</post-id>	</item> <item> <title>Developers are now included in the WIPO Global Innovation Index</title> <link>https://github.blog/2022-10-06-developers-are-now-included-in-the-wipo-global-innovation-index/</link> <pubDate>Thu, 06 Oct 2022 21:00:36 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67632</guid> <post-id xmlns="com-wordpress:feed-additions:1">67632</post-id>	</item> <item> <title>GitHubs supply chain security features now support Dart</title> <link>https://github.blog/2022-10-06-githubs-supply-chain-security-features-now-support-dart/</link> <pubDate>Thu, 06 Oct 2022 18:00:44 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67596</guid> <post-id xmlns="com-wordpress:feed-additions:1">67596</post-id>	</item> <item> <title>js13kGames 2022 winners 🏆</title> <link>https://github.blog/2022-10-06-js13k-2022-winners/</link> <pubDate>Thu, 06 Oct 2022 07:01:42 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67439</guid> <post-id xmlns="com-wordpress:feed-additions:1">67439</post-id>	</item> <item> <title>Detect secrets in your code more accurately with dry runs for custom patterns now available in GitHub Advanced Security</title> <link>https://github.blog/2022-10-05-detect-secrets-in-your-code-more-accurately-with-dry-runs-for-custom-patterns/</link> <pubDate>Wed, 05 Oct 2022 18:00:51 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67546</guid> <post-id xmlns="com-wordpress:feed-additions:1">67546</post-id>	</item> </channel> </rss>`, { contentType: "text/xml" });

test('Parses valid xml correctly', async () => {
  await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    input_config);

    // Assert that the correct number of items were parsed.
    expect(utils.itemCount).toBe(9);
});

test('parse_feed should set the appropriate slug', async () => {
  let items = await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    input_config);

  expect(items[0].slug).toBe("prefix-2022-10-13-introducing-github-advanced-security-siem-integrations-for-security-professionals");
});

test('parse_feed should set the appropriate url', async () => {
  let items = await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    input_config);

  expect(items[0].url).toBe("https://github.blog/2022-10-13-introducing-github-advanced-security-siem-integrations-for-security-professionals/");
});

test('parse_feed should set the appropriate title', async () => {
  let items = await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    input_config);

  expect(items[0].title).toBe("Introducing GitHub Advanced Security SIEM integrations for security professionals");
});

test('parse_feed should set the appropriate date', async () => {
  let items = await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    input_config);

  expect(items[0].date).toBe("Thu, 13 Oct 2022 19:25:03 +0000");
});

test('check_url should pass with valid http', async () => {
  expect(await utils.check_url("http://www.github.com")).toBe(true);
});

test('check_url should pass with valid https', async () => {
  expect(await utils.check_url("https://www.github.com")).toBe(true);
});

test('check_url should fail without http or https', async () => {
  expect(await utils.check_url("www.github.com")).toBe(false);
});

test('check_url should fail with ftp url', async () => {
  expect(await utils.check_url("ftp://github.com")).toBe(false);
});

test('check_url should pass https with local URL', async () => {
  expect(await utils.check_url("https://localhost")).toBe(true);
});

test('check_url should pass http with local URL', async () => {
  expect(await utils.check_url("http://localhost")).toBe(true);
});

test('check_url should pass with https url and port', async () => {
  expect(await utils.check_url("http://localhost:8080")).toBe(true);
});

test('check_url should pass with http url and port', async () => {
  expect(await utils.check_url("https://localhost:8080")).toBe(true);
});

test('validate_config should pass with extension beginning with a dot', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(input_config);
});

test('validate_config should pass with extension beginning with a dot', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should fail with extension with non-alphanumeric characters', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext!!',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder'
  };

  // Expect the validate_config function to return an empty object
  expect(await utils.validate_config(input_config)).toStrictEqual({});
});

test('validate_config should pass with script_output as issue', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'issue',
    subfolder: 'subfolder'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'issue',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should pass with script_output as json', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'json',
    subfolder: 'subfolder'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'json',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should pass with script_output as pull_request', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should return empty object with script_output as anything but issue, json or pull_request', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'invalid_value',
    subfolder: 'subfolder'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual({});
});

test('validate_config should return empty subfolder string when passing empty subfolder string', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: ''
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: ''
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should return empty subfolder string when passing in a / value', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: '/'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: ''
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should append a / to the subfolder string', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});

test('validate_config should not append an additional / to the subfolder string if it already ends in a /', async () => {

  let input_config = {
    branch_prefix: 'prefix',
    extension: 'ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  let output_config = {
    branch_prefix: 'prefix',
    extension: '.ext',
    feed_url: 'https://www.github.com',
    last_parsed_file: '.github/last_parsed.json',
    script_output: 'pull_request',
    subfolder: 'subfolder/'
  };

  expect(await utils.validate_config(input_config)).toStrictEqual(output_config);
});
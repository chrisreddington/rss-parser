// mock the github module
import * as github from '@actions/github';
import { JSDOM } from 'jsdom';

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from './utils';

test('Parses valid xml correctly', async () => {

  // mock the octokit token
  const github_token = '1234567890';

  // create a dom object based on xml input
  const dom = new JSDOM(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:georss="http://www.georss.org/georss" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" > <channel> <title>The GitHub Blog</title> <atom:link href="https://github.blog/feed/" rel="self" type="application/rss+xml" /> <link>https://github.blog/</link> <item> <title>Introducing GitHub Advanced Security SIEM integrations for security professionals</title> <link>https://github.blog/2022-10-13-introducing-github-advanced-security-siem-integrations-for-security-professionals/</link> <pubDate>Thu, 13 Oct 2022 19:25:03 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67795</guid> <item> <title>The Story of Scalar</title> <link>https://github.blog/2022-10-13-the-story-of-scalar/</link> <pubDate>Thu, 13 Oct 2022 15:00:12 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67767</guid> <post-id xmlns="com-wordpress:feed-additions:1">67767</post-id>	</item> <item> <title>The GitHub Universe 2022 agenda is live</title> <link>https://github.blog/2022-10-11-the-github-universe-2022-agenda-is-live/</link> <pubDate>Tue, 11 Oct 2022 19:39:36 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67730</guid> <post-id xmlns="com-wordpress:feed-additions:1">67730</post-id>	</item> <item> <title>View GitHub code scanning findings directly in VS Code and GitHub Codespaces</title> <link>https://github.blog/2022-10-11-view-github-code-scanning-findings-directly-in-vs-code-and-github-codespaces/</link> <pubDate>Tue, 11 Oct 2022 19:10:12 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67648</guid> <post-id xmlns="com-wordpress:feed-additions:1">67648</post-id>	</item> <item> <title>On the go with GitHub Projects on GitHub Mobile (public beta)</title> <link>https://github.blog/2022-10-11-on-the-go-with-github-projects-on-github-mobile-public-beta/</link> <pubDate>Tue, 11 Oct 2022 16:00:52 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67715</guid> <post-id xmlns="com-wordpress:feed-additions:1">67715</post-id>	</item> <item> <title>Developers are now included in the WIPO Global Innovation Index</title> <link>https://github.blog/2022-10-06-developers-are-now-included-in-the-wipo-global-innovation-index/</link> <pubDate>Thu, 06 Oct 2022 21:00:36 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67632</guid> <post-id xmlns="com-wordpress:feed-additions:1">67632</post-id>	</item> <item> <title>GitHubs supply chain security features now support Dart</title> <link>https://github.blog/2022-10-06-githubs-supply-chain-security-features-now-support-dart/</link> <pubDate>Thu, 06 Oct 2022 18:00:44 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67596</guid> <post-id xmlns="com-wordpress:feed-additions:1">67596</post-id>	</item> <item> <title>js13kGames 2022 winners 🏆</title> <link>https://github.blog/2022-10-06-js13k-2022-winners/</link> <pubDate>Thu, 06 Oct 2022 07:01:42 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67439</guid> <post-id xmlns="com-wordpress:feed-additions:1">67439</post-id>	</item> <item> <title>Detect secrets in your code more accurately with dry runs for custom patterns now available in GitHub Advanced Security</title> <link>https://github.blog/2022-10-05-detect-secrets-in-your-code-more-accurately-with-dry-runs-for-custom-patterns/</link> <pubDate>Wed, 05 Oct 2022 18:00:51 +0000</pubDate> <guid isPermaLink="false">https://github.blog/?p=67546</guid> <post-id xmlns="com-wordpress:feed-additions:1">67546</post-id>	</item> </channel> </rss>`);

  await utils.parse_feed(
    github.getOctokit(github_token), 
    dom.window.document.querySelectorAll("item"),
    'json');

    // Assert that the correct number of items were parsed.
    expect(utils.itemCount).toBe(9);
});

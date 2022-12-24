import { rest } from "msw";
import { setupServer } from "msw/node";
import * as github from "@actions/github";

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from "./utils.js";
const github_token = "1234567890";

github.context.repo.owner = "chrisreddington";
github.context.repo.repo = "rss-parser";

const server = setupServer(
  rest.post(
    "https://api.github.com/repos/chrisreddington/rss-parser/issues",
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          "id": 1,
          "node_id": "MDU6SXNzdWUx",
          "url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347",
          "repository_url": "https://api.github.com/repos/chrisreddington/rss-parser",
          "labels_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/labels{/name}",
          "comments_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/comments",
          "events_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/events",
          "html_url": "https://github.com/chrisreddington/rss-parser/issues/1347",
          "number": 1347,
          "state": "open",
          "title": "Found a bug",
          "body": "I'm having a problem with this.",
          "user": {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [
            {
              "id": 208045946,
              "node_id": "MDU6TGFiZWwyMDgwNDU5NDY=",
              "url": "https://api.github.com/repos/chrisreddington/rss-parser/labels/bug",
              "name": "bug",
              "description": "Something isn't working",
              "color": "f29513",
              "default": true
            }
          ],
          "assignee": {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "assignees": [
            {
              "login": "octocat",
              "id": 1,
              "node_id": "MDQ6VXNlcjE=",
              "avatar_url": "https://github.com/images/error/octocat_happy.gif",
              "gravatar_id": "",
              "url": "https://api.github.com/users/octocat",
              "html_url": "https://github.com/octocat",
              "followers_url": "https://api.github.com/users/octocat/followers",
              "following_url": "https://api.github.com/users/octocat/following{/other_user}",
              "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
              "organizations_url": "https://api.github.com/users/octocat/orgs",
              "repos_url": "https://api.github.com/users/octocat/repos",
              "events_url": "https://api.github.com/users/octocat/events{/privacy}",
              "received_events_url": "https://api.github.com/users/octocat/received_events",
              "type": "User",
              "site_admin": false
            }
          ],
          "milestone": {
            "url": "https://api.github.com/repos/chrisreddington/rss-parser/milestones/1",
            "html_url": "https://github.com/chrisreddington/rss-parser/milestones/v1.0",
            "labels_url": "https://api.github.com/repos/chrisreddington/rss-parser/milestones/1/labels",
            "id": 1002604,
            "node_id": "MDk6TWlsZXN0b25lMTAwMjYwNA==",
            "number": 1,
            "state": "open",
            "title": "v1.0",
            "description": "Tracking milestone for version 1.0",
            "creator": {
              "login": "octocat",
              "id": 1,
              "node_id": "MDQ6VXNlcjE=",
              "avatar_url": "https://github.com/images/error/octocat_happy.gif",
              "gravatar_id": "",
              "url": "https://api.github.com/users/octocat",
              "html_url": "https://github.com/octocat",
              "followers_url": "https://api.github.com/users/octocat/followers",
              "following_url": "https://api.github.com/users/octocat/following{/other_user}",
              "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
              "organizations_url": "https://api.github.com/users/octocat/orgs",
              "repos_url": "https://api.github.com/users/octocat/repos",
              "events_url": "https://api.github.com/users/octocat/events{/privacy}",
              "received_events_url": "https://api.github.com/users/octocat/received_events",
              "type": "User",
              "site_admin": false
            },
            "open_issues": 4,
            "closed_issues": 8,
            "created_at": "2011-04-10T20:09:31Z",
            "updated_at": "2014-03-03T18:58:10Z",
            "closed_at": "2013-02-12T13:22:01Z",
            "due_on": "2012-10-09T23:39:01Z"
          },
          "locked": true,
          "active_lock_reason": "too heated",
          "comments": 0,
          "pull_request": {
            "url": "https://api.github.com/repos/chrisreddington/rss-parser/pulls/1347",
            "html_url": "https://github.com/chrisreddington/rss-parser/pull/1347",
            "diff_url": "https://github.com/chrisreddington/rss-parser/pull/1347.diff",
            "patch_url": "https://github.com/chrisreddington/rss-parser/pull/1347.patch"
          },
          "closed_at": null,
          "created_at": "2011-04-22T13:33:48Z",
          "updated_at": "2011-04-22T13:33:48Z",
          "closed_by": {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "author_association": "COLLABORATOR",
          "state_reason": "completed"
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("create_issue should return issue object", async () => {
  // Arrange
    let itemObject = {
      title: "How we use GitHub to be more productive, collaborative, and secure",
      url: "https://github.blog/2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure/",
      pubDate: "2021-01-01T00:00:00.000Z",
      slug: "2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure"
    }

  // Act & Assert

  expect(
    await utils.create_issue(github.getOctokit(github_token), itemObject)).toStrictEqual(
      {
        "data": {
          "active_lock_reason": "too heated",
          "assignee": {
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "gravatar_id": "",
            "html_url": "https://github.com/octocat",
            "id": 1,
            "login": "octocat",
            "node_id": "MDQ6VXNlcjE=",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "site_admin": false,
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "type": "User",
            "url": "https://api.github.com/users/octocat",
          },
          "assignees": [
            {
              "avatar_url": "https://github.com/images/error/octocat_happy.gif",
              "events_url": "https://api.github.com/users/octocat/events{/privacy}",
              "followers_url": "https://api.github.com/users/octocat/followers",
              "following_url": "https://api.github.com/users/octocat/following{/other_user}",
              "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
              "gravatar_id": "",
              "html_url": "https://github.com/octocat",
              "id": 1,
              "login": "octocat",
              "node_id": "MDQ6VXNlcjE=",
              "organizations_url": "https://api.github.com/users/octocat/orgs",
              "received_events_url": "https://api.github.com/users/octocat/received_events",
              "repos_url": "https://api.github.com/users/octocat/repos",
              "site_admin": false,
              "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
              "type": "User",
              "url": "https://api.github.com/users/octocat",
            },
          ],
          "author_association": "COLLABORATOR",
          "body": "I'm having a problem with this.",
          "closed_at": null,
          "closed_by": {
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "gravatar_id": "",
            "html_url": "https://github.com/octocat",
            "id": 1,
            "login": "octocat",
            "node_id": "MDQ6VXNlcjE=",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "site_admin": false,
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "type": "User",
            "url": "https://api.github.com/users/octocat",
          },
          "comments": 0,
          "comments_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/comments",
          "created_at": "2011-04-22T13:33:48Z",
          "events_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/events",
          "html_url": "https://github.com/chrisreddington/rss-parser/issues/1347",
          "id": 1,
          "labels": [
            {
              "color": "f29513",
              "default": true,
              "description": "Something isn't working",
              "id": 208045946,
              "name": "bug",
              "node_id": "MDU6TGFiZWwyMDgwNDU5NDY=",
              "url": "https://api.github.com/repos/chrisreddington/rss-parser/labels/bug",
            },
          ],
          "labels_url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347/labels{/name}",
          "locked": true,
          "milestone": {
            "closed_at": "2013-02-12T13:22:01Z",
            "closed_issues": 8,
            "created_at": "2011-04-10T20:09:31Z",
            "creator": {
              "avatar_url": "https://github.com/images/error/octocat_happy.gif",
              "events_url": "https://api.github.com/users/octocat/events{/privacy}",
              "followers_url": "https://api.github.com/users/octocat/followers",
              "following_url": "https://api.github.com/users/octocat/following{/other_user}",
              "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
              "gravatar_id": "",
              "html_url": "https://github.com/octocat",
              "id": 1,
              "login": "octocat",
              "node_id": "MDQ6VXNlcjE=",
              "organizations_url": "https://api.github.com/users/octocat/orgs",
              "received_events_url": "https://api.github.com/users/octocat/received_events",
              "repos_url": "https://api.github.com/users/octocat/repos",
              "site_admin": false,
              "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
              "type": "User",
              "url": "https://api.github.com/users/octocat",
            },
            "description": "Tracking milestone for version 1.0",
            "due_on": "2012-10-09T23:39:01Z",
            "html_url": "https://github.com/chrisreddington/rss-parser/milestones/v1.0",
            "id": 1002604,
            "labels_url": "https://api.github.com/repos/chrisreddington/rss-parser/milestones/1/labels",
            "node_id": "MDk6TWlsZXN0b25lMTAwMjYwNA==",
            "number": 1,
            "open_issues": 4,
            "state": "open",
            "title": "v1.0",
            "updated_at": "2014-03-03T18:58:10Z",
            "url": "https://api.github.com/repos/chrisreddington/rss-parser/milestones/1",
          },
          "node_id": "MDU6SXNzdWUx",
          "number": 1347,
          "pull_request": {
            "diff_url": "https://github.com/chrisreddington/rss-parser/pull/1347.diff",
            "html_url": "https://github.com/chrisreddington/rss-parser/pull/1347",
            "patch_url": "https://github.com/chrisreddington/rss-parser/pull/1347.patch",
            "url": "https://api.github.com/repos/chrisreddington/rss-parser/pulls/1347",
          },
          "repository_url": "https://api.github.com/repos/chrisreddington/rss-parser",
          "state": "open",
          "state_reason": "completed",
          "title": "Found a bug",
          "updated_at": "2011-04-22T13:33:48Z",
          "url": "https://api.github.com/repos/chrisreddington/rss-parser/issues/1347",
          "user": {
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "gravatar_id": "",
            "html_url": "https://github.com/octocat",
            "id": 1,
            "login": "octocat",
            "node_id": "MDQ6VXNlcjE=",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "site_admin": false,
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "type": "User",
            "url": "https://api.github.com/users/octocat",
          },
        },
        "headers": {
          "content-type": "application/json",
          "x-powered-by": "msw",
        },
        "status": 201,
        "url": "https://api.github.com/repos/chrisreddington/rss-parser/issues",
      });
});

test("should return null if there is an error, e.g. Unauthorized", async () => {
  server.use(
    rest.post(
      "https://api.github.com/repos/chrisreddington/rss-parser/issues",
      (req, res, ctx) => res(ctx.status(401))
    )
  );

  // Arrange
  let itemObject = {
    title: "How we use GitHub to be more productive, collaborative, and secure",
    url: "https://github.blog/2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure/",
    pubDate: "2021-01-01T00:00:00.000Z",
    slug: "2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure"
  }

// Act & Assert

expect(
  await utils.create_issue(github.getOctokit(github_token), itemObject)).toStrictEqual({})
});

test("should return null if there is an error, e.g. service unavailable", async () => {
  server.use(
    rest.post(
      "https://api.github.com/repos/chrisreddington/rss-parser/issues",
      (req, res, ctx) => res(ctx.status(503))
    )
  );

  // Arrange
  let itemObject = {
    title: "How we use GitHub to be more productive, collaborative, and secure",
    url: "https://github.blog/2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure/",
    pubDate: "2021-01-01T00:00:00.000Z",
    slug: "2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure"
  }

// Act & Assert

expect(
  await utils.create_issue(github.getOctokit(github_token), itemObject)).toStrictEqual({})
});

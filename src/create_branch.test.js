import { rest } from "msw";
import { setupServer } from "msw/node";
import * as github from "@actions/github";

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from "./utils.js";
const github_token = "1234567890";

github.context.repo.owner = "chrisreddington";
github.context.repo.repo = "rss-parser";

const server = setupServer(
  rest.get(
    "https://api.github.com/repos/chrisreddington/rss-parser/git/ref/heads%2FfeatureA",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ref: "refs/heads/featureA",
          node_id: "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
          url: "https://api.github.com/repos/chrisreddington/rss-parser/git/refs/heads/featureA",
          object: {
            type: "commit",
            sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
            url: "https://api.github.com/repos/chrisreddington/rss-parser/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
          },
        })
      );
    }
  ),
  rest.post(
    "https://api.github.com/repos/chrisreddington/rss-parser/git/refs",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ref: "refs/heads/featureA",
          node_id: "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
          url: "https://api.github.com/repos/chrisreddington/rss-parser/git/refs/heads/featureA",
          object: {
            type: "commit",
            sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
            url: "https://api.github.com/repos/chrisreddington/rss-parser/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
          },
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("create_branch should return branch object when it already exists", async () => {

  

  expect(
    await utils.create_branch(github.getOctokit(github_token), "featureA", {})
  ).toStrictEqual({
    data: {
      node_id: "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
      object: {
        sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
        type: "commit",
        url: "https://api.github.com/repos/chrisreddington/rss-parser/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
      },
      ref: "refs/heads/featureA",
      url: "https://api.github.com/repos/chrisreddington/rss-parser/git/refs/heads/featureA",
    },
    headers: { "content-type": "application/json", "x-powered-by": "msw" },
    status: 200,
    url: "https://api.github.com/repos/chrisreddington/rss-parser/git/ref/heads%2FfeatureA",
  });
});

test("create_branch should create a new branch object and return that if it doesn't already exist", async () => {
  server.use(
    rest.get(
      "https://api.github.com/repos/chrisreddington/rss-parser/git/ref/heads%2FfeatureA",
      (req, res, ctx) => res(ctx.status(404))
    )
  );

  expect(
    await utils.create_branch(github.getOctokit(github_token), "featureA", {})
  ).toStrictEqual({
    data: {
      node_id: "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
      object: {
        sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
        type: "commit",
        url: "https://api.github.com/repos/chrisreddington/rss-parser/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
      },
      ref: "refs/heads/featureA",
      url: "https://api.github.com/repos/chrisreddington/rss-parser/git/refs/heads/featureA",
    },
    headers: { "content-type": "application/json", "x-powered-by": "msw" },
    status: 200,
    url: "https://api.github.com/repos/chrisreddington/rss-parser/git/refs",
  });
});

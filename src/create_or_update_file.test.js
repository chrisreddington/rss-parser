import { rest } from "msw";
import { setupServer } from "msw/node";
import * as github from "@actions/github";

// Pull in utils to enable the fetching of RSS feeds and parsing of XML.
import utils from "./utils.js";
const github_token = "1234567890";

const input_config = {
  branch_prefix: 'prefix',
  extension: 'ext',
  feed_url: 'https://www.github.com/feed',
  last_parsed_file: '.github/last_parsed.json',
  script_output: 'pull_request',
  subfolder: 'subfolder'
};

let itemObject = {
  title: "How we use GitHub to be more productive, collaborative, and secure",
  url: "https://github.blog/2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure/",
  pubDate: "2021-01-01T00:00:00.000Z",
  slug: "2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure"
}

github.context.repo.owner = "chrisreddington";
github.context.repo.repo = "rss-parser";

const server = setupServer(
  rest.get(`https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({"type":"file","encoding":"base64","size":5362,"name":"README.md","path":"README.md","content":"IyBZb2dhIEJvmsgaW4gcHJvZ3Jlc3MhIEZlZWwgdAoKOndhcm5pbmc6IFdvc\\nZnJlZSBmUgdG8gY0byBjaGVjayBvdXQgdGhlIGFwcCwgYnV0IGJlIHN1c29t\\nZSBiYWNrIG9uY2UgaXQgaXMgY29tcGxldGUuCgpBIHdlYiBhcHAgdGhhdCBs\\nZWFkcyB5b3UgdGhyb3VnaCBhIHlvZ2Egc2Vzc2lvbi4KCltXb3Jrb3V0IG5v\\ndyFdKGh0dHBzOi8vc2tlZHdhcmRzODguZ2l0aHViLmlvL3lvZ2EvKQoKPGlt\\nZyBzcmM9InNyYy9pbWFnZXMvbWFza2FibGVfaWNvbl81MTIucG5nIiBhbHQ9\\nImJvdCBsaWZ0aW5nIHdlaWdodHMiIHdpZHRoPSIxMDAiLz4KCkRvIHlvdSBo\\nYXZlIGZlZWRiYWNrIG9yIGlkZWFzIGZvciBpbXByb3ZlbWVudD8gW09wZW4g\\nYW4gaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9za2Vkd2FyZHM4OC95b2dh\\nL2lzc3Vlcy9uZXcpLgoKV2FudCBtb3JlIGdhbWVzPyBWaXNpdCBbQ25TIEdh\\nbWVzXShodHRwczovL3NrZWR3YXJkczg4LmdpdGh1Yi5pby9wb3J0Zm9saW8v\\nKS4KCiMjIERldmVsb3BtZW50CgpUbyBhZGQgYSBuZXcgcG9zZSwgYWRkIGFu\\nIGVudHJ5IHRvIHRoZSByZWxldmFudCBmaWxlIGluIGBzcmMvYXNhbmFzYC4K\\nClRvIGJ1aWxkLCBydW4gYG5wbSBydW4gYnVpbGRgLgoKVG8gcnVuIGxvY2Fs\\nbHkgd2l0aCBsaXZlIHJlbG9hZGluZyBhbmQgbm8gc2VydmljZSB3b3JrZXIs\\nIHJ1biBgbnBtIHJ1biBkZXZgLiAoSWYgYSBzZXJ2aWNlIHdvcmtlciB3YXMg\\ncHJldmlvdXNseSByZWdpc3RlcmVkLCB5b3UgY2FuIHVucmVnaXN0ZXIgaXQg\\naW4gY2hyb21lIGRldmVsb3BlciB0b29sczogYEFwcGxpY2F0aW9uYCA+IGBT\\nZXJ2aWNlIHdvcmtlcnNgID4gYFVucmVnaXN0ZXJgLikKClRvIHJ1biBsb2Nh\\nbGx5IGFuZCByZWdpc3RlciB0aGUgc2VydmljZSB3b3JrZXIsIHJ1biBgbnBt\\nIHN0YXJ0YC4KClRvIGRlcGxveSwgcHVzaCB0byBgbWFpbmAgb3IgbWFudWFs\\nbHkgdHJpZ2dlciB0aGUgYC5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWxg\\nIHdvcmtmbG93Lgo=\\n","sha":"3d21ec53a331a6f037a91c368710b99387d012c1","url":"https://api.github.com/repos/chrisreddington/rss-parser/contents/README.md","git_url":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","html_url":"https://github.com/chrisreddington/rss-parser/blob/master/README.md","download_url":"https://raw.githubusercontent.com/chrisreddington/rss-parser/master/README.md","_links":{"git":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","self":"https://api.github.com/repos/chrisreddington/rss-parser/contents/README.md","html":"https://github.com/chrisreddington/rss-parser/blob/master/README.md"}})
    );
  }),
  rest.put(
    "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext",
    (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({"content":{"name":"hello.txt","path":"notes/hello.txt","sha":"95b966ae1c166bd92f8ae7d1c313e738c731dfc3","size":9,"url":"https://api.github.com/repos/chrisreddington/rss-parser/contents/notes/hello.txt","html_url":"https://github.com/chrisreddington/rss-parser/blob/master/notes/hello.txt","git_url":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3","download_url":"https://raw.githubusercontent.com/octocat/HelloWorld/master/notes/hello.txt","type":"file","_links":{"self":"https://api.github.com/repos/chrisreddington/rss-parser/contents/notes/hello.txt","git":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3","html":"https://github.com/chrisreddington/rss-parser/blob/master/notes/hello.txt"}},"commit":{"sha":"7638417db6d59f3c431d3e1f261cc637155684cd","node_id":"MDY6Q29tbWl0NzYzODQxN2RiNmQ1OWYzYzQzMWQzZTFmMjYxY2M2MzcxNTU2ODRjZA==","url":"https://api.github.com/repos/chrisreddington/rss-parser/git/commits/7638417db6d59f3c431d3e1f261cc637155684cd","html_url":"https://github.com/chrisreddington/rss-parser/git/commit/7638417db6d59f3c431d3e1f261cc637155684cd","author":{"date":"2014-11-07T22:01:45Z","name":"MonalisaOctocat","email":"octocat@github.com"},"committer":{"date":"2014-11-07T22:01:45Z","name":"MonalisaOctocat","email":"octocat@github.com"},"message":"mycommitmessage","tree":{"url":"https://api.github.com/repos/chrisreddington/rss-parser/git/trees/691272480426f78a0138979dd3ce63b77f706feb","sha":"691272480426f78a0138979dd3ce63b77f706feb"},"parents":[{"url":"https://api.github.com/repos/chrisreddington/rss-parser/git/commits/1acc419d4d6a9ce985db7be48c6349a0475975b5","html_url":"https://github.com/chrisreddington/rss-parser/git/commit/1acc419d4d6a9ce985db7be48c6349a0475975b5","sha":"1acc419d4d6a9ce985db7be48c6349a0475975b5"}],"verification":{"verified":false,"reason":"unsigned","signature":null,"payload":null}}})
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let expectedGetOutputObject = {"data":{"type":"file","encoding":"base64","size":5362,"name":"README.md","path":"README.md","content":"IyBZb2dhIEJvmsgaW4gcHJvZ3Jlc3MhIEZlZWwgdAoKOndhcm5pbmc6IFdvc\\nZnJlZSBmUgdG8gY0byBjaGVjayBvdXQgdGhlIGFwcCwgYnV0IGJlIHN1c29t\\nZSBiYWNrIG9uY2UgaXQgaXMgY29tcGxldGUuCgpBIHdlYiBhcHAgdGhhdCBs\\nZWFkcyB5b3UgdGhyb3VnaCBhIHlvZ2Egc2Vzc2lvbi4KCltXb3Jrb3V0IG5v\\ndyFdKGh0dHBzOi8vc2tlZHdhcmRzODguZ2l0aHViLmlvL3lvZ2EvKQoKPGlt\\nZyBzcmM9InNyYy9pbWFnZXMvbWFza2FibGVfaWNvbl81MTIucG5nIiBhbHQ9\\nImJvdCBsaWZ0aW5nIHdlaWdodHMiIHdpZHRoPSIxMDAiLz4KCkRvIHlvdSBo\\nYXZlIGZlZWRiYWNrIG9yIGlkZWFzIGZvciBpbXByb3ZlbWVudD8gW09wZW4g\\nYW4gaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9za2Vkd2FyZHM4OC95b2dh\\nL2lzc3Vlcy9uZXcpLgoKV2FudCBtb3JlIGdhbWVzPyBWaXNpdCBbQ25TIEdh\\nbWVzXShodHRwczovL3NrZWR3YXJkczg4LmdpdGh1Yi5pby9wb3J0Zm9saW8v\\nKS4KCiMjIERldmVsb3BtZW50CgpUbyBhZGQgYSBuZXcgcG9zZSwgYWRkIGFu\\nIGVudHJ5IHRvIHRoZSByZWxldmFudCBmaWxlIGluIGBzcmMvYXNhbmFzYC4K\\nClRvIGJ1aWxkLCBydW4gYG5wbSBydW4gYnVpbGRgLgoKVG8gcnVuIGxvY2Fs\\nbHkgd2l0aCBsaXZlIHJlbG9hZGluZyBhbmQgbm8gc2VydmljZSB3b3JrZXIs\\nIHJ1biBgbnBtIHJ1biBkZXZgLiAoSWYgYSBzZXJ2aWNlIHdvcmtlciB3YXMg\\ncHJldmlvdXNseSByZWdpc3RlcmVkLCB5b3UgY2FuIHVucmVnaXN0ZXIgaXQg\\naW4gY2hyb21lIGRldmVsb3BlciB0b29sczogYEFwcGxpY2F0aW9uYCA+IGBT\\nZXJ2aWNlIHdvcmtlcnNgID4gYFVucmVnaXN0ZXJgLikKClRvIHJ1biBsb2Nh\\nbGx5IGFuZCByZWdpc3RlciB0aGUgc2VydmljZSB3b3JrZXIsIHJ1biBgbnBt\\nIHN0YXJ0YC4KClRvIGRlcGxveSwgcHVzaCB0byBgbWFpbmAgb3IgbWFudWFs\\nbHkgdHJpZ2dlciB0aGUgYC5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWxg\\nIHdvcmtmbG93Lgo=\\n","sha":"3d21ec53a331a6f037a91c368710b99387d012c1","url":"https://api.github.com/repos/chrisreddington/rss-parser/contents/README.md","git_url":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","html_url":"https://github.com/chrisreddington/rss-parser/blob/master/README.md","download_url":"https://raw.githubusercontent.com/chrisreddington/rss-parser/master/README.md","_links":{"git":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","self":"https://api.github.com/repos/chrisreddington/rss-parser/contents/README.md","html":"https://github.com/chrisreddington/rss-parser/blob/master/README.md"}}, "headers": {"content-type": "application/json", "x-powered-by": "msw",}, "status": 200, "url": "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext?ref=refs%2Fheads%2F2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secure",}
let expectedPostOutputObject = {"data":{"content":{"name":"hello.txt","path":"notes/hello.txt","sha":"95b966ae1c166bd92f8ae7d1c313e738c731dfc3","size":9,"url":"https://api.github.com/repos/chrisreddington/rss-parser/contents/notes/hello.txt","html_url":"https://github.com/chrisreddington/rss-parser/blob/master/notes/hello.txt","git_url":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3","download_url":"https://raw.githubusercontent.com/octocat/HelloWorld/master/notes/hello.txt","type":"file","_links":{"self":"https://api.github.com/repos/chrisreddington/rss-parser/contents/notes/hello.txt","git":"https://api.github.com/repos/chrisreddington/rss-parser/git/blobs/95b966ae1c166bd92f8ae7d1c313e738c731dfc3","html":"https://github.com/chrisreddington/rss-parser/blob/master/notes/hello.txt"}},"commit":{"sha":"7638417db6d59f3c431d3e1f261cc637155684cd","node_id":"MDY6Q29tbWl0NzYzODQxN2RiNmQ1OWYzYzQzMWQzZTFmMjYxY2M2MzcxNTU2ODRjZA==","url":"https://api.github.com/repos/chrisreddington/rss-parser/git/commits/7638417db6d59f3c431d3e1f261cc637155684cd","html_url":"https://github.com/chrisreddington/rss-parser/git/commit/7638417db6d59f3c431d3e1f261cc637155684cd","author":{"date":"2014-11-07T22:01:45Z","name":"MonalisaOctocat","email":"octocat@github.com"},"committer":{"date":"2014-11-07T22:01:45Z","name":"MonalisaOctocat","email":"octocat@github.com"},"message":"mycommitmessage","tree":{"url":"https://api.github.com/repos/chrisreddington/rss-parser/git/trees/691272480426f78a0138979dd3ce63b77f706feb","sha":"691272480426f78a0138979dd3ce63b77f706feb"},"parents":[{"url":"https://api.github.com/repos/chrisreddington/rss-parser/git/commits/1acc419d4d6a9ce985db7be48c6349a0475975b5","html_url":"https://github.com/chrisreddington/rss-parser/git/commit/1acc419d4d6a9ce985db7be48c6349a0475975b5","sha":"1acc419d4d6a9ce985db7be48c6349a0475975b5"}],"verification":{"verified":false,"reason":"unsigned","signature":null,"payload":null}}}, "headers": {"content-type": "application/json", "x-powered-by": "msw",}, "status": 201, "url": "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext",}

test("create_or_update_file should return the response object when the initial get is successful", async () => {
  // Act & Assert
  expect(
    await utils.create_or_update_file(github.getOctokit(github_token), itemObject, input_config, {})).toStrictEqual(expectedGetOutputObject);
});

test("create_or_update_file should return the response object when the initial get is unsuccessful, but post is successful", async () => {

  server.use(
    rest.get(
      "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext",
      (req, res, ctx) => res(ctx.status(404))
    )
  );

  // Act & Assert
  expect(
    await utils.create_or_update_file(github.getOctokit(github_token), itemObject, input_config, {})).toStrictEqual(expectedPostOutputObject);
});

test("create_or_update_file should return null when the initial get is unsuccessful, followed by an unsuccessful post", async () => {

  server.use(
    rest.get(
      "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext",
      (req, res, ctx) => res(ctx.status(404))
    ),
    rest.put(
      "https://api.github.com/repos/chrisreddington/rss-parser/contents/subfolder2022-12-20-how-we-use-github-to-be-more-productive-collaborative-and-secureext",
      (req, res, ctx) => res(ctx.status(404))
    )
  );

  // Act & Assert
  expect(
    await utils.create_or_update_file(github.getOctokit(github_token), itemObject, input_config, {})).toBe(null);
});
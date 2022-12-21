# RSS Parser (GitHub Action)

This is a [GitHub Action](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) that parses an RSS feed based on a provided URL. It will then either -
- Create a new [GitHub issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) for each item in the feed
- Output the feed items as a JSON object
- Create a file for each item in the feed, and create a new [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) for each new file.

**Please note that this action is still in active development. Breaking changes are expected.**

# Usage

<!-- start usage -->

```yaml
- uses: chrisreddington/rss-parser-action@main
  with:
    # Branch Prefix is used when the script_output is set to pull_request.
    # This is the prefix to the branch name which is created (i.e. each new feed item will be created in  a new git branch. The branch will have a prefix using this input).
    branch_prefix:

    # Extension is used when the script_output is set to pull_request.
    # This is the extension to the files which are created (i.e. each new feed item will be a new file with this extension).
    extension: ''

    # URL of the RSS feed to parse. Required.
    # Must be a valid URL, starting with http or https.
    feed_url: ''

    # GitHub Token. Required if setting the script_output to 'issue', or 'pull_request'. 
    # so that the GitHub action can create issues on your behalf.
    # This is automatically injected with the GitHub Action runner's
    # token, but you can override this with another token (e.g. PAT)
    # if needed, (e.g. to create issues as a different user).
    # 
    # Otherwise, this is not required.
    github_token: ''

    # Last parsed file is used when the script_output is set to pull_request.
    # This is the file which will be used to store the last parse information for each configuration.
    # 
    # A configuration is a combination of the inputs to the action. An example can be found in the repository for this action, under the .github folder, in a branch called 'twitter-config'.
    # The file is deliberately not committed directly into main, in case there are branch protection rules in place. Instead, it's up to the user to merge the file into main.
    last_parsed_file: ''

    # The desired action to take once this action has executed. Required.
    # Must be one of: issue, json, pull_request
    script_output: ''

    # Subfolder is used when the script_output is set to pull_request.
    # This is the subfolder where files will be created (i.e. each new feed item will be a new file in that subfolder).
    subfolder: ''
```

# Scenarios

## Manually trigger an RSS Feed Scan and add to GitHub Issues

```yaml
name: "Manual RSS Feed Scan - Output to Issues"
on:
  workflow_dispatch:
    inputs:
      feed_url:
        description: "URL of RSS feed to be read"
        type: string
        required: true
        default: 'https://github.blog/feed/'
      script_output:
        description: "Output of the script (e.g. issue, json, pull_request)"
        type: string
        required: true
        default: 'issue'
jobs:
  manual_rss_feed_execution:
    runs-on: ubuntu-latest
    steps: 
      - uses: chrisreddington/rss-parser-action@main
        with:
          feed_url: ${{ inputs.feed_url }}
          script_output: ${{ inputs.script_output }}
```

## Manually trigger an RSS Feed Scan and output a JSON object of the feed items

```yaml
name: "Manual RSS Feed - Output to JSON"
on:
  workflow_dispatch:
    inputs:
      feed_url:
        description: "URL of RSS feed to be read"
        type: string
        required: true
        default: 'https://github.blog/feed/'
      script_output:
        description: "Output of the script (e.g. issue, json, pull_request)"
        type: string
        required: true
        default: 'json'
jobs:
  manual_rss_feed_execution:
    runs-on: ubuntu-latest
    steps: 
      - uses: chrisreddington/rss-parser-action@main
        with:
          feed_url: ${{ inputs.feed_url }}
          script_output: ${{ inputs.script_output }}
```

## Manually trigger an RSS Feed Scan and create a Pull Request for each item

```yaml
name: "Manual RSS Feed Scan - Create PRs"
on:
  workflow_dispatch:
    inputs:
      branch_prefix:
        description: "Branch Prefix (used when pull_request mode is set)"
        type: string
        required: false
        default: 'twitter'
      extension:
        description: "File extension (used when pull_request mode is set)"
        type: string
        required: false
        default: '.tweet'
      feed_url:
        description: "URL of RSS feed to be read"
        type: string
        required: true
        default: 'https://github.blog/feed/'
      last_parsed_file:
        description: "Filename to be used for the last parsed file (used when pull_request mode is set)"
        type: string
        required: false
        default: '.github/last-parsed.json'
      script_output:
        description: "Output of the script (e.g. issue, json, pull_request)"
        type: string
        required: true
        default: 'pull_request'
      subfolder:
        description: "Subfolder (used when pull_request mode is set)"
        type: string
        required: false
        default: 'twitter'
jobs:
  manual_rss_feed_execution:
    runs-on: ubuntu-latest
    steps: 
      - uses: chrisreddington/rss-parser-action@main
        with:
          branch_prefix: ${{ inputs.branch_prefix }}
          extension: ${{ inputs.extension }}
          feed_url: ${{ inputs.feed_url }}
          last_parsed_file: ${{ inputs.last_parsed_file }}
          script_output: ${{ inputs.script_output }}
          subfolder: ${{ inputs.subfolder }}
```

## Scheduled daily parse of the GitHub Blog

```yaml
name: "Daily - GitHub Blog"
on:
  workflow_dispatch:
  schedule: 
    - cron: '0 0 * * *'
jobs:
  github_blog_daily_parse:
    runs-on: ubuntu-latest
    steps: 
      - uses: chrisreddington/rss-parser-action@main
        with:
          branch_prefix: 'gh-blog'
          extension: 'tweet'
          feed_url: 'https://github.blog/feed/'
          script_output: 'pull_request'
          subfolder: 'tweets'
```

# Contributing

This project welcomes contributions! Please see the [Contributing Guide](CONTRIBUTING.md) for more information.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

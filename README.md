# RSS Parser (GitHub Action)

This is a [GitHub Action](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) that parses an RSS feed based on a provided URL. It will then either -
- Create a new [GitHub issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) for each item in the feed
- Output the feed items as a JSON object

**Please note that this action is still in active-development. There are features not yet present (e.g. checking if a feed item has already been added as a GitHub issue), and breaking changes are expected.**

# Usage

<!-- start usage -->

```yaml
- uses: chrisreddington/rss-parser-action@main
  with:
    # URL of the RSS feed to parse. Required.
    # Must be a valid URL, starting with http or https.
    feed_url: ''

    # The desired action to take once this action has executed. Required.
    # Must be one of: issue, json
    script_output: ''

    # GitHub Token. Required if setting the script_output to 'issue', 
    # so that the GitHub action can create issues on your behalf.
    # This is automatically injected with the GitHub Action runner's
    # token, but you can override this with another token (e.g. PAT)
    # if needed, (e.g. to create issues as a different user).
    # 
    # Otherwise, this is not required.
    github_token: ''
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
        description: "Output of the script (e.g. issue, json)"
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
        description: "Output of the script (e.g. issue, json)"
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

# Contributing

This project welcomes contributions! Please see the [Contributing Guide](CONTRIBUTING.md) for more information.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

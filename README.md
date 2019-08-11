# git_crawler
Uses https://www.npmjs.com/package/@octokit/rest to list an organization's git repos and topics to csv.

## Setup
Goto https://github.com/settings/tokens to generate a personal access token
Store it in an environment variable `GIT_ACCESS_KEY`
Set an environment variable for your git organization (for example `andrewcsontos`) in `GIT_ACCESS_KEY`

`npm run start` - pulls list of git repos into a file (data.txt)

`npm run parse_data` - parses data.txt into a csv


# git_crawler
Uses https://www.npmjs.com/package/@octokit/rest to walk an organization's git repos. 

Goto https://github.com/settings/tokens to generate a personal access token
Store it in an environment variable `GIT_ACCESS_KEY`

`npm run start` - pulls code into a file (data.txt)

`npm run parse_data` - parses data.txt into a csv


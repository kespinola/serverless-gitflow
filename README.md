# Serverless Gitflow

Easily manage gitflow with helpful endpoints for creating candidates and releases.

## Set Up
1. `npm install -g serverless`
2. `sls project init`
3. `npm i`

## Environment Variables
Set in `_meta/Variables/s-variables-common.json`

```
"project": "serverless-gitflow",
"github_token": "<YOUR_ROKEN>",
"github_email": "ksespinola@gmail.com",
"github_user": "ksespinola",
"repo": "prism-serverless",
"master_branch": "master",
"develop_branch": "develop"
```
## Supported Endpoints

### `candidate~POST`

### `release~POST`

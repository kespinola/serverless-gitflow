# Serverless Gitflow

Easily manage gitflow with helpful endpoints for creating candidates and releases.

## Goal

expose a serious of endpoints that make managing an affective gitflow with ease.

## Milestones
- [X] Create candidate branch
- [X] Make pull request from candidate to master
- [ ] Build PR message using merge pull commits
  - [X] Calculate pulls since last master merge
  - [X] Link to Pull Request
  - [ ] Pull Feature Labels
  - [ ] Note Assign
  - [ ] Slack assign
- [ ] Smart calculate version
- [ ] Release webhook creates tag on master after merge

## Set Up
1. `npm install -g serverless`
2. `sls project init`
3. `npm i`

## Environment Variables
Set in `_meta/Variables/s-variables-common.json`

```
"project": "serverless-gitflow",
"github_token": "<GITHUB_TOKEN>",
"repo": "prism-serverless",
"master_branch": "master",
"develop_branch": "develop",
"candidate_name": "candidate"
```
## Supported Endpoints

### `candidate~POST`
1. Creates a candidate for the repo by comparing master vs develop.
2. Evaluate merged PRs

### `release~POST`

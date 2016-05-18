import Promise from 'bluebird';
import moment from 'moment';
import React from 'react';
import toMarkdown from 'to-markdown';
import { compose } from 'ramda';
import { renderToString } from 'react-dom/server';
import auth from './../config/auth';
import github from './../config/github';
import Candidate from './../components/Candidate';

const { DEVELOP_BRANCH, MASTER_BRANCH, CANDIDATE_NAME } = process.env;

const pullRequests = Promise.promisify(github.pullRequests.getAll);
const getCommit = Promise.promisify(github.repos.getCommit);
const getBranch = Promise.promisify(github.repos.getBranch);
const createPull = Promise.promisify(github.pullRequests.create);
const createReference = Promise.promisify(github.gitdata.createReference);

const pullsAfterDate = (date, pulls) =>
  pulls.filter(({ merged_at }) => moment(merged_at).isAfter(date));

const createCandidateBody = compose(
  toMarkdown,
  pulls => renderToString(<Candidate pulls={pulls} />)
);

github.authenticate(auth.toJS());

export default (user, repo, release = '0.0.0') => new Promise((resolve, reject) => {
  const candidate = `${CANDIDATE_NAME}/${release}`;

  getBranch({
    user,
    repo,
    branch: MASTER_BRANCH,
  })
  .then(({ commit: { sha } }) => getCommit({ user, repo, sha }))
  .then(({ committer: { date } }) =>
    Promise.join(
      pullRequests({
        user,
        repo,
        state: 'closed',
        head: DEVELOP_BRANCH,
      }),
      (pulls) => pullsAfterDate(date, pulls)
    )
  )
  .then((pulls) =>
    getBranch({
      user,
      repo,
      branch: DEVELOP_BRANCH,
    })
    .then(({ commit: { sha } }) =>
      createReference({
        user,
        repo,
        ref: `refs/heads/${candidate}`,
        sha,
      })
    )
    .then(() =>
      createPull({
        user,
        repo,
        title: `Candidate ${release}`,
        head: candidate,
        base: MASTER_BRANCH,
        body: createCandidateBody(pulls),
      })
    )
  )
  .then((result) => { resolve(result); })
  .catch((err) => {
    reject(err);
  });
});

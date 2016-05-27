import Promise from 'bluebird';
import moment from 'moment';
import React from 'react';
import toMarkdown from 'to-markdown';
import { compose } from 'ramda';
import { renderToStaticMarkup } from 'react-dom/server';
import auth from './../config/auth';
import github from './../config/github';
import Candidate from './../components/Candidate';

const { DEVELOP_BRANCH, MASTER_BRANCH, CANDIDATE_NAME } = process.env;

const pullRequests = Promise.promisify(github.pullRequests.getAll);
const getCommit = Promise.promisify(github.repos.getCommit);
const getBranch = Promise.promisify(github.repos.getBranch);
const createPull = Promise.promisify(github.pullRequests.create);
const createReference = Promise.promisify(github.gitdata.createReference);
const getLabels = Promise.promisify(github.issues.getIssueLabels);

const pullsAfterDate = (date, pulls) =>
  pulls.filter(({ merged_at }) => moment(merged_at).isAfter(date));

const getTitle = release => `Candidate ${release}`;

const createBody = compose(
  html => toMarkdown(html, { gfm: true }),
  props => renderToStaticMarkup(<Candidate {...props} />)
);

github.authenticate(auth.toJS());

export default (user, repo, release) => {
  const candidate = `${CANDIDATE_NAME}/${release}`;

  return getBranch({
    user,
    repo,
    branch: MASTER_BRANCH,
  })
  .then(({ commit: { sha } }) => getCommit({ user, repo, sha }))
  .then(({ commit: { committer: { date } } }) =>
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
  .mapSeries(
    pull => getLabels({ user, repo, number: pull.number })
      .then(labels => ({
        ...pull,
        labels,
      }))
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
        sha,
        ref: `refs/heads/${candidate}`,
      })
    )
    .then(() => createPull({
        user,
        repo,
        head: candidate,
        base: MASTER_BRANCH,
        title: getTitle(release),
        body: createBody({ pulls }),
      })
    )
  );
};

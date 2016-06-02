import Promise from 'bluebird';
import auth from './../config/auth';
import github from './../config/github';
import { last } from 'ramda';

const { MASTER_BRANCH } = process.env;

const getTitle = release => `Release ${release}`;

const createRelease = Promise.promisify(github.releases.createRelease);

github.authenticate(auth.toJS());

export default (
  {
    pull_request: { body, head: { ref } },
    repository: { owner: { login }, name },
  }
) => {
  const release = last(ref.split('/'));

  return createRelease({
    owner: login,
    repo: name,
    body,
    target_commitish: MASTER_BRANCH,
    tag_name: release,
    name: getTitle(release),
  });
};

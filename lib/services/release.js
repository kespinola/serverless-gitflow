import Promise from 'bluebird';
import auth from './../config/auth';
import github from './../config/github';
import {
  compose,
  filter,
  view,
  isNil,
  not,
  lensProp,
  nth,
  last,
} from 'ramda';

const { MASTER_BRANCH } = process.env;

const getTitle = release => `Release ${release}`;

const getPulls = Promise.promisify(github.pullRequests.getAll);
const createRelease = Promise.promisify(github.releases.createRelease);

github.authenticate(auth.toJS());

export default (
  { name: repo, owner: { name: user } }
) =>
  getPulls({
    user,
    repo,
    state: 'closed',
    head: MASTER_BRANCH,
  })
  .then(
    compose(
      nth(0),
      filter(
        compose(
          not,
          isNil,
          view(lensProp('merged_at'))
        )
      )
    )
  )
  .then(({ body, head: { ref } }) => {
    const release = last(ref.split('/'));

    return createRelease({
      owner: user,
      repo,
      body,
      target_commitish: MASTER_BRANCH,
      tag_name: release,
      name: getTitle(release),
    });
  });

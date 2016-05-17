import Promise from 'bluebird';
import auth from './../config/auth';
import github from './../config/github';

const { GITHUB_USER, DEVELOP_BRANCH, MASTER_BRANCH, REPO } = process.env;

github.authenticate(auth.toJS());

export default () => new Promise((resolve, reject) =>
  github.repos.compareCommits({
    user: GITHUB_USER,
    repo: REPO,
    base: MASTER_BRANCH,
    head: DEVELOP_BRANCH,
  }, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  }));

import { Map } from 'immutable';

const { GITHUB_TOKEN } = process.env;

export default new Map({
  type: 'oauth',
  token: GITHUB_TOKEN,
});

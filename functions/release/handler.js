import release from './../../lib/services/release';
import { ifElse, not, isNil, equals, compose, lensProp, view } from 'ramda';

const { MASTER_BRANCH } = process.env;

const i18n = {
  notCandidateMerge: 'Not a closed master pull request',
};

export default ifElse(
  ({ pull_request: { base: { ref }, merged_at } }) => not(isNil(merged_at)) && equals(ref, MASTER_BRANCH),
  release,
  () => ({ message: i18n.notCandidateMerge, status: 422 })
);

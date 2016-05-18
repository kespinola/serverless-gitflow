import candidate from './../../lib/services/candidate';

export default ({ user, repo, release }) => candidate(user, repo, release);

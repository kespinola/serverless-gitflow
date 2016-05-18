import React, { PropTypes } from 'react';

const Candidate = ({ pulls, candidate }) => (
  <article>
    <h1>{candidate}</h1>
    <ul>
      {pulls.map(({ id, url, title, number }) => (<li key={id}><a href={url}>{`#${number} - ${title}`}</a></li>))}
    </ul>
  </article>
);

Candidate.propTypes = {
  pulls: PropTypes.array,
  candidate: PropTypes.string,
};

export default Candidate;

import React, { PropTypes } from 'react';

const Candidate = ({ pulls, title }) => (
  <article>
    <h1>{title}</h1>
    <ul>
      {pulls.map(({ id, url, title, number }) => (<li key={id}><a href={url}>{`#${number} - ${title}`}</a></li>))}
    </ul>
  </article>
);

Candidate.propTypes = {
  pulls: PropTypes.array,
  title: PropTypes.string,
};

export default Candidate;

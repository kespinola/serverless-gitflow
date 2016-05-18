import React from 'react';

const Candidate = ({ pulls, header }) => (
  <article>
    <h1>{header}</h1>
    <ul>
      {pulls.map(({ id, url, title }) =>(<li key={id}><a href={url}>{title}</a></li>))}
    </ul>
  </article>
);

export default Candidate;

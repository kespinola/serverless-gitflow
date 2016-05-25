import React, { PropTypes } from 'react';
import labelConfig from './../config/labels';
import { join } from 'underscore.string';

const i18n = {
  keyHeader: 'Label Key',
  emoji: 'Emoji',
  label: 'Label',
};

const Candidate = ({ pulls, title }) => (
  <article>
    <h1>{title}</h1>
    <ul>
      {pulls.map(({
        html_url: url,
        id,
        labels,
        number,
        title: pullTitle,
      }) => (
        <li key={id}>
          <a href={url}>{`#${number} - ${pullTitle} `}</a>
          {join(' ', ...labels.map(({ name }) => labelConfig[name]))}
        </li>
      ))}
    </ul>
    <h3>{i18n.keyHeader}</h3>
    <table>
      <thead>
        <tr>
          <th>{i18n.emoji}</th>
          <th>{i18n.label}</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(labelConfig).map((label) => (
          <tr key={label}>
            <td>{labelConfig[label]}</td>
            <td>{label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </article>
);

Candidate.propTypes = {
  pulls: PropTypes.array,
  title: PropTypes.string,
};

export default Candidate;

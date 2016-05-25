import React, { PropTypes } from 'react';
import labelConfig from './../config/labels';
import { join } from 'underscore.string';
import moment from 'moment';

const i18n = {
  assignee: 'Assignee',
  emoji: 'Emoji',
  keyHeader: 'Label Key',
  label: 'Label',
  labels: 'Labels',
  mergedAt: 'Merged',
  title: 'Title',
};

const Candidate = ({ pulls, title }) => (
  <article>
    <h1>{title}</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{i18n.title}</th>
          <th>{i18n.assignee}</th>
          <th>{i18n.mergedAt}</th>
          <th>{i18n.labels}</th>
        </tr>
      </thead>
      <tbody>
        {pulls.map(({
          html_url: url,
          id,
          labels,
          number,
          assignee,
          title: pullTitle,
          merged_at: mergedAt,
        }) => (
          <tr key={id}>
            <td>{number}</td>
            <td><a href={url}>{pullTitle}</a></td>
            <td>
              {assignee && (
                <a href={assignee.html_url}>
                  {`@${assignee.login}`}
                </a>
              )}
            </td>
            <td>{moment(mergedAt).format('MMM DD')}</td>
            <td>{join(' ', ...labels.map(({ name }) => labelConfig[name]))}</td>
          </tr>
        ))}
      </tbody>
    </table>
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

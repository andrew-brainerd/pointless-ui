import React from 'react';
import styles from './Attribution.module.scss';

const iconCreators = [
  {
    authorName: 'Freepik',
    authorLink: 'https://www.flaticon.com/authors/freepik'
  },
  {
    authorName: 'Smashicons',
    authorLink: 'https://www.flaticon.com/authors/smashicons'
  },
  {
    authorName: 'bqlqn',
    authorLink: 'https://www.flaticon.com/authors/bqlqn'
  },
  {
    authorName: 'Dave Gandy',
    authorLink: 'https://www.flaticon.com/authors/dave-gandy'
  }
];

const Attribution = () => {
  return (
    <div className={styles.attribution}>
      <h2>Icons Made By</h2>
      {iconCreators.map(({ authorLink, authorName }) => {
        return (
          <div key={authorName} className={styles.author}>
            <a href={authorLink} title={authorName}>{authorName}</a> from
            <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
          </div>
        );
      })}
    </div>
  );
};

export default Attribution;

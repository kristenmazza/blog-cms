import styles from './PostCard.module.css';
import PropTypes from 'prop-types';
import OptionButtons from './OptionButtons';

export default function PostCard({
  src,
  date,
  title,
  published,
  publishedStatus,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img loading='lazy' src={src} alt='' className={styles.cardImage} />
      </div>
      <div className={styles.cardBody}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <div className={styles.row}>
          <span className={styles.published}>{publishedStatus}</span> •
          <span className={styles.cardDate}>{date}</span>
        </div>
        <OptionButtons published={published} />
      </div>
    </div>
  );
}

PostCard.propTypes = {
  src: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  published: PropTypes.bool,
  publishedStatus: PropTypes.string,
};

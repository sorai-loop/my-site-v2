import type { ProfileTopicItem } from '../../types/profile';
import { ProfileSubHeader } from './ProfileSubHeader';
import styles from './ProfileTopics.module.css';

export type ProfileTopicsProps = {
  topics: ProfileTopicItem[];
  secNo?: string | number;
  className?: string;
};

export const ProfileTopics = ({
  topics,
  secNo = '06',
  className,
}: ProfileTopicsProps) => {
  const code = `SEC. ${String(secNo).padStart(2, '0')} // FIELD NOTES`;

  return (
    <div
      className={
        className ? `${styles.recordBlock} ${className}` : styles.recordBlock
      }
    >
      <ProfileSubHeader code={code} title="トピック" />
      <div className={styles.topicList}>
        {topics.map((topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <span className={styles.topicTag}>// {topic.tag}</span>
            <h4 className={styles.topicTitle}>{topic.title}</h4>
            <p className={styles.topicBody}>{topic.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

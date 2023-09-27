import { format as formatDate } from 'date-fns';

import FavouriteToggle from './FavouriteToggle';
import styles from './Repo.module.css';

import type { Item as RepoItem } from '@/types/repos';

type Props = {
  repo: RepoItem;
  isFavourite: boolean;
};

function Repo(props: Props) {
  const {
    id,
    name,
    created_at: createdAt,
    stargazers_count: stargazersCount,
    html_url: htmlUrl,
  } = props.repo;

  const formattedCreatedAt = formatDate(new Date(createdAt), 'dd MMM yyyy');

  return (
    <div className={styles.repo}>
      <h3>{name}</h3>
      <p>Created: {formattedCreatedAt}</p>
      <p>⭐️ {stargazersCount}</p>
      <a href={htmlUrl}>See it on GitHub</a>
      <FavouriteToggle id={id} isFavourite={props.isFavourite} />
    </div>
  );
}

export default Repo;

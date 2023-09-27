import { useEffect, useState } from 'react';
import ky from 'ky';

import { getTrendingPublicRepos } from '@/api/controllers/repos';
import Repo from '@/components/repos/Repo';

import styles from './Repos.module.css';

import type { Item as RepoItem } from '@/types/repos';

function Repos() {
  const [repos, setRepos] = useState<RepoItem[]>();
  const [favouriteRepoIds, setFavouriteRepoIds] = useState<number[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const getFavouriteRepoIds = async (): Promise<number[]> => {
          return ky.get('/api/favourites').json();
        };

        const [trendingPublicReposRes, favouriteRepoIdsRes] = await Promise.all(
          [getTrendingPublicRepos(), getFavouriteRepoIds()]
        );

        setRepos(trendingPublicReposRes);
        setFavouriteRepoIds(favouriteRepoIdsRes);
      } catch (err) {
        console.error(err);

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  if (repos) {
    return (
      <div className={styles.repos}>
        <ul>
          {repos.map((item) => (
            <li key={item.id}>
              <Repo
                repo={item}
                isFavourite={favouriteRepoIds?.includes(item.id) ?? false}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p>No data available</p>;
}

export default Repos;

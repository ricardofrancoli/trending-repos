import { useEffect, useState } from 'react';

import { getTrendingPublicRepos } from '@/api/controllers/repos';
import Repo from '@/components/repos/Repo';

import type { Item as RepoItem } from '@/types/repos';

function Repos() {
  const [repos, setRepos] = useState<RepoItem[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await getTrendingPublicRepos();

        setRepos(res);
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
      <>
        <ul>
          {repos.map((item) => (
            <li key={item.id}>
              <Repo {...item} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <p>No data available</p>;
}

export default Repos;

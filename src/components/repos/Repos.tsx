import { useEffect, useState } from 'react';

import { getTrendingPublicRepos } from '@/api/controllers/repos';

function Repos() {
  const [data, setData] =
    useState<Awaited<ReturnType<typeof getTrendingPublicRepos>>>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await getTrendingPublicRepos();

        setData(res);
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

  if (data) {
    return (
      <>
        <ul>
          {data.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </>
    );
  }

  return <p>No data available</p>;
}

export default Repos;

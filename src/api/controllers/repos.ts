import { format as formatDate, subDays } from 'date-fns';
import ky from 'ky';

import type { Endpoints } from '@octokit/types';

type Repos = Endpoints['GET /search/repositories'];

export const getTrendingPublicRepos = async (perPage = 30) => {
  // TODO: solve time difference with UTC
  const sevenDaysAgo = formatDate(subDays(new Date(), 7), 'yyyy-MM-dd');

  const params: Repos['parameters'] = {
    q: `is:public created:>${sevenDaysAgo}T00:00:00Z`,
    sort: 'stars',
    order: 'desc',
    per_page: perPage,
  };

  const trendingPublicRepos: Repos['response']['data'] = await ky(
    'https://api.github.com/search/repositories',
    {
      searchParams: params,
    }
  ).json();

  return trendingPublicRepos;
};

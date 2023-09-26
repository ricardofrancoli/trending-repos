import { format as formatDate, subDays } from 'date-fns';
import ky from 'ky';

import type { Repos } from '@/types';

export const getTrendingPublicRepos = async (perPage = 30) => {
  // TODO: solve time difference with UTC
  const sevenDaysAgo = formatDate(subDays(new Date(), 7), 'yyyy-MM-dd');

  const params: Repos.Parameters = {
    q: `is:public created:>${sevenDaysAgo}T00:00:00Z`,
    sort: 'stars',
    order: 'desc',
    per_page: perPage,
  };

  const { items: trendingPublicRepos }: Repos.Response['data'] = await ky(
    'https://api.github.com/search/repositories',
    {
      searchParams: params,
    }
  ).json();

  return trendingPublicRepos satisfies Repos.Item[];
};

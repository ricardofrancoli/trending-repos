import ky from 'ky';
import { afterEach, describe, expect, it, vi } from 'vitest';

import * as repos from '@/api/controllers/repos';
import { act, render, screen, waitFor } from '@testing-library/react';

import Repos from './Repos';

import type { Response as ReposResponse } from '@/types/repos';

const mockKy = vi.mocked(ky);
vi.mock('ky');

const mockGetTrendingPublicRepos = (data: ReposResponse['data']['items']) => {
  vi.spyOn(repos, 'getTrendingPublicRepos').mockImplementation(() =>
    Promise.resolve(data)
  );
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('<Repos />', () => {
  it('displays loading state initially', async () => {
    mockGetTrendingPublicRepos([]);
    mockKy.get = vi.fn().mockReturnValue({
      json: () => Promise.resolve([]),
    });

    render(<Repos />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('displays error state on fetch error', async () => {
    mockGetTrendingPublicRepos([]);
    vi.spyOn(ky, 'get').mockImplementation(() => {
      throw new Error('Error');
    });

    render(<Repos />);

    await waitFor(() =>
      expect(screen.getByText('Error...')).toBeInTheDocument()
    );
  });

  it('displays repos and favourites after fetching', async () => {
    const isoStringDate = new Date().toISOString();

    const mockRepos = {
      total_count: 2,
      incomplete_results: false,
      items: [
        {
          id: 1,
          name: 'Repo1',
          created_at: isoStringDate,
          stargazers_count: 1,
        },
        {
          id: 2,
          name: 'Repo2',
          created_at: isoStringDate,
          stargazers_count: 1,
        },
      ],
    } as ReposResponse['data'];

    const mockFavouriteIds = [1];

    mockGetTrendingPublicRepos(mockRepos.items);
    mockKy.get = vi.fn().mockReturnValue({
      json: () => Promise.resolve(mockFavouriteIds),
    });

    await act(async () => {
      render(<Repos />);
    });

    await waitFor(() => {
      mockRepos.items.forEach((repo) => {
        expect(screen.getByText(repo.name)).toBeInTheDocument();
      });
    });
  });
});

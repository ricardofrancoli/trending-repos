import type { Endpoints } from '@octokit/types';

export type Endpoint = Endpoints['GET /search/repositories'];
export type Parameters = Endpoint['parameters'];
export type Response = Endpoint['response'];
export type Item = Endpoint['response']['data']['items'][number];

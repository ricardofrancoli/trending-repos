import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { api } from './index';

describe('/toggle-favourites', () => {
  beforeAll(async () => {
    await api.ready();
  });

  afterAll(async () => {
    await api.close();
  });

  it('should correctly toggle an ID (add)', async () => {
    const response = await api.inject({
      method: 'POST',
      url: '/api/toggle-favourites',
      payload: {
        id: 12345,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({
      success: true,
      action: 'added',
      message: 'Repo ID 12345 added to favourites',
    });
  });

  it('should return error for invalid request body', async () => {
    const response = await api.inject({
      method: 'POST',
      url: '/api/toggle-favourites',
      payload: {
        invalidKey: 'invalidValue',
      },
    });

    expect(response.statusCode).toBe(500);
    expect(response.payload).toContain('Invalid request body');
  });
});

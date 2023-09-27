import Fastify, { type FastifyRequest } from 'fastify';

import type { FavouriteToggle } from '@/types';

const api = Fastify({
  logger: true,
});

const favouriteIds: number[] = [];

api.get('/api/favourites', async () => {
  return favouriteIds;
});

api.post('/api/toggle-favourites', async (req, reply) => {
  const isValidReqBody = (
    reqBody: FastifyRequest['body']
  ): reqBody is { id: number } => {
    return (
      reqBody instanceof Object &&
      'id' in reqBody &&
      typeof reqBody.id === 'number'
    );
  };

  try {
    if (!isValidReqBody(req.body))
      throw new Error('Invalid request body: needs to be { id: number }');

    const { id } = req.body;

    const needsAdding = !favouriteIds.includes(id);

    if (needsAdding) {
      favouriteIds.push(id);
    } else {
      favouriteIds.splice(favouriteIds.indexOf(id), 1);
    }

    const res: FavouriteToggle.Response = {
      success: true,
      action: needsAdding ? 'added' : 'removed',
      message: `Repo ID ${id} ${
        needsAdding ? 'added to' : 'removed from'
      } favourites`,
    };

    reply.send(res);
  } catch (err) {
    console.error(err);

    reply.status(500).send(`Could not toggle favourite: ${err}`);
  }
});

try {
  await api.listen({ port: 3001 });
  console.log(`Listening on port ${3001}`);
} catch (err) {
  api.log.error(err);
  process.exit(1);
}

import { api } from './index';

try {
  await api.listen({ port: 3001 });
  console.log(`Listening on port ${3001}`);
} catch (err) {
  api.log.error(err);
  process.exit(1);
}

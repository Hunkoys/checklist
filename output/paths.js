import storage from './storage.js';

export function paths(app) {
  app.get('/api/test', (_, res) => {
    storage.read(
      'test.json',
      (s) => console.log(JSON.parse(s)),
      (errt) => console.log(`damn\n${errt}`)
    );
    res.json({ greeting: 'Hello' });
  });
}

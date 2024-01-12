import storage from './storage.js';

export function paths(app) {
  app.get('/api/test', (_, res) => {
    storage.read('test.json', (s) => console.log(JSON.parse(s)));
    res.json({ greeting: 'Hello' });
  });
}

import storage from './storage.js';

export function api(app) {
  app.get('/api/items', (_, res) => {
    storage.read('items.json', (items) => {
      res.send(items);
      console.log(JSON.parse(items));
    });
  });
}

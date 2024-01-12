import storage from './storage.js';

export function api(app) {
  app.get('/items', (_, res) => {
    storage.read('items.json', (items) => {
      res.send(items);
    });
  });

  app.put('/items', (req, res) => {
    storage.read('items.json', (items) => {
      try {
        items = JSON.parse(items);
      } catch {
        console.log();
      }
      if (items.push) {
        items.push(req.body);
      } else items = [req.body];

      storage.save('items.json', JSON.stringify(items));
    });
  });
}

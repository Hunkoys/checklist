import { useCallback, useState } from 'react';
import Item from './Edit/Item';
import Loading from '../Components/Loading';
import ItemData from '../Components/item';

function useFetch(url, options = { method: 'GET', body: null, run: false }) {
  const [data, setData] = useState();
  const [run, setRun] = useState(options.run);

  const goFetch = useCallback(
    (body) => {
      fetch(url, {
        method: options.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((r) => r.text())
        .then((text) => {
          try {
            const o = JSON.parse(text);
            return o;
          } catch {
            return text;
          }
        })
        .then(setData)
        .finally(console.log('fetched'));
    },
    [url]
  );

  if (run) {
    setRun(false);
    goFetch(options.body);
  }

  return [data, goFetch];
}

function Edit({ onFlip }) {
  const goHome = useCallback(() => onFlip('Home'), []);

  const [items, fetchItems] = useFetch('items', { run: true });
  const [_, saveItems] = useFetch('items', { method: 'PUT' });

  return (
    <div>
      {items && items.length ? (
        items.map((item, index) => <Item name={item.name} key={index + item.name} />)
      ) : (
        <Loading />
      )}
      <button onClick={() => saveItems(new ItemData('hi'))}>New</button>
      <button onClick={goHome}>Home</button>
    </div>
  );
}

export default Edit;

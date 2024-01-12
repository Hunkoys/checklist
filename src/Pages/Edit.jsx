import { useCallback, useMemo, useState } from 'react';
import Item from './Edit/Item';
import Loading from '../Components/Loading';

function useFetch(url, options = { method: 'GET', data: null, run: false }) {
  const [data, setData] = useState();
  const [run, setRun] = useState(options.run);

  const f = useCallback(
    (options) => {
      fetch(url, {
        method: options.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((d) => setData(d));
    },
    [url]
  );

  if (run) {
    setRun(false);
    f(options);
  }

  return [data, f];
}

function Edit({ onFlip }) {
  const goHome = useCallback(() => onFlip('Home'), []);

  const [items, fetchItems] = useFetch('api/items', { run: true });

  console.log(typeof items);
  console.log(items);
  return (
    <div>
      {items && items.length ? items.map((name, index) => <Item name={name} key={index + name} />) : <Loading />}
      <button onClick={fetchItems}>New</button>
      <button onClick={goHome}>Home</button>
    </div>
  );
}

export default Edit;

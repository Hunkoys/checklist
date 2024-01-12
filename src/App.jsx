import { useState } from 'react';
import './App.scss';
import Edit from './Pages/Edit';

const Home = ({ onFlip }) => {
  return (
    <div>
      <button onClick={() => onFlip('Edit')}>Edit</button>
    </div>
  );
};

function App() {
  const [page, setPage] = useState('Edit');

  const [show] = useState({
    Home: <Home onFlip={setPage} />,
    Edit: <Edit onFlip={setPage} />,
  });

  return <div>{show[page]}</div>;
}

export default App;

import { Route, Routes } from 'react-router-dom';
import { Coin } from './Routes/Coin';
import { Coins } from './Routes/Coins';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path="/:coinId" element={<Coin />} />
    </Routes>
  );
}

export default App;

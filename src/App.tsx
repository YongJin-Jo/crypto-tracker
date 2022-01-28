import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './asset/css/globalStyle';
import { theme } from './asset/css/theme/theme';
import { Chart } from './Routes/Chart';
import { Coin } from './Routes/Coin';
import { Coins } from './Routes/Coins';
import { Price } from './Routes/Price';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path={'price'} element={<Price />} />
          <Route path={'chart'} element={<Chart />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
export default App;

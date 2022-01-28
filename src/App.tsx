import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './asset/css/globalStyle';
import { theme } from './asset/css/theme/theme';
import { Coin } from './Routes/Coin';
import { Coins } from './Routes/Coins';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;

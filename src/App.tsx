import { GlobalStyle } from './asset/css/globalStyle';
import { Router } from './Router/Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './asset/css/theme/theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeAtom } from './store/atom';
import { DarkModeButton } from './components/atom/darkModeButton/darkModeButton';
function App() {
  const theme = useRecoilValue(ThemeAtom);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <DarkModeButton />
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}
export default App;

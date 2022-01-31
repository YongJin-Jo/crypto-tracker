import { GlobalStyle } from './asset/css/globalStyle';
import { Router } from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './asset/css/theme/theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeAtom } from './store/atom';
const ThemeButton = styled.input``;

function App() {
  const theme = useRecoilValue(ThemeAtom);
  const setTheme = useSetRecoilState(ThemeAtom);
  const ChangeThmeme = () => setTheme(prov => !prov);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <ThemeButton type="button" value="changeTheme" onClick={ChangeThmeme} />

      <GlobalStyle />
      <Router />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}
export default App;

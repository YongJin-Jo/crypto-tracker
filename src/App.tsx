import { GlobalStyle } from './asset/css/globalStyle';
import { Router } from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './asset/css/theme/theme';
import { useState } from 'react';
const ThemeButton = styled.input``;

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const changeTheme = () =>
    theme === darkTheme ? setTheme(lightTheme) : setTheme(darkTheme);
  return (
    <ThemeProvider theme={theme}>
      <ThemeButton type="button" value="changeTheme" onClick={changeTheme} />

      <GlobalStyle />
      <Router />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}
export default App;

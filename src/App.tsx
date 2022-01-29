import { GlobalStyle } from './asset/css/globalStyle';
import { Router } from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools />
    </>
  );
}
export default App;

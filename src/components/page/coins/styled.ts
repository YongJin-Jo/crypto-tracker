import styled from 'styled-components';

const Container = styled.div`
  min-width: 480px;
  max-width: 50%;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    transform: color 0.2s eaes-in;
    padding: 20px;
    display: flex;
    align-items: center;
    color: black;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  align-items: center;
`;

const Loading = styled.div``;

export { Container, Header, CoinsList, Coin, Title, Loading };

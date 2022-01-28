import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CoinListDefine } from '../type/CoinInterface/CoinDefine';
const Container = styled.div`
  max-width: 480px;
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
  background-color: white;
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
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
  color: ${props => props.theme.titleColor};
`;

const Loading = styled.div``;

export const Coins = () => {
  const [coins, setCoins] = useState<CoinListDefine[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();

      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <CoinsList>
          {coins.map(coin => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

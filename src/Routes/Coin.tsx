import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  CoinInfoDefine,
  CoinPirceInfo,
} from '../type/CoinInterface/CoinDefine';

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface CoinLocationDefine {
  state: string;
  pathname: string;
}

export const Coin = () => {
  const { state, pathname } = useLocation() as CoinLocationDefine;
  const [loading, setLaogin] = useState(true);
  const [info, setInfo] = useState<CoinInfoDefine>();
  const [priceInfo, setPriceInfo] = useState<CoinPirceInfo>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins${pathname}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers${pathname}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLaogin(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state || 'Loading...'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

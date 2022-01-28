import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CoinInfoDefine, CoinPirceInfo } from '../type/CoinDefine';

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
const Title = styled.h1`
  color: ${props => props.theme.titleColor};
  font-size: 48px;
  align-items: center;
`;

const Loading = styled.span``;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

interface CoinLocationDefine {
  state: string;
  pathname: string;
}

export const Coin = () => {
  const { coinId } = useParams();
  const { state, pathname } = useLocation() as CoinLocationDefine;
  const [loading, setLaogin] = useState(true);
  const [info, setInfo] = useState<CoinInfoDefine>();
  const [priceInfo, setPriceInfo] = useState<CoinPirceInfo>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLaogin(false);
    })();
  }, [pathname]);

  return (
    <Container>
      <Header>
        <Title>{state}</Title>
      </Header>
      {loading ? (
        <Loading>Logins...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Outlet />
        </>
      )}
    </Container>
  );
};

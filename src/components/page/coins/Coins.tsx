import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CoinListDefine } from '../../../type/CoinDefine';
import { useQuery } from 'react-query';
import { fetchCoins } from '../../../api/api';
import { Helmet } from 'react-helmet';
import { Coin, CoinsList, Container, Header, Loading } from './styled';
import { Title } from '../coin/styled';

export const Coins = () => {
  console.log(process.env.BASE_URL);

  const { isLoading, data } = useQuery<CoinListDefine[]>(
    'allCoins',
    fetchCoins
  );

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loading>loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => (
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

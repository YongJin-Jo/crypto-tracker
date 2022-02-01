import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinHistor } from '../../../api/api';
import { CoinHistory } from '../../../type/CoinDefine';

const PriceList = styled.ul`
  display: flex;
  flex-direction: column;
`;
const PriceInfo = styled.li`
  margin: 10px;
  padding: 5px;
  border-bottom: 1px solid white;
  span {
    margin: 10px;
  }
`;

export const Price = () => {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<CoinHistory[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistor(coinId!),
    { refetchInterval: 10000 }
  );
  return (
    <>
      {isLoading ? (
        '...Loding'
      ) : (
        <PriceList>
          {data?.map(price => (
            <PriceInfo>
              <span>날짜: {price.time_open.substring(0, 10)}</span>
              <span>시작가: ${price.open.toFixed(1)}</span>
              <span>마감가: ${price.close.toFixed(1)}</span>
              <span>최저가: ${price.low.toFixed(1)}</span>
              <span>최고가: ${price.high.toFixed(1)}</span>
            </PriceInfo>
          ))}
        </PriceList>
      )}
    </>
  );
};

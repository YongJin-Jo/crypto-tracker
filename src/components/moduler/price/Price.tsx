import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistor } from '../../../api/api';
import { CoinHistory } from '../../../type/CoinDefine';
import { PriceInfo, PriceList } from './styled';

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

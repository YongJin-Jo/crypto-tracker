import ApexChart from 'react-apexcharts';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistor } from '../api/api';
import { CoinHistory } from '../type/CoinDefine';

export const Chart = () => {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<CoinHistory[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistor(coinId!),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        '...Loding'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map(price => price.close),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map(price => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: value => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

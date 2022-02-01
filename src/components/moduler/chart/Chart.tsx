import ApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistor } from '../../../api/api';
import { CoinHistory } from '../../../type/CoinDefine';
import { useRecoilValue } from 'recoil';
import { ThemeAtom } from '../../../store/atom';
import { useTab } from '../../../hooks/stateHooks';
import { Tab, Tabs } from './styled';

const tabList: string[] = ['Line', 'Candlestick'];

export const Chart = () => {
  const { currentItem, changeItem } = useTab<string>(0, tabList);
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<CoinHistory[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistor(coinId!),
    { refetchInterval: 10000 }
  );
  const theme = useRecoilValue(ThemeAtom);
  return (
    <div>
      {isLoading ? (
        '...Loding'
      ) : (
        <>
          {currentItem == 'Line' ? (
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
                  mode: theme ? 'dark' : 'light',
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
          ) : (
            <ApexChart
              type="candlestick"
              series={[
                {
                  data: data?.map(price => {
                    const arr = [
                      Number(
                        price.time_open.substring(0, 10).split('-').join('')
                      ),
                      price.open.toFixed(3),
                      price.high.toFixed(3),
                      price.low.toFixed(3),
                      price.close.toFixed(3),
                    ];
                    return arr;
                  }),
                },
              ]}
              options={{
                theme: {
                  mode: theme ? 'dark' : 'light',
                },
                chart: {
                  type: 'candlestick',
                  height: 300,
                  width: 500,
                  background: 'transparent',
                },
                title: {
                  text: 'CandleStick Chart',
                  align: 'left',
                },

                xaxis: {
                  type: 'datetime',
                  categories: data?.map(price => price.time_close),
                },
                yaxis: {
                  show: false,
                },
              }}
            />
          )}
        </>
      )}
      <Tabs>
        {tabList &&
          tabList.map((list, index) => (
            <Tab key={index} onClick={() => changeItem(index)}>
              <span>{list}</span>
            </Tab>
          ))}
      </Tabs>
    </div>
  );
};

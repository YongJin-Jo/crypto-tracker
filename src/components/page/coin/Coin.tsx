import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import { fetchCoinInfo, fetchCoinTickers } from '../../../api/api';
import { CoinInfoDefine, CoinPirceInfo } from '../../../type/CoinDefine';
import { HistoryBackButton } from '../../atom/histroyBackButton/HistoryBackButton';
import {
  Container,
  Description,
  Flex,
  Header,
  Loading,
  Overview,
  OverviewItem,
  Tab,
  Tabs,
  Title,
} from './styled';

interface CoinLocationDefine {
  state: string;
}

export const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as CoinLocationDefine;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<CoinInfoDefine>(
    ['info', coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<CoinPirceInfo>(
      ['tickers', coinId],
      () => fetchCoinTickers(coinId!),
      { refetchInterval: 5000 }
    );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state ? state : loading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Flex>
        <HistoryBackButton />
        <Header>
          <Title>
            {state ? state : loading ? 'Loading...' : infoData?.name}
          </Title>
        </Header>
      </Flex>
      {loading ? (
        <Loading>Logins...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={'chart'} state={state}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={'price'} state={state}>
                Price
              </Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
};

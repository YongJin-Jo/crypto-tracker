import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api/api';
import { CoinInfoDefine, CoinPirceInfo } from '../type/CoinDefine';

const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const HistoryBackButton = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.textColor};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  position: absolute;
  padding: 20px 5px;
  top: 35px;
  left: 0;
`;

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
  const navigate = useNavigate();

  return (
    <Container>
      <Helmet>
        <title>{state ? state : loading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Flex>
        <HistoryBackButton
          type="button"
          value="뒤로가기"
          onClick={() => navigate(-1)}
        />

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

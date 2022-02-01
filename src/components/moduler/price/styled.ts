import styled from 'styled-components';

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

export { PriceInfo, PriceList };

import styled from 'styled-components';

const Tabs = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Tab = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.accentColor};
  }
`;

export { Tab, Tabs };

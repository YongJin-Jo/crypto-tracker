import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.textColor};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  position: absolute;
  padding: 20px 5px;
  top: 10px;
  left: 0;
`;

export const HistoryBackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackButton type="button" value="뒤로가기" onClick={() => navigate(-1)} />
    </>
  );
};

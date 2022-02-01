import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ThemeAtom } from '../../../store/atom';
const ThemeButton = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.textColor};
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  border: none;
`;

export const DarkModeButton = () => {
  const setTheme = useSetRecoilState(ThemeAtom);

  const ChangeThmeme = () => setTheme(prov => !prov);
  return (
    <>
      <ThemeButton type="button" value="changeTheme" onClick={ChangeThmeme} />
    </>
  );
};

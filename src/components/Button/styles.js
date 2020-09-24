import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  height: 2.6rem;
  width: 5.6rem;
  border-style: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  background: #30a7d7;
  color: #fff;
  font-size: 1rem;
  transition: background 0.2s;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background: ${shade(0.2, '#30a7d7')};
  }
`;

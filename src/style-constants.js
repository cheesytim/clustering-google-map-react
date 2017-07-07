import { keyframes } from 'styled-components';

export const COLORS = {
  gray64: '#a3a3a3',
};

export const easyMove = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

'use client';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle(
  ({ theme }) => `
    html,
    body {
      padding: 0;
      margin: 0;
      color: ${theme.palette.textPrimary};
      box-sizing: border-box;
      overflow-y: visible;
    }

    body {
      background: ${theme.palette.mainSurfaceBackground};
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    button {
      cursor: pointer;
      text-decoration: none;
      border: none;
      user-select: none;
      &:disabled {
          cursor: initial;
      }
    }
  `,
);

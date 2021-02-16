import styled, { css } from 'styled-components';

import theme from 'tetris/theme';
import {
  STONE_BORDER_L,
  STONE_BORDER_M,
  STONE_DIMENSION_L,
  STONE_DIMENSION_M,
  STONE_SHADOW_L,
  STONE_SHADOW_M,
} from 'tetris/GameSettings';

const StoneContainer = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: ${STONE_DIMENSION_L}rem;
  height: ${STONE_DIMENSION_L}rem;

  ${(props) => {
    const stoneTheme = theme.stones[props.shapeType];
    if (props.lineClear) {
      return css`
        border: ${STONE_BORDER_L}rem solid ${theme.lineClear.light};
        background-color: ${theme.lineClear.light};
        box-shadow: inset 0 0 ${STONE_SHADOW_L / 1.5}rem ${STONE_SHADOW_L}rem
          ${theme.lineClear.dark};
        animation: blink-animation 200ms steps(5, start) 2;
      `;
    }
    return css`
      border: ${STONE_BORDER_L}rem solid ${stoneTheme.light};
      background-color: ${stoneTheme.light};
      box-shadow: inset 0 0 ${STONE_SHADOW_L / 1.5}rem ${STONE_SHADOW_L}rem
        ${stoneTheme.dark};
    `;
  }};

  @media (max-width: ${theme.breakpoint.m}) {
    width: ${STONE_DIMENSION_M}rem;
    height: ${STONE_DIMENSION_M}rem;

    ${(props) => {
      const stoneTheme = theme.stones[props.shapeType];
      if (props.lineClear) {
        return css`
          border: ${STONE_BORDER_M}rem solid ${theme.lineClear.light};
          box-shadow: inset 0 0 ${STONE_SHADOW_M / 1.5}rem ${STONE_SHADOW_M}rem
            ${theme.lineClear.dark};
        `;
      }
      return css`
        border: ${STONE_BORDER_M}rem solid ${stoneTheme.light};
        box-shadow: inset 0 0 ${STONE_SHADOW_M / 1.5}rem ${STONE_SHADOW_M}rem
          ${stoneTheme.dark};
      `;
    }};
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
`;

export const StonePlaceholder = styled.div`
  display: inline-block;
  width: ${STONE_DIMENSION_L}rem;
  height: ${STONE_DIMENSION_L}rem;

  @media (max-width: ${theme.breakpoint.m}) {
    width: ${STONE_DIMENSION_M}rem;
    height: ${STONE_DIMENSION_M}rem;
  }
`;

const Stone = (props) => {
  const { shapeType, lineClear } = props;

  return <StoneContainer shapeType={shapeType} lineClear={lineClear} />;
};

export default Stone;

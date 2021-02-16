import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import theme from 'tetris/theme';
import Shape from 'tetris/components/Shape';
import {
  getBoardMatrix,
  getCurrentShape,
  isGameOver,
  isGamePaused,
} from 'tetris/store/selectors/GameSelectors';
import {
  PANEL_STONES_X,
  PANEL_STONES_Y,
  STONE_DIMENSION_L,
  STONE_DIMENSION_M,
} from 'tetris/GameSettings';
import Stone from 'tetris/components/Stone';

const GamePanelContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: ${PANEL_STONES_X * STONE_DIMENSION_L}rem;
  height: ${PANEL_STONES_Y * STONE_DIMENSION_L}rem;
  border: 0.125rem solid ${theme.black};
  background: ${theme.white};

  @media (max-width: ${theme.breakpoint.m}) {
    width: ${PANEL_STONES_X * STONE_DIMENSION_M}rem;
    height: ${PANEL_STONES_Y * STONE_DIMENSION_M}rem;
  }
`;

const StoneContainer = styled.div`
  position: absolute;
  margin-left: ${(props) => props.position.x * STONE_DIMENSION_L}rem;
  margin-top: ${(props) => props.position.y * STONE_DIMENSION_L}rem;

  @media (max-width: ${theme.breakpoint.m}) {
    margin-left: ${(props) => props.position.x * STONE_DIMENSION_M}rem;
    margin-top: ${(props) => props.position.y * STONE_DIMENSION_M}rem;
  }
`;

const GameMessageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GameMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  font-size: 2rem;
  width: 100%;
  background: ${theme.white};
  border: 1px solid ${theme.black};
`;

const GamePanel = (props) => {
  const { gameOver, paused, currentShape, boardMatrix } = props;

  return (
    <GamePanelContainer>
      {gameOver || paused ? (
        <GameMessageContainer>
          <GameMessage>{gameOver ? 'Game Over' : 'Paused'}</GameMessage>
        </GameMessageContainer>
      ) : (
        <>
          {currentShape?.shapeType && <Shape shape={currentShape} />}
          {boardMatrix.map((line, yPos) =>
            line.map((stoneInfo, xPos) => (
              <React.Fragment key={`lying-stones-${xPos}-${yPos}`}>
                {stoneInfo && (
                  <StoneContainer position={{ x: xPos, y: yPos }}>
                    <Stone
                      lineClear={stoneInfo.lineClear}
                      shapeType={stoneInfo.shapeType}
                    />
                  </StoneContainer>
                )}
              </React.Fragment>
            )),
          )}
        </>
      )}
    </GamePanelContainer>
  );
};

const mapStateToProps = (state) => ({
  gameOver: isGameOver(state),
  paused: isGamePaused(state),
  currentShape: getCurrentShape(state),
  boardMatrix: getBoardMatrix(state),
});

export default connect(mapStateToProps)(GamePanel);

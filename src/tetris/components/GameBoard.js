import styled from 'styled-components';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fastDown,
  moveLeft,
  moveRight,
  rotateShape,
  pauseOrResumeGame,
  restartGame,
} from 'tetris/store/actions/GameActions';
import GamePanel from 'tetris/components/GamePanel';
import StatusBoard from 'tetris/components/StatusBoard';
import LevelIndicator from 'tetris/components/LevelIndidator';
import { getLevel, isGamePaused } from 'tetris/store/selectors/GameSelectors';
import { BACKGROUND_IMAGES } from 'tetris/GameSettings';
import { toggleInstructions } from 'tetris/store/actions/AppActions';

const GameBoardContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
`;

const LevelBackground = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  transition: opacity ease-in-out 500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Level0Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[0]});
`;
const Level1Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[1]});
`;
const Level2Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[2]});
`;
const Level3Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[3]});
`;
const Level4Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[4]});
`;
const Level5Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[5]});
`;
const Level6Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[6]});
`;
const Level7Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[7]});
`;
const Level8Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[8]});
`;
const Level9Background = styled(LevelBackground)`
  background-image: url(${BACKGROUND_IMAGES[9]});
`;

const GameBoard = (props) => {
  const {
    level,
    rotateShape,
    restartGame,
    pauseOrResumeGame,
    toggleInstructions,
    paused,
    moveLeft,
    moveRight,
    fastDown,
  } = props;

  useEffect(() => {
    const keyPressed = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          !paused && moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          !paused && moveRight();
          break;
        case 'Space':
          event.preventDefault();
          !paused && fastDown();
          break;
        case 'KeyN':
          event.preventDefault();
          restartGame();
          break;
        case 'KeyR':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            !paused && rotateShape();
          }
          break;
        case 'KeyP':
          event.preventDefault();
          pauseOrResumeGame();
          break;
        case 'KeyI':
          event.preventDefault();
          toggleInstructions();
          pauseOrResumeGame();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyPressed);

    return () => {
      document.removeEventListener('keydown', keyPressed);
    };
  }, [
    rotateShape,
    fastDown,
    moveLeft,
    moveRight,
    pauseOrResumeGame,
    toggleInstructions,
    paused,
    restartGame,
  ]);

  return (
    <>
      <Level0Background visible={level === 0} />
      <Level1Background visible={level === 1} />
      <Level2Background visible={level === 2} />
      <Level3Background visible={level === 3} />
      <Level4Background visible={level === 4} />
      <Level5Background visible={level === 5} />
      <Level6Background visible={level === 6} />
      <Level7Background visible={level === 7} />
      <Level8Background visible={level === 8} />
      <Level9Background visible={level === 9} />
      <GameBoardContainer>
        <LevelIndicator />
        <GamePanel />
        <StatusBoard />
      </GameBoardContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  level: getLevel(state),
  paused: isGamePaused(state),
});

const mapDispatchToProps = {
  restartGame,
  pauseOrResumeGame,
  toggleInstructions,
  moveLeft,
  moveRight,
  fastDown,
  rotateShape,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);

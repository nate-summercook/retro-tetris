import {
  getRandomShapeType,
  hasLineClears,
  hasShapeArrived,
  initializeBoardMatrix,
  isShapeCollidingWithTopBorder,
} from 'tetris/services/ShapeService';
import {
  ARE_DELAY,
  GRAVITY_DELAY,
  LINE_CLEAR_DELAY,
  LINES_IN_LEVEL,
} from 'tetris/GameSettings';
import { navigateToHighScore } from 'tetris/store/actions/AppActions';

export const GameActions = {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  SET_MOVING_TIMEOUT: 'SET_MOVING_TIMEOUT',
  ROTATE: 'ROTATE',
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_DOWN: 'MOVE_DOWN',
  FAST_DOWN: 'FAST_DOWN',
  NEXT_SHAPE: 'NEXT_SHAPE',
  MATERIALIZE_SHAPE: 'MATERIALIZE_SHAPE',
  LEVEL_UP: 'LEVEL_UP',
  MARK_LINE_CLEARS: 'MARK_LINE_CLEARS',
  CLEAR_LINE_CLEARS: 'CLEAR_LINE_CLEARS',
  GAME_OVER: 'GAME_OVER',
  CLEAR_SCORING: 'CLEAR_SCORING',
  REPORT_HIGH_SCORE: 'REPORT_HIGH_SCORE',
};

export const startNewGame = (level, height, advancedMode) => (
  dispatch,
  getState,
) => {
  const {
    game: { movingTimeout },
  } = getState();
  if (movingTimeout) {
    clearTimeout(movingTimeout);
  }
  const boardMatrix = initializeBoardMatrix(height);
  dispatch(startGame(level, height, boardMatrix, advancedMode));
  stopAllMusic();
  document.getElementById(`level-music-${level}`).play();
  dispatch(nextShape(getRandomShapeType(), getRandomShapeType()));
  dispatch(continueMovingDown());
};

export const restartGame = () => (dispatch, getState) => {
  const {
    game: { level, height, advancedMode },
  } = getState();
  dispatch(startNewGame(level, height, advancedMode));
};

export const startGame = (level, height, boardMatrix, advancedMode) => ({
  type: GameActions.START_GAME,
  payload: {
    level,
    height,
    boardMatrix,
    advancedMode,
  },
});

export const pauseGame = () => ({
  type: GameActions.PAUSE_GAME,
});

export const resumeGame = () => ({
  type: GameActions.RESUME_GAME,
});

export const pauseOrResumeGame = () => (dispatch, getState) => {
  const {
    game: { level, paused, movingTimeout },
  } = getState();

  if (!paused && movingTimeout) {
    clearTimeout(movingTimeout);
    document.getElementById(`level-music-${level}`).pause();
    dispatch(pauseGame());
  } else {
    dispatch(resumeGame());
    document.getElementById(`level-music-${level}`).play();
    dispatch(continueMovingDown());
  }
};

export const continueMovingDown = () => (dispatch, getState) => {
  const {
    game: { level, advancedMode },
  } = getState();
  const timeout = setTimeout(
    () => {
      dispatch(figureOutWhatToDo());
    },
    advancedMode ? GRAVITY_DELAY(level) / 2 : GRAVITY_DELAY(level),
  );
  dispatch(setMovingTimeout(timeout));
};

export const figureOutWhatToDo = () => (dispatch, getState) => {
  const {
    app: { highScore },
    game: {
      scoring: { score },
      currentShape: { shapeMatrix, position },
      boardMatrix,
    },
  } = getState();
  if (
    hasShapeArrived(
      shapeMatrix,
      { ...position, y: position.y + 1 },
      boardMatrix,
    )
  ) {
    if (isShapeCollidingWithTopBorder(shapeMatrix, position)) {
      dispatch(gameOver());
      setTimeout(() => {
        dispatch(navigateToHighScore());
      }, 5000);
    } else {
      dispatch(materializeShape());
      if (hasLineClears(boardMatrix)) {
        dispatch(clearTheLines());
      } else {
        dispatch(newShape());
      }
    }
  } else {
    dispatch(moveDown());
    dispatch(continueMovingDown());
  }
};

export const clearTheLines = () => (dispatch) => {
  dispatch(markLineClears());
  dispatch(checkLevelUp());
  setTimeout(() => {
    dispatch(clearLineClears());
    dispatch(newShape());
  }, LINE_CLEAR_DELAY);
};

export const checkLevelUp = () => (dispatch, getState) => {
  const {
    game: {
      level,
      scoring: { linesInLevel },
    },
  } = getState();

  if (level < LINES_IN_LEVEL.length && linesInLevel >= LINES_IN_LEVEL[level]) {
    dispatch(levelUp());
    document.getElementById(`level-music-${level}`).pause();
    document.getElementById(`level-music-${level + 1}`).play();
  }
};

export const newShape = () => (dispatch, getState) => {
  const {
    game: { nextShapeType },
  } = getState();

  setTimeout(() => {
    dispatch(nextShape(nextShapeType, getRandomShapeType()));
    dispatch(continueMovingDown());
  }, ARE_DELAY);
};

export const rotateShape = () => ({
  type: GameActions.ROTATE,
});

export const moveLeft = () => ({
  type: GameActions.MOVE_LEFT,
});

export const moveRight = () => ({
  type: GameActions.MOVE_RIGHT,
});

export const moveDown = () => ({
  type: GameActions.MOVE_DOWN,
});

export const fastDown = () => ({
  type: GameActions.FAST_DOWN,
});

export const materializeShape = () => ({
  type: GameActions.MATERIALIZE_SHAPE,
});

export const markLineClears = () => ({
  type: GameActions.MARK_LINE_CLEARS,
});

export const clearLineClears = () => ({
  type: GameActions.CLEAR_LINE_CLEARS,
});

export const levelUp = () => ({
  type: GameActions.LEVEL_UP,
});

export const setMovingTimeout = (movingTimeout) => ({
  type: GameActions.SET_MOVING_TIMEOUT,
  payload: { movingTimeout },
});

export const nextShape = (shapeType, nextShapeType) => ({
  type: GameActions.NEXT_SHAPE,
  payload: {
    shapeType,
    nextShapeType,
  },
});

export const gameOver = () => ({
  type: GameActions.GAME_OVER,
});

export const clearScoring = () => ({
  type: GameActions.CLEAR_SCORING,
});

export const reportHighScore = () => ({
  type: GameActions.REPORT_HIGH_SCORE,
});

export const stopAllMusic = () => {
  document.getElementById(`menu-music`).pause();
  for (let level = 0; level < 10; level++) {
    document.getElementById(`level-music-${level}`).pause();
  }
};

import {
  clearScoring,
  startNewGame,
  stopAllMusic,
} from 'tetris/store/actions/GameActions';
import { updateHighScore } from 'tetris/services/LocalStorageService';

export const AppActions = {
  START_PAGE: 'START_PAGE',
  NAVIGATE_TO_MENU: 'NAVIGATE_TO_MENU',
  NAVIGATE_TO_GAME: 'NAVIGATE_TO_GAME',
  NAVIGATE_TO_HIGH_SCORE: 'NAVIGATE_TO_HIGH_SCORE',
  SET_HIGH_SCORE: 'SET_HIGH_SCORE',
  FINISH_SCORE: 'FINISH_SCORE',
  TOGGLE_INSTRUCTIONS: 'TOGGLE_INSTRUCTIONS',
};

export const startPage = () => ({
  type: AppActions.START_PAGE,
});

export const navigateToMenu = () => ({
  type: AppActions.NAVIGATE_TO_MENU,
});

export const navigateToGame = () => ({
  type: AppActions.NAVIGATE_TO_GAME,
});

export const navigateToHighScore = () => ({
  type: AppActions.NAVIGATE_TO_HIGH_SCORE,
});

export const toggleInstructions = () => ({
  type: AppActions.TOGGLE_INSTRUCTIONS,
});

export const setHighScore = (highScore) => ({
  type: AppActions.SET_HIGH_SCORE,
  payload: {
    highScore,
  },
});

export const updateScore = (name) => (dispatch, getState) => {
  const {
    game: {
      scoring: { score },
      level,
      advancedMode,
    },
  } = getState();
  dispatch(finishScore(name, score, level, advancedMode));
  dispatch(clearScoring());
  dispatch(updateLocalStorage());
};

export const finishScore = (name, score, level, advancedMode) => ({
  type: AppActions.FINISH_SCORE,
  payload: {
    name,
    score,
    level,
    advancedMode,
  },
});

export const goToStartPage = () => (dispatch) => {
  stopAllMusic();
  dispatch(startPage());
};

export const goToMenu = () => (dispatch) => {
  document.getElementById('menu-music').play();
  dispatch(navigateToMenu());
};

export const goToGame = (level, height, advancedMode) => (dispatch) => {
  dispatch(navigateToGame());
  dispatch(startNewGame(level, height, advancedMode));
};

export const goToHighScore = () => (dispatch) => {
  dispatch(navigateToHighScore());
};

export const updateLocalStorage = () => (dispatch, getState) => {
  const {
    app: { highScore },
  } = getState();
  updateHighScore(highScore);
};

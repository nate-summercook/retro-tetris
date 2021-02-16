import { sortBy } from 'lodash';

import { AppActions } from 'tetris/store/actions/AppActions';
import { loadHighScore } from 'tetris/services/LocalStorageService';

export const Pages = {
  START_PAGE: 'START_PAGE',
  MENU: 'MENU',
  GAME: 'GAME',
  HIGH_SCORE: 'HIGH_SCORE',
};

const initialState = {
  page: Pages.START_PAGE,
  highScore: loadHighScore(),
  showInstructions: false,
};

const appReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case AppActions.START_PAGE: {
      return {
        ...state,
        page: Pages.START_PAGE,
      };
    }
    case AppActions.NAVIGATE_TO_MENU: {
      return {
        ...state,
        page: Pages.MENU,
      };
    }
    case AppActions.NAVIGATE_TO_GAME: {
      return {
        ...state,
        page: Pages.GAME,
      };
    }
    case AppActions.NAVIGATE_TO_HIGH_SCORE: {
      return {
        ...state,
        page: Pages.HIGH_SCORE,
      };
    }
    case AppActions.SET_HIGH_SCORE: {
      const { highScore } = action.payload;
      return {
        ...state,
        highScore: sortBy(highScore, 'score').reverse(),
      };
    }
    case AppActions.FINISH_SCORE: {
      const { highScore } = state;
      return {
        ...state,
        highScore: sortBy(
          [...highScore, { ...action.payload }],
          'score',
        ).reverse(),
      };
    }
    case AppActions.TOGGLE_INSTRUCTIONS: {
      const { showInstructions } = state;
      return {
        ...state,
        showInstructions: !showInstructions,
      };
    }
    default:
      return state;
  }
};

export default appReducer;

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducer from 'tetris/store/reducers/AppReducer';
import gameReducer from 'tetris/store/reducers/GameReducer';

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
});

const composeEnhancers = composeWithDevTools({ trace: false, traceLimit: 25 });
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
export default store;

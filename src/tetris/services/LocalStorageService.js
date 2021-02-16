const LOCAL_STORAGE_PREFIX = 'retroTetris';
const HIGH_SCORE_KEY = LOCAL_STORAGE_PREFIX + '.highScore';

export const loadHighScore = () => {
  return JSON.parse(localStorage.getItem(HIGH_SCORE_KEY)) ?? [];
};

export const updateHighScore = (highScore) => {
  return localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScore));
};

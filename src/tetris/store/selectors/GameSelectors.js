export const getCurrentShape = (state) => state.game.currentShape;

export const getNextShapeType = (state) => state.game.nextShapeType;

export const getBoardMatrix = (state) => state.game.boardMatrix;

export const isGameOver = (state) => state.game.gameOver;

export const isGamePaused = (state) => state.game.paused;

export const getLevel = (state) => state.game.level;

export const getScoring = (state) => state.game.scoring;

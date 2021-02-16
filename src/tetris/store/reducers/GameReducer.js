import { times } from 'lodash';

import { GameActions } from 'tetris/store/actions/GameActions';
import {
  addShapeToBoardMatrix,
  canRotate,
  getCorrectedRotatedPosition,
  isShapeCollidingWithSideBorder,
  isShapeCollidingWithStones,
  SHAPE_MATRIX,
  canMoveSideways,
  findRestingPosition,
  hasShapeArrived,
  markLineClears,
  clearLineClears,
  emptyBoardMatrixLine,
  countPendingLineClears,
  calculateScore,
} from 'tetris/services/ShapeService';
import {
  LINES_IN_LEVEL,
  PANEL_STONES_X,
  PANEL_STONES_Y,
} from 'tetris/GameSettings';

const initialState = {
  level: 0,
  height: 0,
  advancedMode: false,
  paused: false,
  boardMatrix: times(PANEL_STONES_Y, () => emptyBoardMatrixLine()),
  gameOver: false,
  scoring: null,
  currentShape: {
    fastDownPosition: null,
    position: {
      x: 0,
      y: 0,
    },
    rotationIndex: 0,
    shapeType: null,
    shapeMatrix: null,
  },
  nextShapeType: null,
};

const gameReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GameActions.START_GAME: {
      const { level, height, boardMatrix, advancedMode } = action.payload;
      return {
        ...initialState,
        scoring: {
          score: 0,
          lines: 0,
          linesInLevel: 0,
        },
        level,
        height,
        boardMatrix,
        advancedMode,
      };
    }
    case GameActions.PAUSE_GAME: {
      return {
        ...state,
        paused: true,
        movingTimeout: null,
      };
    }
    case GameActions.RESUME_GAME: {
      return {
        ...state,
        paused: false,
      };
    }
    case GameActions.ROTATE: {
      const { currentShape, boardMatrix } = state;
      const { shapeType, rotationIndex, position } = currentShape;
      const newRotationIndex = (rotationIndex + 1) % 4;
      const rotatedMatrix = SHAPE_MATRIX[shapeType][newRotationIndex];
      const canShapeRotate = canRotate(rotatedMatrix, position, boardMatrix);

      const newPosition =
        canShapeRotate &&
        isShapeCollidingWithSideBorder(rotatedMatrix, position)
          ? getCorrectedRotatedPosition(rotatedMatrix, position)
          : position;
      const shapeMatrix =
        canShapeRotate &&
        !isShapeCollidingWithStones(rotatedMatrix, newPosition, boardMatrix)
          ? rotatedMatrix
          : currentShape.shapeMatrix;

      return {
        ...state,
        currentShape: {
          ...currentShape,
          position: newPosition,
          shapeMatrix: shapeMatrix,
          rotationIndex: canShapeRotate ? newRotationIndex : rotationIndex,
        },
      };
    }
    case GameActions.MOVE_DOWN: {
      const { currentShape, boardMatrix } = state;
      const { x, y } = currentShape.position;
      const newY = hasShapeArrived(
        currentShape.shapeMatrix,
        {
          x,
          y: y + 1,
        },
        boardMatrix,
      )
        ? y
        : y + 1;
      return {
        ...state,
        currentShape: {
          ...currentShape,
          position: {
            x,
            y: newY,
          },
        },
      };
    }
    case GameActions.MOVE_LEFT: {
      const { currentShape, boardMatrix } = state;
      const { x, y } = currentShape.position;
      const newX = canMoveSideways(
        currentShape.shapeMatrix,
        {
          x: x - 1,
          y,
        },
        boardMatrix,
      )
        ? x
        : x - 1;
      return {
        ...state,
        currentShape: {
          ...currentShape,
          position: {
            x: newX,
            y: y,
          },
        },
      };
    }
    case GameActions.MOVE_RIGHT: {
      const { currentShape, boardMatrix } = state;
      const { x, y } = currentShape.position;
      const newX = canMoveSideways(
        currentShape.shapeMatrix,
        {
          x: x + 1,
          y,
        },
        boardMatrix,
      )
        ? x
        : x + 1;
      return {
        ...state,
        currentShape: {
          ...currentShape,
          position: {
            x: newX,
            y: y,
          },
        },
      };
    }
    case GameActions.FAST_DOWN: {
      const { currentShape, boardMatrix } = state;

      return {
        ...state,
        currentShape: {
          ...currentShape,
          fastDownPosition: currentShape.position.y,
          position: findRestingPosition(
            currentShape.shapeMatrix,
            currentShape.position,
            boardMatrix,
          ),
        },
      };
    }
    case GameActions.MATERIALIZE_SHAPE: {
      const { currentShape, boardMatrix, scoring, level } = state;

      return {
        ...state,
        scoring: {
          ...scoring,
          score: scoring.score + calculateScore(currentShape, level),
        },
        boardMatrix: addShapeToBoardMatrix(currentShape, boardMatrix),
      };
    }
    case GameActions.MARK_LINE_CLEARS: {
      const { boardMatrix, scoring } = state;

      const linesInLevel =
        scoring.linesInLevel + countPendingLineClears(boardMatrix);

      return {
        ...state,
        scoring: {
          ...scoring,
          lines: scoring.lines + countPendingLineClears(boardMatrix),
          linesInLevel: linesInLevel,
        },
        boardMatrix: [...markLineClears(boardMatrix)],
      };
    }
    case GameActions.LEVEL_UP: {
      const { scoring, level } = state;
      return {
        ...state,
        scoring: {
          ...scoring,
          linesInLevel: scoring.linesInLevel - LINES_IN_LEVEL[level],
        },
        level: level + 1,
      };
    }
    case GameActions.CLEAR_LINE_CLEARS: {
      const { boardMatrix } = state;

      return {
        ...state,
        boardMatrix: [...clearLineClears(boardMatrix)],
      };
    }
    case GameActions.SET_MOVING_TIMEOUT: {
      const { movingTimeout } = action.payload;
      return {
        ...state,
        movingTimeout,
      };
    }
    case GameActions.NEXT_SHAPE: {
      const { shapeType, nextShapeType } = action.payload;
      const shapeMatrix = SHAPE_MATRIX[shapeType][0];
      return {
        ...state,
        currentShape: {
          fastDownPosition: null,
          position: {
            x: Math.floor(PANEL_STONES_X / 2 - shapeMatrix[0].length / 2),
            y: -1,
          },
          rotationIndex: 0,
          shapeType,
          shapeMatrix,
        },
        nextShapeType: nextShapeType,
      };
    }
    case GameActions.GAME_OVER: {
      return {
        ...state,
        gameOver: true,
      };
    }
    case GameActions.CLEAR_SCORING: {
      return {
        ...state,
        scoring: null,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;

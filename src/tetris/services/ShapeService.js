import { remove, reduce, times, values } from 'lodash';
import { PANEL_STONES_X, PANEL_STONES_Y } from 'tetris/GameSettings';

export const SHAPE_TYPES = {
  L_SHAPE: 'L_SHAPE',
  J_SHAPE: 'J_SHAPE',
  I_SHAPE: 'I_SHAPE',
  T_SHAPE: 'T_SHAPE',
  O_SHAPE: 'O_SHAPE',
  S_SHAPE: 'S_SHAPE',
  Z_SHAPE: 'Z_SHAPE',
};

export const SHAPE_MATRIX = {
  L_SHAPE: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
  ],
  J_SHAPE: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
  I_SHAPE: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  T_SHAPE: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  O_SHAPE: [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
  ],
  S_SHAPE: [
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  ],
  Z_SHAPE: [
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
};

export const emptyBoardMatrixLine = () => {
  return times(PANEL_STONES_X, () => null);
};

export const getRandomShapeType = () => {
  const shapeTypesArray = values(SHAPE_TYPES);
  return shapeTypesArray[Math.floor(Math.random() * shapeTypesArray.length)];
};

export const isShapeCollidingWithLeftBorder = (
  shapeMatrix,
  desiredPosition,
) => {
  return (
    desiredPosition.x < 0 &&
    shapeMatrix.find((line) => line[Math.abs(desiredPosition.x) - 1])
  );
};

export const isShapeCollidingWithRightBorder = (
  shapeMatrix,
  desiredPosition,
) => {
  const matrixDimension = shapeMatrix.length;
  return (
    desiredPosition.x > PANEL_STONES_X - matrixDimension &&
    shapeMatrix.find(
      (line) =>
        line[
          matrixDimension -
            (desiredPosition.x + matrixDimension - PANEL_STONES_X)
        ],
    )
  );
};

export const isShapeCollidingWithBottomBorder = (
  shapeMatrix,
  desiredPosition,
) => {
  const matrixDimension = shapeMatrix.length;
  return (
    desiredPosition.y > PANEL_STONES_Y - matrixDimension &&
    shapeMatrix[
      matrixDimension - (desiredPosition.y + matrixDimension - PANEL_STONES_Y)
    ].find((stone) => stone)
  );
};

export const isShapeCollidingWithSideBorder = (
  shapeMatrix,
  desiredPosition,
) => {
  return (
    isShapeCollidingWithLeftBorder(shapeMatrix, desiredPosition) ||
    isShapeCollidingWithRightBorder(shapeMatrix, desiredPosition)
  );
};

export const isShapeCollidingWithTopBorder = (shapeMatrix, desiredPosition) => {
  return (
    desiredPosition.y < 0 &&
    shapeMatrix.find((line) => line[Math.abs(desiredPosition.y) - 1])
  );
};

export const isShapeCollidingWithStones = (
  shapeMatrix,
  desiredPosition,
  boardMatrix,
) => {
  return shapeMatrix.some((line, shapeY) =>
    line.some(
      (stone, shapeX) =>
        stone &&
        desiredPosition.y + shapeY >= 0 &&
        boardMatrix[desiredPosition.y + shapeY][desiredPosition.x + shapeX],
    ),
  );
};

export const canMoveSideways = (shapeMatrix, desiredPosition, boardMatrix) => {
  return (
    isShapeCollidingWithSideBorder(shapeMatrix, desiredPosition) ||
    isShapeCollidingWithStones(shapeMatrix, desiredPosition, boardMatrix)
  );
};

export const hasShapeArrived = (shapeMatrix, desiredPosition, boardMatrix) =>
  isShapeCollidingWithBottomBorder(shapeMatrix, desiredPosition) ||
  isShapeCollidingWithStones(shapeMatrix, desiredPosition, boardMatrix);

export const canRotate = (rotatedMatrix, position, boardMatrix) => {
  if (isShapeCollidingWithSideBorder(rotatedMatrix, position)) {
    return !isShapeCollidingWithStones(
      rotatedMatrix,
      getCorrectedRotatedPosition(rotatedMatrix, position),
      boardMatrix,
    );
  }
  return true;
};

export const getCorrectedRotatedPosition = (shapeMatrix, position) => {
  if (position.x < 0) {
    return { ...position, x: 0 };
  }
  return { ...position, x: PANEL_STONES_X - shapeMatrix.length };
};

export const findRestingPosition = (shapeMatrix, position, boardMatrix) => {
  let yPos = position.y;
  while (!hasShapeArrived(shapeMatrix, { ...position, y: yPos }, boardMatrix)) {
    yPos++;
  }
  return { ...position, y: yPos - 1 };
};

export const addShapeToBoardMatrix = (currentShape, boardMatrix) => {
  const { shapeMatrix, position, shapeType } = currentShape;
  const clonedBoardMatrix = [...boardMatrix];
  shapeMatrix.forEach((line, shapeY) =>
    line.forEach((stone, shapeX) => {
      if (stone) {
        clonedBoardMatrix[position.y + shapeY][position.x + shapeX] = {
          shapeType,
        };
      }
    }),
  );
  return clonedBoardMatrix;
};

export const hasLineClears = (boardMatrix) => {
  return boardMatrix.some((line) => line.every((stone) => stone));
};

export const countPendingLineClears = (boardMatrix) => {
  return reduce(
    boardMatrix,
    (accumulator, line) =>
      line.every((stone) => stone) ? accumulator + 1 : accumulator,
    0,
  );
};

export const calculateScore = (currentShape, level) => {
  const { position, fastDownPosition, shapeMatrix } = currentShape;
  const topOfShapeRow =
    fastDownPosition !== null ? fastDownPosition : position.y;
  const topOfShapeAboveFloor =
    PANEL_STONES_Y -
    (topOfShapeRow + (shapeMatrix[0].some((stone) => stone) ? 1 : 0));

  return 4 + 2 * level + topOfShapeAboveFloor;
};

export const markLineClears = (boardMatrix) => {
  return [...boardMatrix].map((line) =>
    line.every((stone) => stone)
      ? line.map((stone) => ({ ...stone, lineClear: true }))
      : line,
  );
};

export const clearLineClears = (boardMatrix) => {
  const clearedMatrix = [...boardMatrix];
  const removedElements = remove(clearedMatrix, (line) => line[0]?.lineClear);
  times(removedElements.length, () =>
    clearedMatrix.unshift(emptyBoardMatrixLine()),
  );
  return clearedMatrix;
};

const randomBoardMatrixLine = () => {
  const shapeOptions = [
    ...times(values(SHAPE_TYPES).length, () => null),
    ...values(SHAPE_TYPES).map((value) => ({ shapeType: value })),
  ];
  return times(
    PANEL_STONES_X,
    () => shapeOptions[Math.floor(Math.random() * shapeOptions.length)],
  );
};

export const initializeBoardMatrix = (height) => {
  if (height === 0) {
    return times(PANEL_STONES_Y, () => emptyBoardMatrixLine());
  }
  return times(PANEL_STONES_Y, (index) => {
    return PANEL_STONES_Y - index - 1 < height
      ? randomBoardMatrixLine()
      : emptyBoardMatrixLine();
  });
};

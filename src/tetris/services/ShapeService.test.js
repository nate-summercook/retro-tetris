import {
  isShapeCollidingWithStones,
  SHAPE_MATRIX,
} from 'tetris/services/ShapeService';

describe('ShapeService', () => {
  describe('isShapeCollidingWithStones', () => {
    const boardMatrix = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, { something: true }, null, null, null, null],
      [
        null,
        null,
        { something: true },
        { something: true },
        { something: true },
        null,
        null,
        null,
      ],
    ];

    it('should not collide when not hitting any existing stones', () => {
      expect(
        isShapeCollidingWithStones(
          SHAPE_MATRIX.I_SHAPE[0],
          { x: 0, y: 3 },
          boardMatrix,
        ),
      ).toBeFalsy();
    });

    it('should collide when hitting any existing stones', () => {
      expect(
        isShapeCollidingWithStones(
          SHAPE_MATRIX.I_SHAPE[0],
          { x: 0, y: 4 },
          boardMatrix,
        ),
      ).toBeTruthy();
    });

    it('should not collide when not hitting any existing stones with vertical I_SHAPE', () => {
      expect(
        isShapeCollidingWithStones(
          SHAPE_MATRIX.I_SHAPE[1],
          { x: 2, y: 2 },
          boardMatrix,
        ),
      ).toBeFalsy();
    });

    it('should collide when hitting any existing stones with vertical I_SHAPE', () => {
      expect(
        isShapeCollidingWithStones(
          SHAPE_MATRIX.I_SHAPE[1],
          { x: 2, y: 3 },
          boardMatrix,
        ),
      ).toBeTruthy();
    });
  });
});

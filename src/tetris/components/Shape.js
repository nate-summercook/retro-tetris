import styled from 'styled-components';

import theme from 'tetris/theme';
import Stone, { StonePlaceholder } from 'tetris/components/Stone';
import { STONE_DIMENSION_L, STONE_DIMENSION_M } from 'tetris/GameSettings';

const ShapeContainer = styled.div`
  position: absolute;
  margin-left: ${(props) => props.position.x * STONE_DIMENSION_L}rem;
  margin-top: ${(props) => props.position.y * STONE_DIMENSION_L}rem;

  @media (max-width: ${theme.breakpoint.m}) {
    margin-left: ${(props) => props.position.x * STONE_DIMENSION_M}rem;
    margin-top: ${(props) => props.position.y * STONE_DIMENSION_M}rem;
  }
`;

const ShapeLine = styled.div`
  display: flex;
`;

const Shape = (props) => {
  const {
    shape: { position, shapeType, shapeMatrix },
  } = props;

  return (
    <>
      {shapeMatrix && shapeType && (
        <ShapeContainer position={position}>
          {shapeMatrix.map((line, lineIndex) => (
            <ShapeLine key={`line-${lineIndex}`}>
              {line.map((stone, positionIndex) =>
                stone ? (
                  <Stone
                    key={`position-${lineIndex}-${positionIndex}`}
                    shapeType={shapeType}
                  />
                ) : (
                  <StonePlaceholder
                    key={`position-${lineIndex}-${positionIndex}`}
                  />
                ),
              )}
            </ShapeLine>
          ))}
        </ShapeContainer>
      )}
    </>
  );
};

export default Shape;

import styled from 'styled-components';
import { connect } from 'react-redux';

import theme from 'tetris/theme';
import Shape from 'tetris/components/Shape';
import { SHAPE_MATRIX } from 'tetris/services/ShapeService';
import {
  getNextShapeType,
  getScoring,
} from 'tetris/store/selectors/GameSelectors';

const StatusContainer = styled.section`
  display: flex;
  width: 10rem;
  height: 12rem;
  border: 3px double ${theme.black};
  flex-direction: column;
  padding: 1rem;
  background: ${theme.white};
`;

const StatusElement = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatusLabel = styled.span``;

const StatusValue = styled.span`
  margin-left: auto;
`;

const StatusBoard = (props) => {
  const { nextShapeType, scoring } = props;
  const shape = nextShapeType
    ? {
        shapeMatrix: SHAPE_MATRIX[nextShapeType][0],
        shapeType: nextShapeType,
        position: {
          x: 0,
          y: 0,
        },
      }
    : null;

  return (
    <StatusContainer>
      <StatusElement>
        <StatusLabel>Score</StatusLabel>
        <StatusValue>{scoring.score}</StatusValue>
      </StatusElement>
      <StatusElement>
        <StatusLabel>Lines</StatusLabel>
        <StatusValue>{scoring.lines}</StatusValue>
      </StatusElement>
      <StatusLabel>Next</StatusLabel>
      {shape && (
        <StatusElement>
          <Shape shape={shape} />
        </StatusElement>
      )}
    </StatusContainer>
  );
};

const mapStateToProps = (state) => ({
  scoring: getScoring(state),
  nextShapeType: getNextShapeType(state),
});

export default connect(mapStateToProps)(StatusBoard);

import styled from 'styled-components';
import { connect } from 'react-redux';

import theme from 'tetris/theme';
import { getLevel } from 'tetris/store/selectors/GameSelectors';

const LevelContainer = styled.section`
  display: flex;
  width: 5rem;
  height: 6rem;
  border: 3px double ${theme.black};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${theme.white};
`;

const LevelLabel = styled.div`
  font-size: 1rem;
`;

const LevelValue = styled.div`
  font-family: 'Digital Display', sans-serif;
  font-size: 6rem;
`;

const LevelIndicator = (props) => {
  const { level } = props;

  return (
    <LevelContainer>
      <LevelLabel>Level</LevelLabel>
      <LevelValue>{level}</LevelValue>
    </LevelContainer>
  );
};

const mapStateToProps = (state) => ({
  level: getLevel(state),
});

export default connect(mapStateToProps)(LevelIndicator);

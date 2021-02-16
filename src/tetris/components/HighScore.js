import styled from 'styled-components';
import highScoreBackground from 'tetris/assets/images/high-score.jpg';
import theme from 'tetris/theme';
import { connect } from 'react-redux';
import { useState } from 'react';
import { take } from 'lodash';

import { getHighScore } from 'tetris/store/selectors/AppSelectors';
import { getScoring } from 'tetris/store/selectors/GameSelectors';
import { goToMenu, updateScore } from 'tetris/store/actions/AppActions';
import Input from 'tetris/components/Input';
import { Button } from 'tetris/components/Button';

const HighScoreContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  background: url(${highScoreBackground}) no-repeat center center;
  background-size: cover;
`;

const HighScorePanel = styled.div`
  position: relative;
  border: 4px double ${theme.black};
  box-shadow: 0 0 0 1px ${theme.black};
  height: 26rem;
  padding: 2rem;
  background: ${theme.white};
`;

const HighScoreTitle = styled.h3`
  position: absolute;
  margin: -3.5rem auto 0 auto;
  padding: 0.5rem 1rem;
  width: calc(100% - 6rem);
  font-size: 1.25rem;
  font-weight: normal;
  text-transform: uppercase;
  background: ${theme.white};
  border: 1px solid ${theme.black};
`;

const HighScoreTable = styled.table``;

const HighScoreTableHeadingRow = styled.tr``;

const HighScoreTableHeading = styled.th`
  text-align: left;
  padding: 0.5rem 1rem;
`;

const HighScoreTableCell = styled.td`
  padding: 0.5rem 1rem;
`;

const EnterNameDialog = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: calc(50% - 5rem);
  left: calc(50% - 10rem);
  height: 15rem;
  width: 20rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: ${theme.white};
  border: 4px double ${theme.black};
  box-shadow: 0 0 0 1px ${theme.black};
`;

const EnterNameLabel = styled.span`
  margin-bottom: 0.5rem;
`;

const HighScore = (props) => {
  const { highScore, scoring, goToMenu, updateScore } = props;

  const [name, setName] = useState('');

  const topTen = take(highScore, 10);

  const displayNameDialog =
    scoring && (highScore.length <= 10 || scoring.score > highScore[9].score);

  return (
    <HighScoreContainer>
      <HighScorePanel>
        <HighScoreTitle>Top Ten Comrades</HighScoreTitle>
        <HighScoreTable>
          <thead>
            <HighScoreTableHeadingRow>
              <HighScoreTableHeading></HighScoreTableHeading>
              <HighScoreTableHeading>Name</HighScoreTableHeading>
              <HighScoreTableHeading>Level</HighScoreTableHeading>
              <HighScoreTableHeading>Score</HighScoreTableHeading>
              <HighScoreTableHeading>Advanced Mode</HighScoreTableHeading>
            </HighScoreTableHeadingRow>
          </thead>
          <tbody>
            {topTen.map((score, index) => (
              <tr key={`high-score-${index}-${score.score}`}>
                <HighScoreTableCell>{index + 1}.</HighScoreTableCell>
                <HighScoreTableCell>{score.name}</HighScoreTableCell>
                <HighScoreTableCell>{score.level}</HighScoreTableCell>
                <HighScoreTableCell>{score.score}</HighScoreTableCell>
                <HighScoreTableCell>
                  {score.advancedMode ? `On` : 'Off'}
                </HighScoreTableCell>
              </tr>
            ))}
          </tbody>
        </HighScoreTable>
      </HighScorePanel>
      <Button onClick={goToMenu} disabled={displayNameDialog}>
        Back to the Menu
      </Button>
      {displayNameDialog && (
        <EnterNameDialog>
          <EnterNameLabel>Please enter your name</EnterNameLabel>
          <Input onChange={(value) => setName(value)} />
          <Button
            onClick={() => updateScore(name)}
            disabled={!name}
            type="submit"
          >
            Enter High Score
          </Button>
        </EnterNameDialog>
      )}
    </HighScoreContainer>
  );
};

const mapStateToProps = (state) => ({
  highScore: getHighScore(state),
  scoring: getScoring(state),
});

const mapDispatchToProps = {
  updateScore,
  goToMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);

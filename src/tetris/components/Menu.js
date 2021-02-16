import { useState } from 'react';
import { connect } from 'react-redux';
import { times } from 'lodash';

import {
  goToGame,
  goToHighScore,
  toggleInstructions,
} from 'tetris/store/actions/AppActions';

import {
  AdvancedModeButton,
  AdvancedModeContainer,
  AdvancedModeLabel,
  HeightButton,
  HeightLabel,
  HeightOptions,
  HeightSelectionContainer,
  InteractiveMenu,
  LevelButton,
  LevelLabel,
  LevelOptions,
  LevelSelectionContainer,
  MenuContainer,
  SovietMap,
  StartButton,
} from 'tetris/components/Menu.style';
import { HEIGHT_OPTIONS } from 'tetris/GameSettings';
import { Button } from 'tetris/components/Button';

const Menu = (props) => {
  const { goToGame, goToHighScore, toggleInstructions } = props;

  const [level, setLevel] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [height, setHeight] = useState(0);

  return (
    <MenuContainer>
      <InteractiveMenu>
        <LevelSelectionContainer>
          <LevelLabel>Level</LevelLabel>
          <LevelOptions>
            {times(10, (levelIndex) => (
              <LevelButton
                selected={level === levelIndex}
                key={`level-button-${levelIndex}`}
                onClick={() => setLevel(levelIndex)}
              >
                {levelIndex}
              </LevelButton>
            ))}
          </LevelOptions>
        </LevelSelectionContainer>
        <AdvancedModeContainer>
          <AdvancedModeLabel>Advanced Mode</AdvancedModeLabel>
          <AdvancedModeButton onClick={() => setAdvancedMode(!advancedMode)}>
            {advancedMode ? `On` : `Off`}
          </AdvancedModeButton>
          <Button onClick={goToHighScore}>High Score</Button>
          <Button onClick={toggleInstructions}>Instructions</Button>
        </AdvancedModeContainer>
        <HeightSelectionContainer>
          <HeightLabel>Height</HeightLabel>
          <HeightOptions>
            {HEIGHT_OPTIONS.map((heightOption) => (
              <HeightButton
                selected={height === heightOption}
                key={`height-button-${heightOption}`}
                onClick={() => setHeight(heightOption)}
              >
                {heightOption}
              </HeightButton>
            ))}
          </HeightOptions>
        </HeightSelectionContainer>
      </InteractiveMenu>
      <SovietMap>
        <StartButton onClick={() => goToGame(level, height, advancedMode)}>
          Start Game
        </StartButton>
      </SovietMap>
    </MenuContainer>
  );
};

const mapDispatchToProps = {
  goToGame,
  goToHighScore,
  toggleInstructions,
};

export default connect(null, mapDispatchToProps)(Menu);

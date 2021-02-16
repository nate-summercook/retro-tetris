import { connect } from 'react-redux';
import styled from 'styled-components';

import theme from 'tetris/theme';
import { getShowInstructions } from 'tetris/store/selectors/AppSelectors';
import { toggleInstructions } from 'tetris/store/actions/AppActions';
import { isGamePaused } from 'tetris/store/selectors/GameSelectors';
import { Button } from 'tetris/components/Button';
import { pauseOrResumeGame } from 'tetris/store/actions/GameActions';

const DIALOG_WIDTH = 20;
const DIALOG_HEIGHT = 20;

const InstructionsContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: calc(50% - ${DIALOG_HEIGHT / 2}rem);
  left: calc(50% - ${DIALOG_WIDTH / 2}rem);
  height: ${DIALOG_HEIGHT}rem;
  width: ${DIALOG_WIDTH}rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: ${theme.white};
  border: 4px double ${theme.black};
  box-shadow: 0 0 0 1px ${theme.black};
`;

const InstructionsTitle = styled.h3`
  font-family: Chicago, sans-serif;
`;

const Shortcuts = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const KeyPair = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShortcutKey = styled.span``;

const ShortcutDescription = styled.span``;

const Instructions = (props) => {
  const {
    showInstructions,
    toggleInstructions,
    pauseOrResumeGame,
    paused,
  } = props;
  return (
    <>
      {showInstructions && (
        <InstructionsContainer>
          <InstructionsTitle>Instructions</InstructionsTitle>
          <Shortcuts>
            <KeyPair>
              <ShortcutKey>I</ShortcutKey>
              <ShortcutDescription>Toggle Instructions</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>P</ShortcutKey>
              <ShortcutDescription>Pause / Resume</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>N</ShortcutKey>
              <ShortcutDescription>Restart Game</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>⇦</ShortcutKey>
              <ShortcutDescription>Move Shape Left</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>⇨</ShortcutKey>
              <ShortcutDescription>Move Shape Right</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>⎵</ShortcutKey>
              <ShortcutDescription>Drop Shape</ShortcutDescription>
            </KeyPair>
            <KeyPair>
              <ShortcutKey>R</ShortcutKey>
              <ShortcutDescription>Rotate Shape</ShortcutDescription>
            </KeyPair>
          </Shortcuts>
          <Button
            onClick={() => {
              toggleInstructions();
              if (paused) {
                pauseOrResumeGame();
              }
            }}
          >
            Hide
          </Button>
        </InstructionsContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  showInstructions: getShowInstructions(state),
  paused: isGamePaused(state),
});

const mapDispatchToProps = {
  toggleInstructions,
  pauseOrResumeGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);

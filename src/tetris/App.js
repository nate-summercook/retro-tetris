import { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import GameBoard from 'tetris/components/GameBoard';
import { GAME_MUSIC } from 'tetris/GameSettings';
import menuMusic from 'tetris/assets/audio/menu.mp3';
import backgroundTitleBar from 'tetris/assets/images/title-bar.png';
import { goToStartPage } from 'tetris/store/actions/AppActions';
import { getPage } from 'tetris/store/selectors/AppSelectors';
import StartPage from 'tetris/components/StartPage';
import Menu from 'tetris/components/Menu';
import { Pages } from 'tetris/store/reducers/AppReducer';
import HighScore from 'tetris/components/HighScore';
import Instructions from 'tetris/components/Instructions';

const AppContainer = styled.div``;

const TitleBar = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background: #eee url(${backgroundTitleBar}) repeat-x;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0 1rem;
  background-color: #eee;
  font-size: 1.5rem;
  height: 2rem;
`;

const GameAudio = styled.audio`
  visibility: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 0.875rem;
  top: 0.375rem;
  height: 1.25rem;
  width: 1.25rem;
  outline: none;
  cursor: pointer;
  border: 3px groove #bdbde0;
  background-color: #ddd;
  box-shadow: 0 0 0 0.25rem #eee;
  justify-self: flex-start;

  &:active {
    border: 3px groove #9e9eb3;
    background-color: #aaa;
    box-shadow: 0 0 0 0.25rem #eee;
  }
`;

const App = (props) => {
  const { page, goToStartPage } = props;

  return (
    <AppContainer>
      <TitleBar>
        {page !== Pages.START_PAGE && <CloseButton onClick={goToStartPage} />}
        <Title>TETRIS</Title>
      </TitleBar>
      <GameAudio id={`menu-music`}>
        <source src={menuMusic} type="audio/mpeg" />
      </GameAudio>
      {GAME_MUSIC.map((music, level) => (
        <GameAudio key={`level-music-${level}`} id={`level-music-${level}`}>
          <source src={music} type="audio/mpeg" />
        </GameAudio>
      ))}
      {page === Pages.START_PAGE && <StartPage />}
      {page === Pages.MENU && <Menu />}
      {page === Pages.GAME && <GameBoard />}
      {page === Pages.HIGH_SCORE && <HighScore />}
      <Instructions />
    </AppContainer>
  );
};

const mapStateToProps = (state) => ({
  page: getPage(state),
});

const mapDispatchToProps = {
  goToStartPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

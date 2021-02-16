import styled from 'styled-components';
import { connect } from 'react-redux';

import startPageBackground from 'tetris/assets/images/start-page.jpg';
import sovietS from 'tetris/assets/images/soviet-s.png';
import border from 'tetris/assets/images/border.png';
import { goToMenu } from 'tetris/store/actions/AppActions';
import theme from 'tetris/theme';

const StartPageContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
  background: #b01f18 url(${startPageBackground}) no-repeat bottom center;
  background-size: contain;
`;

const TetrisTitle = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Retro = styled.h1`
  font-family: 'Times New Roman', serif;
  color: ${theme.sovietYellow};
  font-size: 5rem;
  margin-left: auto;
  margin-right: auto;
`;

const Tetris = styled.h1`
  font-family: 'Times New Roman', serif;
  color: ${theme.sovietYellow};
  font-size: 5rem;
  margin-left: auto;
  margin-right: auto;
`;

const SovietSImg = styled.img`
  width: 4.75rem;
  vertical-align: top;
`;

const BottomText = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  margin: 0;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  box-sizing: border-box;
  background-color: ${theme.white};
  border: 3px solid transparent;
  border-image: url(${border}) 7;
  border-image-repeat: round;
`;

const StartPage = (props) => {
  const { goToMenu } = props;
  return (
    <StartPageContainer onClick={goToMenu}>
      <TetrisTitle>
        <Retro>RETRO</Retro>
        <Tetris>
          TETРИ
          <SovietSImg src={sovietS} />
        </Tetris>
      </TetrisTitle>
      <BottomText>
        © 2021 a project by Nathanael Sommer. One day I felt nostalgic and
        thought, let's rebuild this in React! 🤷🏼‍♂️
      </BottomText>
    </StartPageContainer>
  );
};

const mapDispatchToProps = {
  goToMenu,
};

export default connect(null, mapDispatchToProps)(StartPage);

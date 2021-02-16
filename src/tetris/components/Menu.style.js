import styled from 'styled-components';
import theme from 'tetris/theme';
import menuBackground from 'tetris/assets/images/soviet.png';
import star from 'tetris/assets/images/star.png';
import starHover from 'tetris/assets/images/star-hover.png';

export const MenuContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export const InteractiveMenu = styled.section`
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: linear-gradient(
      0deg,
      ${theme.menuGradientLight},
      ${theme.menuGradientDarker} 80%
    )
    no-repeat center center;
`;

export const SovietMap = styled.div`
  height: 100%;
  background: url(${menuBackground}) no-repeat center center,
    linear-gradient(
      0deg,
      ${theme.menuGradientLight},
      ${theme.menuGradientDark} 80%
    );
  background-size: contain;
  display: flex;
  justify-content: center;
`;

export const StartButton = styled.button`
  border: 0;
  margin-top: 5%;
  outline: none;
  background: url(${star}) no-repeat center center;
  background-size: cover;
  font-family: Chicago, sans-serif;
  font-size: 1.25rem;
  color: ${theme.sovietYellow};
  width: 25rem;
  height: 15rem;
  cursor: pointer;

  &:hover {
    background: url(${starHover}) no-repeat center center;
    background-size: cover;
  }
`;

export const LevelSelectionContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: calc(40% - 4rem);
`;

export const LevelLabel = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: 'Chicago', sans-serif;
  font-size: 2rem;
  text-transform: uppercase;
  color: ${theme.sovietYellow};
  background: linear-gradient(0deg, ${theme.sovietYellow}, ${theme.sovietRed});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const LevelOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const LevelButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 20%;
  flex-grow: 1;
  text-align: center;
  font-family: 'Digital Display', sans-serif;
  font-size: 4rem;
  background: ${(props) => (props.selected ? '#c7c7fc' : '#333366')};
  padding: 1.5rem 0.5rem;
  border: 5px inset #222244;
  color: ${(props) => (props.selected ? '#222244' : theme.white)};

  @media (max-width: ${theme.breakpoint.m}) {
    font-size: 2rem;
  }
`;

export const AdvancedModeContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdvancedModeLabel = styled(LevelLabel)`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const AdvancedModeButton = styled.button`
  cursor: pointer;
  outline: none;
  background-color: ${theme.white};
  padding: 1rem;
  border-radius: 50%;
  width: 5rem;
  font-size: 2rem;
  font-family: 'Digital Display', sans-serif;
`;

export const HeightSelectionContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: calc(40% - 4rem);
`;

export const HeightLabel = styled(LevelLabel)``;

export const HeightOptions = styled(LevelOptions)``;

export const HeightButton = styled(LevelButton)``;

import backgroundLevel0 from 'tetris/assets/images/level-0.jpg';
import backgroundLevel1 from 'tetris/assets/images/level-1.jpg';
import backgroundLevel2 from 'tetris/assets/images/level-2.jpg';
import backgroundLevel3 from 'tetris/assets/images/level-3.jpg';
import backgroundLevel4 from 'tetris/assets/images/level-4.jpg';
import backgroundLevel5 from 'tetris/assets/images/level-5.jpg';
import backgroundLevel6 from 'tetris/assets/images/level-6.jpg';
import backgroundLevel7 from 'tetris/assets/images/level-7.jpg';
import backgroundLevel8 from 'tetris/assets/images/level-8.jpg';
import backgroundLevel9 from 'tetris/assets/images/level-9.jpg';

import level0Music from 'tetris/assets/audio/level-0.mp3';
import level1Music from 'tetris/assets/audio/level-1.mp3';
import level2Music from 'tetris/assets/audio/level-2.mp3';
import level3Music from 'tetris/assets/audio/level-3.mp3';
import level4Music from 'tetris/assets/audio/level-4.mp3';
import level5Music from 'tetris/assets/audio/level-5.mp3';
import level6Music from 'tetris/assets/audio/level-6.mp3';
import level7Music from 'tetris/assets/audio/level-7.mp3';
import level8Music from 'tetris/assets/audio/level-8.mp3';
import level9Music from 'tetris/assets/audio/level-9.mp3';

export const STONE_DIMENSION_L = 2.5;
export const STONE_BORDER_L = STONE_DIMENSION_L / 12;
export const STONE_SHADOW_L = STONE_DIMENSION_L / 5;
export const STONE_DIMENSION_M = 2;
export const STONE_BORDER_M = STONE_DIMENSION_M / 12;
export const STONE_SHADOW_M = STONE_DIMENSION_M / 5;
export const PANEL_STONES_X = 10;
export const PANEL_STONES_Y = 22;
export const LINES_IN_LEVEL = [2, 2, 4, 6, 8, 12, 16, 20, 24];

// Original delay formulas from https://tetris.wiki/Tetris_(Spectrum_HoloByte)
export const FRAME = 1000 / 30;
export const ARE_DELAY = 2 * FRAME;
export const LINE_CLEAR_DELAY = 20 * FRAME;
export const LOCK_DELAY = 16 * FRAME;
export const GRAVITY_DELAY = (level) => (20 - level * 2) * FRAME;

export const HEIGHT_OPTIONS = [0, 4, 7, 10, 13];

export const BACKGROUND_IMAGES = [
  backgroundLevel0,
  backgroundLevel1,
  backgroundLevel2,
  backgroundLevel3,
  backgroundLevel4,
  backgroundLevel5,
  backgroundLevel6,
  backgroundLevel7,
  backgroundLevel8,
  backgroundLevel9,
];

export const GAME_MUSIC = [
  level0Music,
  level1Music,
  level2Music,
  level3Music,
  level4Music,
  level5Music,
  level6Music,
  level7Music,
  level8Music,
  level9Music,
];

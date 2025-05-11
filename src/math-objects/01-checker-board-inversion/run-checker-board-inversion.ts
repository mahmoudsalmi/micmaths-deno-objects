import { colorPairs } from '../../color/color-pair.ts';
import { CheckerBoard } from './checker-board.ts';

const A4_WIDTH = 2480;
const A4_HEIGHT = 3508;

export async function runCheckerboardInversion() {
  for (const [, colors] of Object.entries(colorPairs)) {
    // 01 - create and saved colored chess boards
    console.log(`[🏃‍♂️‍➡️ start] Generating ${colors.name} chess board ♔♕♖ ...`)
    await new CheckerBoard(
      A4_HEIGHT,
      A4_HEIGHT,
      A4_HEIGHT / 8,
      0,
    ).saveCheckerImage(colors, `01-chess-board-${colors.name}.png`);
    console.log(`[✅ end] ${colors.name} chess board saved as [01-chess-board-${colors.name}.png]`)

    // 02 - create A4 ratio inverted checker
    console.log(`[🏃‍♂️‍➡️ start] Generating ${colors.name} inverted checker board ...`)
    await new CheckerBoard(
      A4_WIDTH,
      A4_HEIGHT,
      A4_WIDTH / 2,
      A4_WIDTH / 2,
    ).saveCheckerImageInverted(
      colors,
      `01-checker-board-inverted-${colors.name}.png`,
    );
    console.log(`[✅ end] ${colors.name} inverted checker board saved as [01-checker-board-inverted-${colors.name}.png]`)
  }
}

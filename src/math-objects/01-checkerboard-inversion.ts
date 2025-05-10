import { Color, colorPairs } from '../image-helper/color.ts';
import { Image } from '../image-helper/image.ts';

const width = 2480;
const height = 3508;

const cellSize = width / 2;
const invariableRayon = width / 2;

function checkerboardCalculator(colors: [Color, Color]) {
  return (x: number, y: number): Color => {
    const cx = Math.floor(x / cellSize);
    const cy = Math.floor(y / cellSize);
    return colors.at((cx + cy) % 2)!;
  };
}

function invertedCheckerboardCalculator(colors: [Color, Color]) {
  return (x: number, y: number) => {
    const x0 = x - width / 2 + .5;
    const y0 = y - height / 2 + .5;
    const f = invariableRayon ** 2 / (x0 ** 2 + y0 ** 2 + 0.000000000001);
    const x1 = x0 * f;
    const y1 = y0 * f;
    return checkerboardCalculator(colors)(x1, y1);
  };
}

async function generateCheckerboardAndInverted(
  name: string,
  colors: [Color, Color],
) {
  console.log(`Generating ${name}...`);

  await new Image(
    width,
    height,
    checkerboardCalculator(colors),
  ).save(`01-checkerboard-${name}.png`);

  await new Image(
    width,
    height,
    invertedCheckerboardCalculator(colors),
  ).save(`01-checkerboard-${name}-inverted.png`);
  console.log(`Done ${name}.`);
}

export async function runCheckerboardInversion() {
  for (const [name, colors] of Object.entries(colorPairs)) {
    await generateCheckerboardAndInverted(name, colors);
  }
}

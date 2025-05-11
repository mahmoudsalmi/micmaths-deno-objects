import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { CheckerBoard } from './checker-board.ts';
import { type ColorPair, colorPairs } from '../../color/color-pair.ts';
import { Pixel } from '../../images/pixel.ts';

describe('CheckerBoard', () => {
  it('should be created', () => {
    expect(new CheckerBoard(10, 10, 2, 0)).toBeTruthy();
  });

  it('should calculate pixel color correctly', () => {
    const checker = new CheckerBoard(10, 10, 2, 0);
    const colors: ColorPair = colorPairs.Classic;
    const pixel: Pixel = new Pixel(1, 1);
    const color = checker.calculatePixelColor(colors)(pixel);
    expect(color).toBe(colors.primaryColor);
  });

  it('should calculate inverted pixel correctly', () => {
    const checker = new CheckerBoard(10, 10, 2, 5);
    const pixel: Pixel = new Pixel(5, 5);
    const invertedPixel = checker.calculateInvertedPixel(pixel);
    expect(invertedPixel.x).not.toBe(pixel.x);
    expect(invertedPixel.y).not.toBe(pixel.y);
  });

  it('should calculate inverted pixel color correctly', () => {
    const checker = new CheckerBoard(10, 10, 2, 5);
    const colors: ColorPair = colorPairs.Classic;
    const pixel: Pixel = new Pixel(1, 1);
    const color = checker.calculateInvertedPixelColor(colors)(pixel);
    expect(color).toBeTruthy();
  });
});

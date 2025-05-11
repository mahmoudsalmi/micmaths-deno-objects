import { beforeEach, describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { Image } from './image.ts';
import { Color, colors } from '../color/color.ts';
import { Pixel } from './pixel.ts';

describe("Image", () => {
  let testImage: Image;

  beforeEach(() => {
    testImage = new Image(3, 2);
  });

  it("should be created", () => {
    expect(new Image(10, 10)).toBeTruthy();
  });

  describe("constructor", () => {
    it("should create an image with correct dimensions", () => {
      expect(testImage.width).toBe(3);
      expect(testImage.height).toBe(2);
      expect(testImage.pixels.length).toBe(6); // 3x2
    });

    it("should initialize with white pixels by default", () => {
      for (let y = 0; y < testImage.height; y++) {
        for (let x = 0; x < testImage.width; x++) {
          const color = testImage.getPixel(new Pixel(x, y));
          expect(color).toBe(colors.White);
        }
      }
    });

    it("should use the provided color calculator", () => {
      // Create a checkerboard pattern
      const checkerboard = new Image(2, 2, (pixel) => {
        return (pixel.x + pixel.y) % 2 === 0 ? colors.White : colors.Black;
      });

      expect(checkerboard.getPixel(new Pixel(0, 0))).toBe(colors.White);
      expect(checkerboard.getPixel(new Pixel(1, 0))).toBe(colors.Black);
      expect(checkerboard.getPixel(new Pixel(0, 1))).toBe(colors.Black);
      expect(checkerboard.getPixel(new Pixel(1, 1))).toBe(colors.White);
    });
  });

  describe("pixel manipulation", () => {
    it("should update and retrieve pixel colors correctly", () => {
      const pixel = new Pixel(1, 1);
      testImage.updatePixel(pixel, colors.Red);
      expect(testImage.getPixel(pixel)).toBe(colors.Red);

      testImage.updatePixel(new Pixel(0, 1), colors.Green);
      expect(testImage.getPixel(new Pixel(0, 1))).toBe(colors.Green);
    });
  });

  describe("toUint8Array", () => {
    it("should convert image data to Uint8Array correctly", () => {
      // Create a 2x1 image with specific colors
      const smallImage = new Image(2, 1);
      smallImage.updatePixel(new Pixel(0, 0), colors.Red);
      smallImage.updatePixel(new Pixel(1, 0), colors.Blue);

      const data = smallImage.toUint8Array();

      // 2 pixels x 4 bytes (RGBA) = 8 bytes
      expect(data.length).toBe(8);

      // Check Red pixel
      expect(data[0]).toBe(colors.Red.r);
      expect(data[1]).toBe(colors.Red.g);
      expect(data[2]).toBe(colors.Red.b);
      expect(data[3]).toBe(colors.Red.a);

      // Check Blue pixel
      expect(data[4]).toBe(colors.Blue.r);
      expect(data[5]).toBe(colors.Blue.g);
      expect(data[6]).toBe(colors.Blue.b);
      expect(data[7]).toBe(colors.Blue.a);
    });
  });

  describe("iteration", () => {
    it("should iterate through all pixels in correct order", () => {
      const expectedPositions = [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ];

      expect(testImage.pixels.length).toBe(6);

      let index = 0;
      for (const pixel of testImage) {
        expect(pixel.x).toBe(expectedPositions.at(index)?.at(0));
        expect(pixel.y).toBe(expectedPositions.at(index)?.at(1));
        index++;
      }

      expect(index).toBe(expectedPositions.length);
    });

    it("should allow modifying pixels during iteration", () => {
      // Set all pixels to their position-based color
      for (const pixel of testImage) {
        const colorValue = (pixel.x + pixel.y * 10) * 20;
        testImage.updatePixel(
          pixel,
          new Color(
            colorValue % 256,
            0,
            0,
            255,
          ),
        );
      }

      // Verify pixels were set correctly
      expect(testImage.getPixel(new Pixel(0, 0)).r).toBe(0);
      expect(testImage.getPixel(new Pixel(1, 0)).r).toBe(20);
      expect(testImage.getPixel(new Pixel(0, 1)).r).toBe(200);
    });
  });
});

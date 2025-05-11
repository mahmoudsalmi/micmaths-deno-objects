import type { ColorPair } from '../../color/color-pair.ts';
import type { Color } from '../../color/color.ts';
import { Image } from '../../images/mod.ts';
import type { Pixel } from '../../images/pixel.ts';

/**
 * Represents a checkerboard pattern generator with inversion capabilities.
 */
export class CheckerBoard {
  /**
   * Creates a new CheckerBoard instance.
   * @param width - The width of the checkerboard in pixels.
   * @param height - The height of the checkerboard in pixels.
   * @param cellSize - The size of each checkerboard cell in pixels.
   * @param invariableRayon - The radius used for inversion calculations.
   */
  public constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly cellSize: number,
    public readonly invariableRayon: number,
  ) {}

  /**
   * Calculates the color of a pixel based on its position in the checkerboard.
   * @param colors - The primary and secondary colors of the checkerboard.
   * @returns A function that determines the color of a given pixel.
   */
  calculatePixelColor(colors: ColorPair): (pixel: Pixel) => Color {
    return (pixel: Pixel) => {
      const c = pixel.transform((t) => Math.floor(t / this.cellSize));
      if ((c.x + c.y) % 2 === 0) {
        return colors.primaryColor;
      } else {
        return colors.secondaryColor;
      }
    };
  }

  /**
   * Calculates the inverted position of a pixel based on the inversion radius.
   * @param pixel - The pixel to invert.
   * @returns The inverted pixel.
   */
  calculateInvertedPixel(pixel: Pixel): Pixel {
    const centred = pixel.transform(
      (x) => x - this.width / 2 + .5,
      (y) => y - this.height / 2 + .5,
    );

    const factor = this.invariableRayon ** 2 /
      (centred.x ** 2 + centred.y ** 2 + 0.000000000001);

    return centred.transform(
      (t) => t * factor,
    );
  }

  /**
   * Calculates the color of a pixel after inversion.
   * @param colorPair - The primary and secondary colors of the checkerboard.
   * @returns A function that determines the color of a given pixel after inversion.
   */
  calculateInvertedPixelColor(colorPair: ColorPair): (pixel: Pixel) => Color {
    return (pixel: Pixel) => {
      const inverted = this.calculateInvertedPixel(pixel);
      return this.calculatePixelColor(colorPair)(inverted);
    };
  }

  /**
   * Saves the checkerboard image to a file.
   * @param colorPair - The primary and secondary colors of the checkerboard.
   * @param filename - The name of the file to save the image to.
   * @returns A promise that resolves when the image is saved.
   */
  async saveCheckerImage(
    colorPair: ColorPair,
    filename: string,
  ): Promise<void> {
    await new Image(
      this.width,
      this.height,
      this.calculatePixelColor(colorPair),
    ).save(filename);
  }

  /**
   * Saves the inverted checkerboard image to a file.
   * @param colorPair - The primary and secondary colors of the checkerboard.
   * @param filename - The name of the file to save the image to.
   * @returns A promise that resolves when the image is saved.
   */
  async saveCheckerImageInverted(
    colorPair: ColorPair,
    filename: string,
  ): Promise<void> {
    await new Image(
      this.width,
      this.height,
      this.calculateInvertedPixelColor(colorPair),
    ).save(filename);
  }
}

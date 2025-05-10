import { encodePNG } from '@img/png/encode';
import { Color, Colors } from './color.ts';

export type Pixel = { x: number; y: number };

export class Image implements Iterable<Pixel> {
  public data: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
    colorCalculator: (x: number, y: number) => Color = () => Colors.White,
  ) {
    this.data = new Uint8Array(width * height * 4);
    for (const pixel of this) {
      this.updatePixel(pixel, colorCalculator(pixel.x, pixel.y));
    }
  }

  updatePixel(pixel: Pixel, color: Color) {
    const index = (pixel.y * this.width + pixel.x) * 4;
    this.data[index] = color.r;
    this.data[index + 1] = color.g;
    this.data[index + 2] = color.b;
    this.data[index + 3] = color.a;
  }

  getPixel(pixel: Pixel): Color {
    const index = (pixel.y * this.width + pixel.x) * 4;
    return new Color(
      this.data[index],
      this.data[index + 1],
      this.data[index + 2],
      this.data[index + 3],
    );
  }

  async save(
    filename: string,
  ): Promise<void> {
    await Deno.mkdir("./images/", { recursive: true });
    await Deno.writeFile(
      "./images/" + filename,
      await encodePNG(this.data, {
        width: this.width,
        height: this.height,
        compression: 0,
        filter: 0,
        interlace: 0,
      }),
    );
  }

  [Symbol.iterator](): Iterator<Pixel> {
    let count = 0;
    let x = 0, y = 0;
    const { width, height } = this;

    return {
      next(): IteratorResult<Pixel> {
        count++;
        if (y > height) {
          return { done: true, value: undefined };
        }

        const current = { x, y };

        x++;
        if (x > width) {
          x = 0;
          y++;
        }

        return { done: false, value: current };
      },
    };
  }
}

/**
 * Represents an RGBA color.
 * This class handles color representation and conversion between different formats.
 */
export class Color {
  /**
   * The red component of the color (0-255)
   * @private
   */
  private readonly _r: number;

  /**
   * The green component of the color (0-255)
   * @private
   */
  private readonly _g: number;

  /**
   * The blue component of the color (0-255)
   * @private
   */
  private readonly _b: number;

  /**
   * The alpha (opacity) component of the color (0-255)
   * @private
   */
  private readonly _a: number;

  /**
   * Creates a new Color instance.
   * @param r - The red component (0-255)
   * @param g - The green component (0-255)
   * @param b - The blue component (0-255)
   * @param a - The alpha (opacity) component (0-255)
   */
  constructor(r: number, g: number, b: number, a: number) {
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error("Invalid color components");
    }
    this._r = r % 256;
    this._g = g % 256;
    this._b = b % 256;
    this._a = a % 256;
  }

  /**
   * Gets the red component of the color.
   * @returns The red component (0-255)
   */
  get r(): number {
    return this._r;
  }

  /**
   * Gets the green component of the color.
   * @returns The green component (0-255)
   */
  get g(): number {
    return this._g;
  }

  /**
   * Gets the blue component of the color.
   * @returns The blue component (0-255)
   */
  get b(): number {
    return this._b;
  }

  /**
   * Gets the alpha (opacity) component of the color.
   * @returns The alpha component (0-255)
   */
  get a(): number {
    return this._a;
  }

  /**
   * Converts the color to an RGBA string.
   * @returns A CSS-compatible RGBA string representation (e.g., "rgba(255, 0, 0, 255)")
   */
  toString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  /**
   * Creates a Color instance from a hexadecimal color string.
   * @param hex - The hexadecimal color string (e.g., "#FF0000", "FF0000", "#F00", "F00")
   * @returns A new Color instance
   *
   * @example
   * // Create a red color
   * const red = Color.fromHex("#FF0000");
   *
   * @example
   * // Create a semi-transparent blue color
   * const blue = Color.fromHex("#0000FF80");
   *
   * @throws {Error} If the hex string has an invalid format
   */
  static fromHex(hex: string): Color {
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("") + "FF";
    }
    if (hex.length === 6) {
      hex = hex + "FF";
    }
    if (hex.length !== 8) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    return new Color(
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      parseInt(hex.slice(6, 8), 16),
    );
  }
}

export const colors: {
  Black: Color;
  White: Color;
  Red: Color;
  Green: Color;
  Blue: Color;
  Yellow: Color;
  Magenta: Color;
  Cyan: Color;
  Transparent: Color;
  Gray: Color;
  DarkGray: Color;
} = {
  Black: new Color(0, 0, 0, 255),
  White: new Color(255, 255, 255, 255),
  Red: new Color(255, 0, 0, 255),
  Green: new Color(0, 255, 0, 255),
  Blue: new Color(0, 0, 255, 255),
  Yellow: new Color(255, 255, 0, 255),
  Magenta: new Color(255, 0, 255, 255),
  Cyan: new Color(0, 255, 255, 255),
  Transparent: new Color(0, 0, 0, 0),
  Gray: new Color(128, 128, 128, 255),
  DarkGray: new Color(64, 64, 64, 255),
} as const;

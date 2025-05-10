export class Color {

  private readonly _r: number;
  private readonly _g: number;
  private readonly _b: number;
  private readonly _a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this._r = r % 256;
    this._g = g % 256;
    this._b = b % 256;
    this._a = a % 256;
  }

  get r(): number {
    return this._r;
  }

  get g(): number {
    return this._g;
  }

  get b(): number {
    return this._b;
  }

  get a(): number {
    return this._a;
  }

  toString() {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }

  static fromHex(hex: string): Color {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('') + 'FF';
    }
    if (hex.length === 6) {
      hex = hex + 'FF';
    }
    if (hex.length !== 8) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    return new Color(
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      parseInt(hex.slice(6, 8), 16),
    )
  }
}

export const Colors = {
  Black: new Color(0, 0, 0, 255),
  White: new Color(255, 255, 255, 255),
};

export const colorPairs: Record<string, [Color, Color]> = {
  classic : [Color.fromHex("#F5F5F5"), Color.fromHex("#212121")],
  ocean   : [Color.fromHex("#E0F7FA"), Color.fromHex("#01579B")],
  sunset  : [Color.fromHex("#FFEBEE"), Color.fromHex("#BF360C")],
  lavender: [Color.fromHex("#F3E5F5"), Color.fromHex("#4A148C")],
  mint    : [Color.fromHex("#E0F2F1"), Color.fromHex("#004D40")],
  berry   : [Color.fromHex("#FCE4EC"), Color.fromHex("#880E4F")],
  steel   : [Color.fromHex("#ECEFF1"), Color.fromHex("#263238")],
  desert  : [Color.fromHex("#FFF8E1"), Color.fromHex("#FF6F00")],
  electric: [Color.fromHex("#FFD600"), Color.fromHex("#1A237E")], // vibrant yellow/deep blue
  cosmic  : [Color.fromHex("#FF1744"), Color.fromHex("#1A237E")], // bright red/deep blue
};

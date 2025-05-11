import { describe, it } from '@std/testing/bdd';
import { expect } from '@std/expect';
import { Color } from './color.ts';

describe("Color", () => {
  it("should be created", () => {
    expect(new Color(0, 0, 0, 0)).toBeTruthy();
  });

  describe("constructor and getters", () => {
    it("should store and retrieve color components correctly", () => {
      const color = new Color(50, 100, 150, 200);
      expect(color.r).toBe(50);
      expect(color.g).toBe(100);
      expect(color.b).toBe(150);
      expect(color.a).toBe(200);
    });

    it("should handle values > 255 using modulo", () => {
      const color = new Color(256, 300, 400, 500);
      expect(color.r).toBe(0);    // 256 % 256 = 0
      expect(color.g).toBe(44);   // 300 % 256 = 44
      expect(color.b).toBe(144);  // 400 % 256 = 144
      expect(color.a).toBe(244);  // 500 % 256 = 244
    });
  });

  describe("toString", () => {
    it("should return correct rgba string", () => {
      const color = new Color(255, 128, 64, 200);
      expect(color.toString()).toBe("rgba(255, 128, 64, 200)");
    });
  });

  describe("fromHex", () => {
    it("should parse 6-digit hex with hash correctly", () => {
      const color = Color.fromHex("#FF8040");
      expect(color.r).toBe(255);
      expect(color.g).toBe(128);
      expect(color.b).toBe(64);
      expect(color.a).toBe(255); // Default alpha
    });

    it("should parse 6-digit hex without hash correctly", () => {
      const color = Color.fromHex("FF8040");
      expect(color.r).toBe(255);
      expect(color.g).toBe(128);
      expect(color.b).toBe(64);
      expect(color.a).toBe(255); // Default alpha
    });

    it("should parse 8-digit hex with alpha correctly", () => {
      const color = Color.fromHex("#FF8040C8");
      expect(color.r).toBe(255);
      expect(color.g).toBe(128);
      expect(color.b).toBe(64);
      expect(color.a).toBe(200); // C8 in hex = 200
    });

    it("should parse 3-digit shorthand hex correctly", () => {
      const color = Color.fromHex("#F84");
      expect(color.r).toBe(255); // FF
      expect(color.g).toBe(136); // 88
      expect(color.b).toBe(68);  // 44
      expect(color.a).toBe(255); // Default alpha
    });

    it("should parse 3-digit shorthand hex without hash correctly", () => {
      const color = Color.fromHex("F84");
      expect(color.r).toBe(255);
      expect(color.g).toBe(136);
      expect(color.b).toBe(68);
      expect(color.a).toBe(255);
    });

    it("should throw error for invalid hex format", () => {
      expect(() => Color.fromHex("#XYZ")).toThrow();
      expect(() => Color.fromHex("#12345")).toThrow();
      expect(() => Color.fromHex("")).toThrow();
      expect(() => Color.fromHex("#1234567")).toThrow();
    });
  });
});

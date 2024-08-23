export type RgbColor = [red: number, green: number, blue: number];

export const gradient = (
  r1: RgbColor[0],
  g1: RgbColor[1],
  b1: RgbColor[2],
  r2: RgbColor[0],
  g2: RgbColor[1],
  b2: RgbColor[2],
  d: number,
): RgbColor => [(r2 - r1) * d + r1, (g2 - g1) * d + g1, (b2 - b1) * d + b1];

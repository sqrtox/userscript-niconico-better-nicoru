import { type RgbColor, gradient } from "@/color.js";

export const NICORU_BUTTON_ARIA_LABEL = "ニコるボタン";

export const LOWEST_NICORU_COLOR: RgbColor = [84, 73, 28];

export type NicoruColorDefine = {
  start: number;
  end: number;
  color: RgbColor;
};

export const NICORU_COLOR_DEFINES: NicoruColorDefine[] = [
  // mythology
  {
    start: 100,
    end: 200,
    color: [51, 153, 255],
  },
  // legendary
  {
    start: 50,
    end: 100,
    color: [136, 72, 152],
  },
  // top
  {
    start: 10,
    end: 50,
    color: [255, 0, 0],
  },
  // limit
  {
    start: 0,
    end: 10,
    color: [252, 216, 66],
  },
].sort((a, b) => b.start - a.start) as NicoruColorDefine[];

export const getDistance = (n: number, start: number, end: number): number =>
  Math.min(Math.max(0, (n - start) / (end - start)), 1);

export const getNicoruColor = (n: number): RgbColor | undefined => {
  for (const [i, { start, end, color }] of NICORU_COLOR_DEFINES.entries()) {
    const previousLevelColor =
      NICORU_COLOR_DEFINES[i + 1]?.color ?? LOWEST_NICORU_COLOR;

    if (n > start) {
      const distance = getDistance(n, start, end);

      return gradient(...previousLevelColor, ...color, distance);
    }
  }
};

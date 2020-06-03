import { colors } from "../variables/colors";
import { ColorType } from "../typings";

export const toRgba = (color: ColorType, alpha: number): string => {
    const hex = colors[color];
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

export const toVariable = (color: ColorType): string => `var(--${color})`;
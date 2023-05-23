export const SIZE = 3;
export const DIMENSION = SIZE * SIZE;
export const ENCODED_STATE = (1 << DIMENSION) - 1;
export const VALUES = Array.from({ length: DIMENSION }, (_, i) => i + 1);

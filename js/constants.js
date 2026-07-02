/* ============================================================
   CONSTANTS / GAME MODEL
   ============================================================ */

// Mat: 5 columns x 3 rows of cells
export const COLS = 5;
export const ROWS = 3;
export const CELL = 1.6; // world units per cell
export const MAT_W = COLS * CELL;
export const MAT_D = ROWS * CELL;

// Trees are permanently fixed to these cell coordinates (col, row), 0-indexed
export const TREE_CELLS = [
  { col: 1.25, row: 1 },
  { col: 2.75, row: 1 }
];

// 8 branches per tree: 4 heights, 2 branches per height (180 deg apart)
export const BRANCH_HEIGHTS = [0.55, 0.78, 1.01, 1.24]; // world Y offsets from base top
export const BRANCH_LEN = 0.42;

// fruit composition per tree
export const FRUIT_POOL = ['yellow', 'yellow', 'red', 'red', 'green'];

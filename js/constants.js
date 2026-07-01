//all constants in game 1 - ripening quest 

// Mat: 5 columns x 3 rows of cells
const COLS = 5;
const ROWS = 3;
const CELL = 1.6; // world units per cell
const MAT_W = COLS * CELL;
const MAT_D = ROWS * CELL;
 
// Mat origin (top-left corner in world space)
const originX = -MAT_W / 2;
const originZ = -MAT_D / 2;
 
// Trees are permanently fixed to these cell coordinates (col, row), 0-indexed.
// Adjust col values to align trees with the real mat image.
const TREE_CELLS = [
  { col: 1.25, row: 1 },
  { col: 2.75, row: 1 }
];
 
// 8 branches per tree: 4 heights, 2 branches per height (180° apart).
// Values are Y offsets from the top of the base block.
const BRANCH_HEIGHTS = [0.55, 0.78, 1.01, 1.24];
const BRANCH_LEN = 0.42;
 
// Fruit composition per tree: 2 yellow, 2 red, 1 green
const FRUIT_POOL = ['yellow', 'yellow', 'red', 'red', 'green'];
 
// Fruit colors (Three.js hex values)
const FRUIT_COLORS = {
  yellow: 0xe8c84a,
  red:    0xc2402f,
  green:  0x2f8f5b
};
 
// Human-readable color names (used in the readout panel)
const COLOR_NAME = {
  yellow: 'Yellow',
  red:    'Red',
  green:  'Green'
};
 

//randomization functions for orientation and fruit placement

//DEPENDS ON: constants.js, state.js, scene.js, ui.js


function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
 
// Randomize tree orientation — both trees rotate by the same angle
function randomizeOrientation() {
  const options = [0, 90, 180, 270];
  state.treeAngle = options[Math.floor(Math.random() * options.length)];
  applyTreeAngle();
  updateReadout();
}
 
// Randomize fruit placement.
//
// Rules:
//   - Every height (4 total) must have at least one red or yellow fruit.
//   - We have exactly 4 red/yellow fruits (2+2) and 4 heights, so each
//     height gets exactly one red/yellow, using all 4.
//   - The single green fruit is placed on the OTHER branch at one randomly
//     chosen height (so that height ends up with 2 fruits).
//   - Which of the two branches at each height gets the red/yellow is random.
//   - Result: 1 height has 2 fruits, 3 heights have 1 fruit, 3 branches empty.
//   - Both trees always share the same fruit assignment.
function randomizeFruit() {
  const redYellow = ['yellow', 'yellow', 'red', 'red'];
  shuffleInPlace(redYellow);
 
  const next = new Array(8).fill(null);
 
  // Assign one red/yellow to each height on a randomly chosen side
  for (let h = 0; h < 4; h++) {
    const side = Math.random() < 0.5 ? 0 : 1;
    next[h * 2 + side] = redYellow[h];
  }
 
  // Place green on the open branch of one randomly chosen height
  const greenHeight = Math.floor(Math.random() * 4);
  const occupiedSide = next[greenHeight * 2] !== null ? 0 : 1;
  const openSide = occupiedSide === 0 ? 1 : 0;
  next[greenHeight * 2 + openSide] = 'green';
 
  state.branchAssignment = next;
  applyFruitAssignment();
  updateReadout();
}
 
// Reset both randomizations to defaults
function resetAll() {
  resetState();
  applyTreeAngle();
  applyFruitAssignment();
  updateReadout();
}
 

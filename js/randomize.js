/* ============================================================
   RANDOMIZATION LOGIC
   Exports: randomizeOrientation, randomizeFruit, resetAll
   ============================================================ */

import { state, defaultBranchAssignment } from './state.js';
import { trees, applyTreeAngle, applyFruitAssignment } from './scene.js';
import { updateReadout } from './readout.js';

function shuffleInPlace(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Rule: every height (4 total) must have at least one red or yellow fruit.
// We have exactly 4 red/yellow fruits (2 yellow, 2 red) and 4 heights, so
// each height gets exactly one red/yellow. The single green fruit then
// attaches as a 2nd fruit at one randomly chosen height.
function generateFruitAssignment(){
  const redYellow = ['yellow', 'yellow', 'red', 'red'];
  shuffleInPlace(redYellow);

  const next = new Array(8).fill(null);

  // assign one red/yellow to each height, on a randomly chosen side
  for(let h = 0; h < 4; h++){
    const side = Math.random() < 0.5 ? 0 : 1;
    next[h * 2 + side] = redYellow[h];
  }

  // pick one height to also receive the green fruit, on its OTHER side
  const greenHeight = Math.floor(Math.random() * 4);
  const occupiedSide = next[greenHeight * 2] !== null ? 0 : 1;
  const openSide = occupiedSide === 0 ? 1 : 0;
  next[greenHeight * 2 + openSide] = 'green';

  return next;
}

export function randomizeOrientation(){
  const options = [0, 90, 180, 270];
  if(state.independent){
    state.treeAngles = trees.map(() => options[Math.floor(Math.random() * options.length)]);
  } else {
    const angle = options[Math.floor(Math.random() * options.length)];
    state.treeAngles = [angle, angle];
  }
  applyTreeAngle();
  updateReadout();
}

export function randomizeFruit(){
  if(state.independent){
    state.branchAssignments = trees.map(() => generateFruitAssignment());
  } else {
    const assignment = generateFruitAssignment();
    // separate array instances so trees never share a reference
    state.branchAssignments = [assignment.slice(), assignment.slice()];
  }
  applyFruitAssignment();
  updateReadout();
}

export function resetAll(){
  state.treeAngles = [0, 0];
  state.branchAssignments = [defaultBranchAssignment(), defaultBranchAssignment()];
  applyTreeAngle();
  applyFruitAssignment();
  updateReadout();
}

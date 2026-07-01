// for the current game state - after each randomization 


const state = {
  // Shared rotation angle for both trees. Always one of 0 / 90 / 180 / 270.
  treeAngle: 0,
 
  // Array of length 8, one slot per branch (index = heightIdx*2 + sideIdx).
  // Each slot is either null (empty) or a color string ('yellow','red','green').
  branchAssignment: new Array(8).fill(null)
};
 
function defaultBranchAssignment() {
  // All branches empty — the default visual starting state.
  return new Array(8).fill(null);
}
 
function resetState() {
  state.treeAngle = 0;
  state.branchAssignment = defaultBranchAssignment();
}
 
// Initialise to defaults on load
state.branchAssignment = defaultBranchAssignment();
 

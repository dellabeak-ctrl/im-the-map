//for the updating interface 

//DEPENDS ON: constants.js, state.js, randomize.js

const sideLabels = ['A', 'B'];
 
function updateReadout() {
  // Update angle display
  document.getElementById('readout-angle').textContent = state.treeAngle + '°';
 
  // Rebuild branch grid
  const wrap = document.getElementById('branch-readout');
  wrap.innerHTML = '';
 
  state.branchAssignment.forEach((color, idx) => {
    const heightIdx = Math.floor(idx / 2);
    const sideIdx   = idx % 2;
 
    const slot = document.createElement('div');
    slot.className = 'branch-slot';
 
    const swatch = document.createElement('span');
    swatch.className = 'swatch ' + (color || 'empty');
    slot.appendChild(swatch);
 
    const label = document.createElement('span');
    label.textContent = `H${heightIdx + 1}${sideLabels[sideIdx]} · ${color ? COLOR_NAME[color] : 'empty'}`;
    slot.appendChild(label);
 
    wrap.appendChild(slot);
  });
}
 
// Wire up buttons
document.getElementById('btn-orientation').addEventListener('click', randomizeOrientation);
document.getElementById('btn-fruit').addEventListener('click', randomizeFruit);
document.getElementById('btn-reset').addEventListener('click', resetAll);
 
// Initial readout render
updateReadout();
 

/* ============================================================
   READOUT — renders the "Current State" panel
   Exports: updateReadout
   ============================================================ */

import { TRANSLATIONS } from './translations.js';
import { state } from './state.js';
import { trees } from './scene.js';

function colorName(t, color){
  if(!color) return t.empty;
  return color === 'yellow' ? t.colorYellow : color === 'red' ? t.colorRed : t.colorGreen;
}

function buildBranchGrid(assignment, t){
  const grid = document.createElement('div');
  grid.className = 'branch-grid';
  const sideLabels = ['A', 'B'];
  assignment.forEach((color, idx) => {
    const heightIdx = Math.floor(idx / 2);
    const sideIdx = idx % 2;
    const slot = document.createElement('div');
    slot.className = 'branch-slot';
    const swatch = document.createElement('span');
    swatch.className = 'swatch ' + (color || 'empty');
    slot.appendChild(swatch);
    const label = document.createElement('span');
    label.textContent = `H${heightIdx + 1}${sideLabels[sideIdx]} · ${colorName(t, color)}`;
    slot.appendChild(label);
    grid.appendChild(slot);
  });
  return grid;
}

export function updateReadout(){
  const t = TRANSLATIONS[state.lang];
  const wrap = document.getElementById('state-readout');
  wrap.innerHTML = '';

  if(state.independent){
    trees.forEach((tree, i) => {
      const angleRow = document.createElement('div');
      angleRow.className = 'readout';
      angleRow.innerHTML = `
        <div class="readout-row">
          <span class="readout-label">${t.labelAngleTree} ${i + 1}</span>
          <span class="readout-value">${state.treeAngles[i]}°</span>
        </div>`;
      wrap.appendChild(angleRow);

      const title = document.createElement('div');
      title.className = 'tree-block-title';
      title.style.marginTop = '10px';
      title.textContent = `${t.labelBranchTree} ${i + 1}`;
      wrap.appendChild(title);

      wrap.appendChild(buildBranchGrid(state.branchAssignments[i], t));
    });
  } else {
    const angleRow = document.createElement('div');
    angleRow.className = 'readout';
    angleRow.innerHTML = `
      <div class="readout-row">
        <span class="readout-label">${t.labelAngle}</span>
        <span class="readout-value">${state.treeAngles[0]}°</span>
      </div>`;
    wrap.appendChild(angleRow);

    const title = document.createElement('div');
    title.className = 'tree-block-title';
    title.style.marginTop = '10px';
    title.textContent = t.labelBranch;
    wrap.appendChild(title);

    wrap.appendChild(buildBranchGrid(state.branchAssignments[0], t));
  }
}

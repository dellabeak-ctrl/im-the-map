/* ============================================================
   MAIN — entry point. Wires UI events, kicks off first render.
   Importing scene.js (via randomize.js / readout.js) also
   builds the 3D scene and starts the render loop.
   ============================================================ */

import { state } from './state.js';
import { setLanguage } from './language.js';
import { randomizeOrientation, randomizeFruit, resetAll } from './randomize.js';
import { updateReadout } from './readout.js';

document.getElementById('btn-lang').addEventListener('click', () => {
  setLanguage(state.lang === 'en' ? 'fr' : 'en');
});

document.getElementById('btn-orientation').addEventListener('click', randomizeOrientation);
document.getElementById('btn-fruit').addEventListener('click', randomizeFruit);
document.getElementById('btn-reset').addEventListener('click', resetAll);

document.getElementById('chk-independent').addEventListener('change', (e) => {
  state.independent = e.target.checked;
  updateReadout();
});

updateReadout();

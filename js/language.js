/* ============================================================
   LANGUAGE — applies translations to all static UI text
   Exports: setLanguage
   ============================================================ */

import { TRANSLATIONS } from './translations.js';
import { state } from './state.js';
import { updateReadout } from './readout.js';

export function setLanguage(lang){
  state.lang = lang;
  const t = TRANSLATIONS[lang];
  document.documentElement.lang = lang;

  document.getElementById('tab-TheRipeningQuest').textContent = t.tabGame1;
  // Game 2 and 3 tabs — preserve the disabled state, just update text
  const tabs = document.querySelectorAll('.tab[disabled]');
  tabs[0].textContent = t.tabGame2;
  tabs[1].textContent = t.tabGame3;
   
  document.getElementById('title-name').textContent           = t.title;
  document.getElementById('badge-mode').textContent           = t.badge;
  document.getElementById('hint-controls').textContent        = t.hint;
  document.getElementById('h2-orientation').textContent       = t.h2Orientation;
  document.getElementById('label-independent').textContent    = t.labelIndependent;
  document.getElementById('btn-orientation-sub').textContent  = t.btnOrientSub;
  // Update button label text node only (not the sub span)
  document.getElementById('btn-orientation-label').childNodes[0].textContent = t.btnOrientation;
  document.getElementById('h2-fruit').textContent             = t.h2Fruit;
  document.getElementById('btn-fruit-sub').textContent        = t.btnFruitSub;
  document.getElementById('btn-fruit-label').childNodes[0].textContent = t.btnFruit;
  document.getElementById('h2-state').textContent             = t.h2State;
  document.getElementById('btn-reset').textContent            = t.btnReset;
  document.getElementById('footer-text').textContent          = t.footer;
  document.getElementById('btn-lang').textContent             = t.langBtn;

  // Re-render the branch readout in the new language
  updateReadout();
}

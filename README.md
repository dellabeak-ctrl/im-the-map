# Field Randomizer — Zone01 Robotics

A bilingual (EN/FR) interactive 3D field randomizer for Zone01 LEGO robotics competitions. Built with Three.js, served as a single static HTML file via GitHub Pages.

## Live Site

[https://dellabeak-ctrl.github.io/im-the-map/](https://dellabeak-ctrl.github.io/im-the-map/)

---

## What It Does

Referees and judges use this tool to randomize game element placement before each match. Each game has its own tab with independent randomization controls. The 3D viewport is fully interactive — drag to orbit, scroll to zoom, right-drag to pan.

---

## Games

### Game 1 — The Ripening Quest (Orchard)

A 5×3 grid mat with two fixed trees. Randomizes:

- **Tree Orientation** — both trees rotate together (or independently via checkbox) to 0°, 90°, 180°, or 270°
- **Fruit Placement** — 4 fruits per tree placed across 8 branches (4 heights × 2 sides) following these rules:
  - Tree A gets 2 red, 1 yellow, 1 green; Tree B gets 2 yellow, 1 red, 1 green (randomly assigned each round)
  - H4 (top height) always has at least one red or yellow fruit
  - H1 (bottom height) always has exactly one empty branch
  - H2 and H3 are freely assigned

### Game 2 — (Unnamed)

A complex mat with multiple zones. Randomizes:

- **Object Position (B1–B4)** — a double-wide physical object spanning two adjacent diamond positions, placed in B1+B2, B2+B3, or B3+B4
- **Block Placement (B5–B8)** — one red, one green, and one yellow block placed across four positions, leaving one empty

---

## File Structure

```
im-the-map/
├── index.html        ← entire app (HTML + CSS + JS in one file)
├── map.png           ← Game 1 mat image
├── mat2.png          ← Game 2 mat image
├── scene.glb         ← Game 2 double-wide object (GLTF/GLB model)
├── logo.png          ← Zone01 logo (topbar)
├── favicon1.png      ← browser tab favicon
└── qhyts___.ttf      ← custom display font
```

---

## Languages

The full UI switches instantly between English and French via the **FR / EN** toggle in the topbar. All labels, button text, state readouts, and footers are translated.

---

## Running Locally

No build step or server required for basic use — open `index.html` directly in a browser.

> **Note:** Loading local image/model files (`map.png`, `mat2.png`, `scene.glb`) requires a local server due to browser CORS restrictions. Use one of:

```bash
# Python 3
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Tuning B Positions (Game 2)

A coordinate logger is built into the Game 2 scene. Open the browser console (F12), switch to Game 2, and click anywhere on the mat — the world X/Z coordinates print to the console. Use these to update `B_POSITIONS` in `index.html` to align markers with the real mat.

---

## Tech Stack

- [Three.js](https://threejs.org/) r160 — 3D rendering
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) — loading the Game 2 physical object model
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) — interactive camera
- Vanilla JS, HTML, CSS — no framework, no build tool
- GitHub Pages — static hosting

---

## Deployment

Push to the `game2` branch. GitHub Pages serves from that branch at the root. No CI/CD pipeline is needed — Pages deploys directly from branch files.

---

*Built by Del Beacock for Zone01 Robotics — Regionals 2027*

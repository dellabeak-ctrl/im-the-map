//three.js scene - lighting, rendering, mat, all visuals.... 

//DEPENDS ON: constants.js, state.js


import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
/* ---- Renderer & camera ---- */
 
const host = document.getElementById('canvas-host');
 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeceadf);
scene.fog = new THREE.Fog(0xeceadf, 9, 22);
 
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(4.2, 4.0, 5.4);
 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);
 
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.3, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 2.5;
controls.maxDistance = 14;
controls.maxPolarAngle = Math.PI * 0.49;
 
/* ---- Lighting ---- */
 
const hemi = new THREE.HemisphereLight(0xffffff, 0xb8b29a, 0.9);
scene.add(hemi);
 
const sun = new THREE.DirectionalLight(0xfff4e0, 1.15);
sun.position.set(5, 8, 3);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left   = -6;
sun.shadow.camera.right  =  6;
sun.shadow.camera.top    =  6;
sun.shadow.camera.bottom = -6;
sun.shadow.camera.near   =  1;
sun.shadow.camera.far    = 20;
scene.add(sun);
 
const fillLight = new THREE.DirectionalLight(0xdce8ff, 0.35);
fillLight.position.set(-4, 3, -3);
scene.add(fillLight);
 
/* ---- Mat ---- */
 
const matGroup = new THREE.Group();
scene.add(matGroup);
 
const matTexture = new THREE.TextureLoader().load('images/map.png');
matTexture.colorSpace = THREE.SRGBColorSpace;
const matMat = new THREE.MeshStandardMaterial({ map: matTexture, roughness: 0.92 });
const matGeo = new THREE.PlaneGeometry(MAT_W, MAT_D);
const matMesh = new THREE.Mesh(matGeo, matMat);
matMesh.rotation.x = -Math.PI / 2;
matMesh.position.set(0, 0, 0);
matMesh.receiveShadow = true;
matGroup.add(matMesh);
 
/* ---- Helper: world position of a cell's centre ---- */
 
function cellCenter(col, row) {
  return {
    x: originX + col * CELL + CELL / 2,
    z: originZ + row * CELL + CELL / 2
  };
}
 
/* ---- Tree materials ---- */
 
const barkMat   = new THREE.MeshStandardMaterial({ color: 0xb08a5a, roughness: 0.75 });
const baseMat   = new THREE.MeshStandardMaterial({ color: 0xc9a876, roughness: 0.8  });
const branchMat = new THREE.MeshStandardMaterial({ color: 0x8a6a45, roughness: 0.7  });
 
/* ---- Tree storage ---- */
 
// Each entry: { root, pivot, branchSlots: [{ index, tip, sideSign, axisAngle, fruitMesh }] }
const trees = [];
 
function buildTree(col, row) {
  const { x, z } = cellCenter(col, row);
 
  const root = new THREE.Group();
  root.position.set(x, 0, z);
  matGroup.add(root);
 
  // Everything that rotates lives inside this pivot
  const pivot = new THREE.Group();
  root.add(pivot);
 
  // Base block
  const baseSize   = 0.5;
  const baseHeight = 0.15;
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(baseSize, baseHeight, baseSize),
    baseMat
  );
  base.position.y = baseHeight / 2;
  base.castShadow = true;
  base.receiveShadow = true;
  pivot.add(base);
 
  // Dowel
  const dowelHeight = 1.5;
  const dowelRadius = 0.045;
  const dowel = new THREE.Mesh(
    new THREE.CylinderGeometry(dowelRadius, dowelRadius, dowelHeight, 16),
    barkMat
  );
  dowel.position.y = baseHeight + dowelHeight / 2;
  dowel.castShadow = true;
  pivot.add(dowel);
 
  // Branches: 4 heights × 2 sides, alternating axis 90° per height
  const branchSlots = [];
  BRANCH_HEIGHTS.forEach((hOffset, hIdx) => {
    const y = baseHeight + hOffset;
    const axisAngle = (hIdx % 2 === 0) ? 0 : Math.PI / 2; // X-axis / Z-axis alternate
 
    [1, -1].forEach((sideSign, sideIdx) => {
      const dx = Math.cos(axisAngle) * sideSign;
      const dz = Math.sin(axisAngle) * sideSign;
 
      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, BRANCH_LEN, 10),
        branchMat
      );
      branch.rotation.z = Math.PI / 2;
      branch.rotation.y = -axisAngle;
      branch.position.set(dx * BRANCH_LEN / 2, y, dz * BRANCH_LEN / 2);
      branch.castShadow = true;
      pivot.add(branch);
 
      // Tip group — rotated to face outward so fruit hangs correctly
      const tip = new THREE.Group();
      tip.position.set(dx * BRANCH_LEN, y, dz * BRANCH_LEN);
      tip.rotation.y = -axisAngle - (sideSign === 1 ? 0 : Math.PI);
      pivot.add(tip);
 
      branchSlots.push({ index: hIdx * 2 + sideIdx, tip, sideSign, axisAngle, fruitMesh: null });
    });
  });
 
  trees.push({ root, pivot, branchSlots });
}
 
// Build both trees
TREE_CELLS.forEach(c => buildTree(c.col, c.row));
 
/* ---- Fruit ---- */
 
function makeFruitMesh(color) {
  const group = new THREE.Group();
 
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 16, 16),
    new THREE.MeshStandardMaterial({ color: FRUIT_COLORS[color], roughness: 0.55 })
  );
  body.castShadow = true;
  body.position.set(0, -0.13, 0.03);
  group.add(body);
 
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8),
    new THREE.MeshStandardMaterial({ color: 0x5a7a4a, roughness: 0.6 })
  );
  stem.position.set(0, -0.05, 0.01);
  stem.rotation.z = 0.25; // leans left — the "counterclockwise hook" rule
  group.add(stem);
 
  return group;
}
 
/* ---- Apply state to scene ---- */
 
function applyFruitAssignment() {
  trees.forEach(tree => {
    tree.branchSlots.forEach(slot => {
      if (slot.fruitMesh) {
        slot.tip.remove(slot.fruitMesh);
        slot.fruitMesh = null;
      }
      const color = state.branchAssignment[slot.index];
      if (color) {
        const mesh = makeFruitMesh(color);
        slot.tip.add(mesh);
        slot.fruitMesh = mesh;
      }
    });
  });
}
 
function applyTreeAngle() {
  trees.forEach(tree => {
    tree.pivot.rotation.y = THREE.MathUtils.degToRad(state.treeAngle);
  });
}
 
// Apply defaults on load
applyTreeAngle();
applyFruitAssignment();
 
/* ---- Resize & render loop ---- */
 
function resize() {
  const w = host.clientWidth, h = host.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);
resize();
 
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

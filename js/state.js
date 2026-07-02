/* ============================================================
   STATE — single shared mutable object
   All modules import this same object, so mutations are
   visible everywhere. Never reassign `state` itself.
   ============================================================ */

export function defaultBranchAssignment(){
  return new Array(8).fill(null);
}

export const state = {
  lang: 'en',           // 'en' | 'fr'
  independent: false,   // when true, each tree randomizes separately
  treeAngles: [0, 0],   // one entry per tree, each 0/90/180/270
  branchAssignments: [defaultBranchAssignment(), defaultBranchAssignment()]
};

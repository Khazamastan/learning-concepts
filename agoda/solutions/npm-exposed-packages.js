"use strict";

const npmPackageBlueprint = {
  name: "my-library",
  version: "0.0.0-development",
  main: "dist/index.cjs.js",
  module: "dist/index.esm.js",
  types: "dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/index.esm.js",
      require: "./dist/index.cjs.js",
      types: "./dist/index.d.ts",
    },
    "./experimental": {
      import: "./dist/experimental.esm.js",
      require: "./dist/experimental.cjs.js",
    },
    "./package.json": "./package.json",
  },
  files: ["dist", "README.md", "LICENSE"],
};

/**
 * Pick the correct export path for a condition (import/require/types).
 *
 * @param {string} condition
 * @returns {string}
 */
function resolveExport(condition) {
  const entry = npmPackageBlueprint.exports["."];
  const resolved = entry[condition];
  if (!resolved) {
    throw new Error(`No export defined for condition "${condition}"`);
  }
  return resolved;
}

module.exports = { npmPackageBlueprint, resolveExport };

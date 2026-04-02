"use strict";

/**
 * Generate a Module Federation plugin configuration block.
 *
 * @param {object} options
 * @param {string} options.name - container name
 * @param {Record<string, string>} [options.remotes]
 * @param {Record<string, string>} [options.exposes]
 * @param {Record<string, object>} [options.shared]
 * @returns {object}
 */
function createModuleFederationConfig({
  name,
  remotes = {},
  exposes = {},
  shared = {
    react: { singleton: true, requiredVersion: false },
    "react-dom": { singleton: true, requiredVersion: false },
  },
}) {
  if (!name) {
    throw new Error("Module Federation requires a container name");
  }

  return {
    name,
    filename: "remoteEntry.js",
    remotes,
    exposes,
    shared,
  };
}

module.exports = { createModuleFederationConfig };

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const path = require('path');
const pkg = require('../../package.json');

const pathToElectron = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'electron'
);
module.exports = (on, config) => {
  // remove "standard" browsers and use
  // our local Electron as a browser
  config.browsers = [
    {
      name: 'electron',
      family: 'chromium',
      displayName: 'electron',
      version: pkg.version,
      path: pathToElectron,
      // show full package version in the browser dropdown
      majorVersion: `v${pkg.version}`,
      info:
        pkg.description || 'Electron.js app that supports the Cypress launcher'
    }
  ];

  return config;
};

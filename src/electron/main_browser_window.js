const { BrowserWindow } = require('electron');
const _ = require('lodash');

module.exports = (options = {}) => {
  console.log('gotcha');
  _.defaultsDeep(options, {
    width: 960,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });
  let win = new BrowserWindow(options);
  // attach any other event handlers as usual
  return win;
};

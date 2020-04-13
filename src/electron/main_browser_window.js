const { BrowserWindow } = require('electron');
const _ = require('lodash');

module.exports = (options = {}) => {
  _.defaultsDeep(options, {
    width: 200,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  });
  let win = new BrowserWindow(options);
  // attach any other event handlers as usual
  return win;
};

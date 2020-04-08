const path = require('path');
const os = require('os');
const { dialog } = require('electron');

const devToolsLocations = [
  {
    path: `/AppData/Local/Googles/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0`,
    name: 'React Devtools'
  },
  {
    path: `/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0`,
    name: 'Redux Devtools'
  }
];

module.exports = function addDevtools() {
  devToolsLocations.forEach(item => {
    try {
      BrowserWindow.addDevToolsExtension(path.join(os.homedir(), item));
    } catch {
      if (process.env == 'development')
        dialog.showMessageBox(
          item.name,
          `"We were unable to find ${item.name}, please update the package.json file.`
        );
    }
  });
};

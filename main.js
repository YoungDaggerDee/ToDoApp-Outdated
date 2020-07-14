const {
  app,
  BrowserWindow
} = require('electron')

const path = require('path')
require('electron-reload')(__dirname)

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 900,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('Application/Main/main.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  // COMMENT IF STATEMENT UNDER, TO BE ABLE TO RUN THIS APP ON EVERY OS
  // if (process.platform !== 'darwin') app.quit()
})
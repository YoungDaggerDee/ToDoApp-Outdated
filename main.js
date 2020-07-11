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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('Application/main.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
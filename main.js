const { app, BrowserWindow } = require('electron')
let win

function createWindow () {
  win = new BrowserWindow({ width: 600, height: 800, backgroundColor: "#111"})

  win.loadFile('www/index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

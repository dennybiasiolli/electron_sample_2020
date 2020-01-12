const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('www/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function sendStatusToWindow(text, timeout = 20000) {
  win.webContents.send('update-message', {
    body: text,
    timeout,
  })
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (err) => {
  win.webContents.send('asynchronous-reply', err)
  console.log('err')
  sendStatusToWindow('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  sendStatusToWindow(log_message)
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded')
})

// autoUpdate simple example
app.on('ready', () => {
  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 1000)
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)
  setTimeout(() => {
    event.returnValue = 'pong sync'
  }, 1000)
})
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)
  setTimeout(() => {
    event.reply('asynchronous-reply', 'pong async')
  }, 1000)
})
ipcMain.on('test-progress-bar', (event, arg) => {
  let progressVal = 0
  const interval = setInterval(() => {
    progressVal += 1
    win.setProgressBar(progressVal / 100)
    if (progressVal == 100) {
      clearInterval(interval)
      win.setProgressBar(-1)
      event.reply('test-progress-bar-reply')
    }
  }, 100)
})

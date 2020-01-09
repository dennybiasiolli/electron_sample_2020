var dynamicParagraph = document.getElementById('dynamicParagraph');
setTimeout(function () {
  dynamicParagraph.innerHTML = '...it change after 2 seconds!';
}, 2000);

// notifications
const btnNotification = document.getElementById('btnNotification');
btnNotification.onclick = () => {
  let myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
  })
  myNotification.onclick = () => {
    console.log('Notification clicked')
  }
}

// ipc
if (require) {
  const { ipcRenderer } = require('electron')

  const btnIpcSync = document.getElementById('btnIpcSync');
  btnIpcSync.onclick = () => {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping sync'))
  }

  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
  })
  const btnIpcAsync = document.getElementById('btnIpcAsync');
  btnIpcAsync.onclick = () => {
    ipcRenderer.send('asynchronous-message', 'ping async')
  }
}

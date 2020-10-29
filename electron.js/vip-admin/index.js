const path = require('path');
const fs = require('fs');
const {app, BrowserWindow, protocol} = require('electron');

let mainWindow = null;
app.on('ready', () => {
  protocol.interceptStreamProtocol(
    'file', 
    (req, callback) => callback(fs.createReadStream(`${__dirname}/pages/dist/${req.url.substr(8)}`)),
    error => console.error('Failed to register protocol'),
  );
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file:///index.html`);
  // mainWindow.webContents.openDevTools()
});
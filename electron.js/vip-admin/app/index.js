const path = require('path');
const fs = require('fs');
const {app, BrowserWindow, protocol} = require('electron');

let mainWindow = null;
const createWindow = () => {
  protocol.interceptStreamProtocol(
    'file', 
    (req, callback) => callback(fs.createReadStream(`${path.join(__dirname, './/pages/')}/${req.url.substr(8)}`)),
    error => console.error('Failed to register protocol'),
  );
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file:///index.html`);
  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
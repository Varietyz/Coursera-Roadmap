// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'src/data/courses.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 1000,
    icon: path.join(__dirname, 'src/assets/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });


  win.loadFile('src/index.html');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('load-courses', async () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  });

  ipcMain.handle('save-courses', async (event, data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  });
});

app.on('window-all-closed', () => {
  if (process.provider !== 'darwin') app.quit();
});

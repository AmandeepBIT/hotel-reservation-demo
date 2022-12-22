import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import log from 'electron-log';

log.info(`${app.name} ${app.getVersion()}`);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});


// ****************************** IPC MAIN listerners ************************** //

// Get the list of reservation
ipcMain.handle('getReservationList', () => {
  return getFile()
});

// Add new reservation
ipcMain.on('createReservation', async (event: Electron.IpcMainEvent, item) => {
  var fileContent = getFile()
  fileContent.push(item);
  saveFile(fileContent)
  event.returnValue = true
});

// Update reservation 
ipcMain.on('updateReservation', async (event: Electron.IpcMainEvent, item) => {
  const findExist = getFile().find((reservation:any) => reservation.id === item.id)
  if (findExist) {      
    const fileContent = getFile().filter((reservation:any) => reservation.id !== item.id)
    fileContent.push(item)
    saveFile(fileContent)
    event.returnValue = true
  }else{
    event.returnValue = false
  }
});

// Delete reservation
ipcMain.on('deleteReservation', async (event: Electron.IpcMainEvent, item) => {
  const findExist = getFile().find((reservation:any) => reservation.id === item.id)
  if (findExist) {      
    const fileContent = getFile().filter((reservation:any) => reservation.id !== item.id)
    saveFile(fileContent)
    event.returnValue = true
  }else{
    event.returnValue = false
  }
});



// ****************************** FILE METHODS ************************** //

function getFilePath() {
  return __dirname + '/assets/mock/reservation.json'
}

function getFile() {
  return JSON.parse(fs.readFileSync(getFilePath()).toString());
}

function saveFile(fileContent: any) {
  fs.writeFileSync(getFilePath(), JSON.stringify(fileContent));
}
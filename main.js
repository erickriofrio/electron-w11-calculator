const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url                                     = require('url');
const path                                    = require('path');

let window = null;

ipcMain.handle('pickdir', async () => {

	const result = await dialog.showOpenDialog(window, {
		title     : 'Choose Folder',
		properties: ['openDirectory']
	});

	if (result.canceled || result.filePaths.length < 1)
		return undefined;

	return result.filePaths[0];
});

app.once('ready', () => {

	window = new BrowserWindow({
		width         : 405,
		minWidth      : 405,
		height        : 670,
		minHeight     : 530,
		webPreferences: {
			nodeIntegration : true,
			contextIsolation: false,
			enableWebSQL    : false,
      preload         : path.join(__dirname, 'preload.js')
		}
	});
	window.setMenuBarVisibility(false);
	window.loadURL(url.format({ pathname: path.join(__dirname, 'src/index.html'), protocol: 'file:', slashes: true }));
	window.webContents.openDevTools();
	window.once('closed', () => window = null);
});

app.on('window-all-closed', () => app.quit());

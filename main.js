// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, net} = require('electron')
const appMenu = require('./menu')

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 780,
        height: 500,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        minWidth:780,
        minHeight:500,
        maxWidth:780,
        maxHeight:500

    })

    // and load the index.html of the app.
    mainWindow.loadFile('renderer/main.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

appMenu()

ipcMain.on('form-submit', (event, data) => {
    console.log(data)
    getApiCall(event)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const getApiCall = (event) => {
    const { net } = require('electron')
    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'httpbin.org',
        path: '/get',
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            var res = {
                status: true,
                message: "Form Submit Success"
            }
            event.sender.send('form-submit-success', res)
        });
    });
    request.on('finish', () => {
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', (error) => {
        console.log('Last Transaction has occurred')
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
}
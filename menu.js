const {Menu, shell} = require('electron')

module.exports = appWin => {
    let template = [
        {
            label: "Stock",
            click: ()=>{
                alert('Stock')
            }
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn more',
                    click: ()=>{
                        shell.openExternal('https://github.com/manjurulhasan/vicafe-stock')
                    }
                }
            ]
        }
    ]

    // create menu for mac
    if(process.platform === 'darwin' ) template.unshift({role: 'appMenu'})

    //Build menu
    let menu = Menu.buildFromTemplate(template)

    // Set the main app menu
    Menu.setApplicationMenu(menu)
}
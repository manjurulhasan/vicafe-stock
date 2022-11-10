const {ipcRenderer} = require('electron')
let ean = document.getElementById('ean'),
    quantity = document.getElementById('quantity'),
    submit = document.getElementById('submit'),
    formsection = document.getElementById('form-section')

ean.focus();

submit.addEventListener('click', e => {
    toggleButton()
    if(ean.value && quantity.value){
        var data = {
            ean: ean.value,
            quantity:quantity.value
        }
        ipcRenderer.send('form-submit', data)
    }
})

quantity.addEventListener('keyup', e =>{
    if(e.key === 'Enter') submit.click()
})

const toggleButton = () => {
    if(submit.disabled === true){
        submit.disabled = false
        submit.style.opacity = 1
        submit.innerText = 'Submit'
    }else{
        submit.disabled = true
        submit.style.opacity = 0.5
        submit.innerText = 'Request Processing....'
    }
}

const hideDisplay = () => {
    formsection.style.display = 'none';
}

const showDisplay = () => {
    formsection.style.display = 'block';
}


const postApiCall = () => {
    var body = JSON.stringify({key: 1})
    const request = net.request({
        method: 'POST',
        protocol: 'http:',
        path: '/',
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
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
    request.write(body, 'utf-8');
    request.end();
}

ipcRenderer.on('form-submit-success', (e,res) => {
    toggleButton()
    if(res){
        if(res.status === true){
            console.log(res.message)
        }
    }
})

// document.addEventListener('keydown', e => {
//     const notAllowedChars = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 44, 19, 145, 45, 36, 33, 34, 35, 46, 144, 91, 16, 9, 20, 17, 18, 93, 8, 37, 39, 38, 40];
//     if(e.keyCode === 13){
//         e.preventDefault();
//     }
//
//     //check if user pressed any functional key
//     if (notAllowedChars.includes(e.keyCode)) {
//     // if (notAllowedChars.indexOf(e.keyCode) > 0) {
//         console.log('not allowed');
//         return;
//     }else{
//         if(e.keyCode !== 13){
//             ean.value = ''
//             var key = e.key
//             ean.value = key
//         }
//         showDisplay()
//         console.log(e.key)
//         console.log(ean.value)
//     }
// })
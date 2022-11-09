const {ipcRenderer} = require('electron')
let ean = document.getElementById('ean'),
    quantity = document.getElementById('quantity'),
    submit = document.getElementById('submit')

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
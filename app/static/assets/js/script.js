function toggleSection(sectionId) {
    // Esconder todos os sections
    document.getElementById('facial-section').classList.add('hidden');
    document.getElementById('document-section').classList.add('hidden');

    // Mostrar o section específico
    document.getElementById(sectionId).classList.remove('hidden');
    //console.error('error');
}
function getExtension(url) {
    // Verifica se a URL contém dados em base64
    if (url.indexOf(";base64,") !== -1) {
        // Extrai a parte da string que contém a extensão
        const extensionPart = url.substring(url.indexOf("/") + 1, url.indexOf(";base64"));

        // Retorna a extensão convertida para minúsculas
        return extensionPart.toLowerCase();
    } else {
        // Se a URL não contiver dados em base64, tenta extrair a extensão diretamente
        const parts = url.split('.');
        const extension = parts.pop().toLowerCase();
        return extension;
    }
}

async function submitForm(formId, btn) {
    let path = '.uploaded-image';
    let endpoint = 'api/pf-facial';

    removeError();

    //console.log(btn);
    btn.disabled = true;

    let images = [document.querySelector(path)];
    //console.log(images);

    let url = 'http://localhost:5000';  // Adapte para a sua URL
    let inputValue;
    let name = 'contract-number';
    let href = 'resultado';

    if (formId === 'document-form') {
        name += '-doc';
        href += '-doc';
        endpoint = 'api/pf-facial-cdv';
        images = Array.from(document.querySelectorAll(path)).slice(1);
    }

    inputValue = document.getElementById(name).value;

    // Mapear imagens para objetos contendo a extensão e o conteúdo da imagem
    let imageObjects = [];
    for (i = 0; i < images.length; i++) { 
        //console.log(images[i]);
        let id = images[i].name;
        //console.log(id);
        let imageSrc = images[i].src;
        ext = getExtension(imageSrc);
        imageObjects.push({ id:id, src: imageSrc, extension: ext });
        //console.log(imageSrc);
    }
    console.log(imageObjects);
    
    let formData = {
        'contrato': inputValue,
        images: imageObjects
    };

    try {
        let response = await postData(`${url}/${endpoint}`, formData);

        console.log(response);

        if (response === false) {
            setError(inputValue);
        } if (response.status_code >= 200 && response.status_code < 300) {
            window.location.href = `${href}`;
            let responseString = JSON.stringify(response);
            localStorage.clear();
            localStorage.setItem('dados', responseString);
        }  else {
            setError(inputValue, response.error_message.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}




async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
    } else {
        throw new Error(`HTTP error! status: ${response.status}! Error: ${JSON.stringify(response)};
        `);
    }
}

function getImageBase64(imageElement) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
    //return canvas.toDataURL('image/png'); // Retorna o conteúdo da imagem como base64
    return imageElement


}

function setError(number, text = false) {
    // pegar o container
    let container = document.querySelector('.container');

    // criar o elemento div
    let div = document.createElement('div');

    // definir o id do novo elemento
    div.setAttribute('id', 'alert-message');

    // adicionar o conteúdo
    
    if (text == false) {
        text =  `O contrato número ${number} não foi encontrado no banco de dados.<br>Verifique o número e tente novamente.`;
    }
    div.innerHTML = `Erro: ${text}`;
    // adicionar o novo elemento ao container
    container.appendChild(div);
}

function removeError() {

    // pegar a div de alerta de erro
    let errorDiv = document.getElementById('alert-message');

    let btns = document.querySelectorAll('.btn');

    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
    }
    // verificar se a div existe
    if (errorDiv) {
        // remover a div
        errorDiv.remove();
    }
}



let input = document.querySelector('#contract-number');
let input2 = document.querySelector('#contract-number-doc');

input.addEventListener('keydown', removeError);
input2.addEventListener('keydown', removeError);
function toggleSection(sectionId) {
    // Esconder todos os sections
    document.getElementById('facial-section').classList.add('hidden');
    document.getElementById('document-section').classList.add('hidden');

    // Mostrar o section específico
    document.getElementById(sectionId).classList.remove('hidden');
    //console.error('error');
}
async function submitForm(formId, btn) {
    
    removeError();
    
    console.log(btn);
    btn.disabled = true;


    let url = 'http://localhost:5000';
    let inputValue;
    let name = 'contract-number';
    let href = 'resultado';

    if (formId === 'document-section') {
        name += '-doc';
        href += '-doc';
    }

    inputValue = document.getElementById(name).value;
    console.log(inputValue);
    console.log(name);



    try {
        let response = await postData(`${url}/api/pf-facial`, { contrato: inputValue });
        console.log(response);

        if (response === false) {
            setError(inputValue);
        }
        else {
            window.location.href = `${href}`;
            localStorage.setItem('dados', response);
        }


        // Redirecionar para a página de resultados
        // window.location.href = 'resultado.html';
    } catch (error) {
        console.error('Error:', response);
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}


function setError(number) {
    // pegar o container
    let container = document.querySelector('.container');

    // criar o elemento div
    let div = document.createElement('div');

    // definir o id do novo elemento
    div.setAttribute('id', 'alert-message');

    // adicionar o conteúdo
    div.innerHTML = `O contrato número ${number} não foi encontrado no banco de dados.<br>Verifique o número e tente novamente.`;

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

// Funções para abrir e fechar o modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'hidden';
}


//document.querySelector("#facial-option").click()


let input = document.querySelector('#contract-number');
let input2 = document.querySelector('#contract-number-doc');

input.addEventListener('keydown', removeError);
input2.addEventListener('keydown', removeError);
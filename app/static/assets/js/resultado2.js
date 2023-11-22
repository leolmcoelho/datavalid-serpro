let data = {
    "informações gerais": {
        "cpf_disponivel": true,
        "nome": true,
        "nome_similaridade": 1,
        "data_nascimento": true,
        "situacao_cpf": true,
        "sexo": true,
        "nacionalidade": true,
        "cnh_disponivel": true,

    },


    "cnh": {
        "nome": true,
        "nome_similaridade": 1,
        "numero_registro": true,
        "categoria": true,
        "codigo_situacao": true,
        "data_ultima_emissao": true,
        "data_primeira_habilitacao": true,
        "data_validade": true,
        "possui_impedimento": false,
        "observacoes": false,
        "observacoes_similaridade": 0
    },
    "filiacao": {
        "nome_mae": true,
        "nome_mae_similaridade": 1,
        "nome_pai": true,
        "nome_pai_similaridade": 1
    },
    "documento": {
        "tipo": true,
        "numero": true,
        "numero_similaridade": 1,
        "orgao_expedidor": true,
        "uf_expedidor": true
    },
    "endereco": {
        "logradouro": true,
        "logradouro_similaridade": 1,
        "numero": true,
        "numero_similaridade": 1,
        "bairro": true,
        "bairro_similaridade": 1,
        "cep": true,
        "municipio": true,
        "municipio_similaridade": 0.9,
        "uf": true
    },
    "biometria_face": {
        "disponivel": true,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }
};

// Função para converter JSON em HTML
// Função para converter JSON em HTML
function convertToHTML(data) {
    let html = '<div class="items-container">';

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'object') {
                // Se o valor é um objeto, chama recursivamente a função
                html += `<div class="container-item ${key}"><h3>${key.toUpperCase()}</h3> ${convertToHTML(data[key])}</div>`;
            } else {
                let value = data[key] === true ? '<i class="fas fa-check"></i>' :
                    data[key] === false ? '<i class="fas fa-times"></i>' : data[key];

                let class_name = data[key] ? 'green' : 'red';

                if (typeof data[key] === 'number' && data[key] === 1) {
                    continue;
                }

                // Agrupa os itens que não estão em objetos dentro do mesmo card
                html += `<div class="common-items">
                            <div class="item ${key}">
                                <div class="name">${key.replace(/_/g, ' ')}: </div>
                                <div class="value ${class_name}">${value}</div>
                            </div>
                         </div>`;
            }
        }
    }

    html += '</div>';
    return html;
}


// Obtém o elemento de saída e adiciona o HTML gerado


// Obtém o elemento de saída e adiciona o HTML gerado
var outputElement = document.getElementById('output');
outputElement.innerHTML += convertToHTML(data);

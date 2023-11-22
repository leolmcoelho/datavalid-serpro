// resultado.js

// Seu JSON data
let resultado = {
    "documento": "CNH",
    "cnh": {
        "numero_registro": true,
        "numero_registro_ocr": "987654321",
        "nome": true,
        "nome_similaridade": 1,
        "nome_ocr": "MANUELA ELISA DA MOTA",
        "identidade": true,
        "identidade_similaridade": 1,
        "identidade_ocr": "123456789 SSP SP",
        "data_nascimento": true,
        "data_nascimento_ocr": "1975-06-04",
        "data_primeira_habilitacao": true,
        "data_primeira_habilitacao_ocr": "2000-04-03",
        "data_ultima_emissao": true,
        "data_ultima_emissao_ocr": "2020-04-03",
        "data_validade": true,
        "data_validade_ocr": "2025-04-03",
        
    },
    "retrato": {
        "disponivel": true,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9956858549207501
    },
    "biometria_face": {
        "disponivel": true,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }
}

// Função para formatar os nomes
function formatarNome(nome) {
    // Lógica para formatar o nome como desejado
    // Neste exemplo, apenas a primeira letra é maiúscula
    return nome.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

// Função para criar um item de acordeão
function createAccordionItem(title, content) {
    var accordionItem = document.createElement('div');
    accordionItem.className = 'card';

    var accordionHeader = document.createElement('div');
    accordionHeader.className = 'card-header d-flex justify-content-between align-items-center';
    accordionHeader.innerHTML = `<h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${title}" aria-expanded="false">
            ${formatarNome(title)}
        </button>
        
    </h2><i class="fas fa-chevron-down rotate-icon"></i>`;

    var accordionContent = document.createElement('div');
    accordionContent.id = title;
    accordionContent.className = 'collapse';
    accordionContent.setAttribute('aria-labelledby', title);
    accordionContent.setAttribute('data-parent', '#accordion');

    var accordionCardBody = document.createElement('div');
    accordionCardBody.className = 'card-body';

    var nestedList = document.createElement('ul');
    nestedList.className = 'list-group list-group-flush';

    var nestedItems = createListItems(content);
    nestedItems.forEach(function (nestedItem) {
        nestedList.appendChild(nestedItem);
    });

    accordionCardBody.appendChild(nestedList);
    accordionContent.appendChild(accordionCardBody);

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);

    // Adicionar um evento de clique para o item do acordeão
    accordionItem.addEventListener('click', function () {
        var collapse = accordionItem.querySelector('.collapse');

        var icon = accordionItem.querySelector('.rotate-icon');
        console.log(collapse);

        $(collapse).collapse('toggle');

        icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    return accordionItem;
}

// Função para criar itens de lista para objetos aninhados
function createListItems(data) {
    var listItems = [];

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var listItem;

            if (typeof data[key] === 'object') {
                // Se o valor for um objeto, crie um item de lista aninhado
                listItem = createAccordionItem(key, data[key]);
            } else {
                // Se o valor não for um objeto, exiba-o como uma string
                listItem = createListItem(key, data[key]);
            }

            listItems.push(listItem);
        }
    }

    return listItems;
}

// Função para criar um item de lista
function createListItem(property, value) {
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    // Use a função formatarNome para formatar o nome
    var formattedProperty = formatarNome(property);

    // Se o valor não for um objeto, exiba-o como uma string
    if (value === false) {
        listItem.innerHTML = `<strong>${formattedProperty}:</strong> ${value === false ? 'Não' : value}`;
    } else if (typeof value === 'object') {
        // Se o valor for um objeto, crie um item de lista aninhado
        var nestedList = document.createElement('ul');
        nestedList.className = 'list-group list-group-flush';
        var nestedItems = createListItems(value);
        nestedItems.forEach(function (nestedItem) {
            nestedList.appendChild(nestedItem);
        });
        listItem.innerHTML = `<strong>${formattedProperty}:</strong>`;
        listItem.appendChild(nestedList);
    } else {
        listItem.innerHTML = `<strong>${formattedProperty}:</strong> ${value === true ? '<i class="fas fa-check"></i>' : value}`;
    }

    return listItem;
}

var appElement = document.getElementById('app');

// Criar e anexar o acordeão
var accordion = document.createElement('div');
accordion.id = 'accordion';

// Criar itens de acordeão para o JSON fornecido
var accordionItems = createListItems(resultado);
accordionItems.forEach(function (accordionItem) {
    accordion.appendChild(accordionItem);
});

appElement.appendChild(accordion);

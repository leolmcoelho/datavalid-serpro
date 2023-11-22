// resultado.js

// Seu JSON data
let resultado = {
    "gerais": {
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
        "municipio_similaridade": 1,
        "uf": true
    },
    "biometria_face": {
        "disponivel": true,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }
};
let resultado2 = {

    "cpf_disponivel": true,
    "nome": true,
    "nome_similaridade": 1,
    "data_nascimento": true,
    "situacao_cpf": true,
    "sexo": true,
    "nacionalidade": true,
    "cnh_disponivel": true,


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
        "municipio_similaridade": 1,
        "uf": true
    },
    "biometria_face": {
        "disponivel": true,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }
};
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
    accordionContent.className = 'collapse show';
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

    // If the value is not an object, display it as a string
    if (value === false) {
        listItem.innerHTML = `<strong>${formattedProperty}:</strong> ${value === false ? 'Não' : value}`;
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



// Função para criar uma tabela HTML a partir de um objeto
function createHtmlTable(obj) {
    let htmlTable = '<table class="table table-bordered">';

    for (let key in obj) {
        const value = typeof obj[key] === 'object' ? createHtmlTable(obj[key]) : obj[key];

        htmlTable += `<tr>
                        <th scope="row">${key}</th>
                        <td>${value}</td>
                      </tr>`;
    }

    htmlTable += '</table>';

    return htmlTable;
}

// cria e configura um novo botão
let printButton = document.createElement('button');
printButton.innerHTML = 'Imprimir dados';
printButton.className = 'btn btn-primary'; // adiciona classes bootstrap para dar estilo ao botão

printButton.addEventListener('click', function () {
    // converte o objeto para uma tabela HTML
    let contentToPrint = createHtmlTable(resultado);

    // cria uma nova janela e a preenche com os dados
    let printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
            <head>
                <title>Print</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            </head>
            <body>
                ${contentToPrint} 
                <button onclick="window.print()" class="btn btn-primary">Print Content</button>
            </body>
        </html>`);
    printWindow.document.close();

}, false);


/*
// adiciona o botão criado ao corpo do documento
document.body.appendChild(printButton);

let cards = document.querySelectorAll('ul');
let allContent = "";

cards.forEach((card) => {
    allContent += card.innerHTML;
         
    console.log(card.innerHTML);
});

// Cria uma nova janela popup

setTimeout(() => { 


    let printWindow = window.open('', '_blank');

    // Faz o popup escrever o conteúdo e abrir a janela de impressão
    printWindow.document.write(allContent);
    printWindow.document.close();
    //printWindow.print(); // imprime na console
} , 1500)*/

document.body.appendChild(printButton);

let cards = document.querySelectorAll('li');
let allContent = "<script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js'></script><table style='width:70%; border: 1px solid black;'>";


allContent += "<td><strong>" + document.querySelector('h2').innerHTML + "</strong></td>";

cards.forEach((card) => {
    allContent += "<tr>";

    let cardItems = card.querySelectorAll('li');
    console.log(card.children[0] ? card.children[0].textContent : 'N/A');
    allContent += "<td>" + card.innerHTML + "</td>";
   
    allContent += "</tr>";
    console.log(card.innerHTML);
});
allContent += "</table>";

setTimeout(() => {
    let printWindow = window.open('', '_blank');

    // Faz o popup escrever o conteúdo e abrir a janela de impressão
    printWindow.document.write(allContent);
    printWindow.document.close();
    //printWindow.print();
}, 1000)
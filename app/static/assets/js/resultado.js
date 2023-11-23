

var appElement = document.getElementById('app');

// Criar e anexar o acordeão
var accordion = document.createElement('div');
accordion.id = 'accordion';

// Criar itens de acordeão para o JSON fornecido

let dadosString = localStorage.getItem('dados');

if (dadosString) {
    // Converta a string JSON de volta para um objeto JavaScript
    var dadosObj = JSON.parse(dadosString);
    setContract(dadosObj.contrato);

    delete dadosObj.contrato;

    let accordionItems = createListItems(dadosObj);

    accordionItems.forEach(function (accordionItem) {

        accordion.appendChild(accordionItem);
    });

    appElement.appendChild(accordion);

    var listaElement = document.getElementById('lista');
    try {
        accordionItems.forEach(item => {
            listaElement.appendChild(item);
        });
    } catch (error) {
        console.error('Ocorreu um erro ao adicionar os itens à lista:', error);
    }

} else {
    console.error('Não há dados no localStorage');
}



// Função para criar uma tabela HTML a partir de um objeto


let printButton = document.querySelector('.btn');
printButton.addEventListener('click', function () {
    console.log('CLIQUE');
    
    let accordions = document.querySelectorAll('.collapse');

    for (let i = 0; i < accordions.length; i++) {
        accordions[i].classList.remove('show');
    }
    // converte o objeto para uma tabela HTML
    let contentToPrint = createHtmlTable(dadosObj);

    // cria uma nova folha de estilo para impressão
    let printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            body * {
                visibility: hidden;
            }
            #contentToPrint, #contentToPrint * {
                visibility: visible;
            }
            #contentToPrint {
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    `;

    // adiciona a folha de estilo à página
    document.head.appendChild(printStyles);

    let data = createPDF();
    // cria um contêiner para o conteúdo a ser impresso
    let printContainer = document.createElement('div');
    printContainer.id = 'contentToPrint';
    printContainer.innerHTML = data;

    // adiciona o contêiner ao corpo do documento
    document.body.appendChild(printContainer);

    // chama o método print
    window.print();

    // remove a folha de estilo e o contêiner após a impressão
    printStyles.remove();
    printContainer.remove();
    
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].classList.add('show');
    }
});
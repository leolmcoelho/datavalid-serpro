var appElement = document.getElementById('app');
var accordion = document.createElement('div');
accordion.id = 'accordion';

let dadosString = localStorage.getItem('dados');
let dadosObj = JSON.parse(dadosString);


if (dadosString) {
    // Converta a string JSON de volta para um objeto JavaScript
    
    setContract(dadosObj.contrato);

    delete dadosObj.contrato;
    delete dadosObj.documento;

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


let printButton = document.querySelector('.btn');
printButton.addEventListener('click', function () {
    console.log('CLIQUE');

    /*

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
   

    // remove a folha de estilo e o contêiner após a impressão
    printStyles.remove();
    printContainer.remove(); 
    */
    window.print();
});
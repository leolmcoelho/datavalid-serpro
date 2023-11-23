function toggleSection(sectionId) {
    // Esconder todos os sections
    document.getElementById('facial-section').classList.add('hidden');
    document.getElementById('document-section').classList.add('hidden');

    // Mostrar o section específico
    document.getElementById(sectionId).classList.remove('hidden');
    
}

//declarar os metodos (função) de carregamento aqui

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
  }
  
function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}
  
function formatarNome(nome) {
  // Lógica para formatar o nome como desejado
  // Neste exemplo, apenas a primeira letra é maiúscula
  return nome.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function setContract(number) {
  let html = document.querySelector('h2');
  html.innerHTML += number;

  document.title = html.innerHTML + ' - Consorcio Tradição';

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

  //console.log(data);
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
  //console.log(listItems);
  return listItems.reverse();
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


function createPDF() {


  let cards = document.querySelectorAll('li');
  let allContent = `<script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js'></script>
                        <table style='width:100%;  display:flex;'>
                        <tbody style='border: 1px solid black; display:flex; flex-direction: column;'>`;


  allContent += "<td><strong>" + document.querySelector('h2').innerHTML + "</strong></td>";

  cards.forEach((card) => {
    allContent += "<tr>";

    let cardItems = card.querySelectorAll('li');
    //console.log(card.children[0] ? card.children[0].textContent : 'N/A');
    allContent += "<td style='padding: 5px; '>" + card.innerHTML + "</td>";

    allContent += "</tr>";
    //console.log(card.innerHTML);
  });
  allContent += "</tbody></table>";

  return allContent
}


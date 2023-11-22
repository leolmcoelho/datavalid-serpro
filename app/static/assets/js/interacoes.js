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
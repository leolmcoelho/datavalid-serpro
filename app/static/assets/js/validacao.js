/*function submitForm(formId) {
    // Aqui você pode adicionar lógica para processar o formulário antes de enviar
    // Se a lógica de validação passar, então continue
    //if (validacaoPassou()) {
    if (true) {
        setInterval(() => {
            hideLoading();
        }, 2000);
        // Oculte o carregamento apenas após a validação
        alert('Formulário enviado com sucesso!');
        carregarDados();
    }
}

// Chamar função de carregamento aqui


document.getElementById('button-enviar-facial').addEventListener('click', function () {
    submitForm('facial-form');
});

document.getElementById('button-enviar-document').addEventListener('click', function () {
    submitForm('document-form');
});

*/
let resultado = {
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


function carregarDados(resultado) {
    if (resultado.biometria_face.disponivel) {
        let result = document.querySelector('.resultados');
        result.innerHTML = `Probabilidade: ${resultado.biometria_face.probabilidade}`;
        console.log(resultado.biometria_face.probabilidade);
    } else {
        console.log('Biometria não disponível');
    }
}

/*function carregarDados(numeroContrato) {
    // Simula uma requisição ao backend usando o método Fetch
    fetch(`URL_DO_SEU_BACKEND?numeroContrato=${numeroContrato}`)
        .then(response => response.json())
        .then(resultado => {
            if (resultado.biometria_face.disponivel) {
                let result = document.querySelector('.resultados');
                result.innerHTML = `Probabilidade: ${resultado.biometria_face.probabilidade}`;
                console.log(resultado.biometria_face.probabilidade);
            } else {
                console.log('Biometria não disponível');
            }
        })
        .catch(error => console.error('Erro ao obter dados do backend:', error));
}

// Adiciona um listener para detectar mudanças no campo do número do contrato
document.getElementById('numeroContrato').addEventListener('input', function() {
    let numeroContrato = this.value;
    carregarDados(numeroContrato);
})*/

// Chama a função ao carregar a página
carregarDados();
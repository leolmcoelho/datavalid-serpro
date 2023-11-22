 function toggleSection(sectionId) {
        // Esconder todos os sections
        document.getElementById('facial-section').classList.add('hidden');
        document.getElementById('document-section').classList.add('hidden');

        // Mostrar o section específico
     document.getElementById(sectionId).classList.remove('hidden');
     console.error('error');
    }

function submitForm(formId) {
    // Aqui você pode adicionar lógica para processar o formulário antes de enviar
    alert('Formulário enviado com sucesso!');
    carregarDados();
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

$(document).ready(function () {
    var facialPhotoInput = document.getElementById('facial-photo');

    $(facialPhotoInput).change(function () {
        var input = this;
        var reader = new FileReader();

        reader.onload = function (e) {
            var facialOriginalImage = document.getElementById('facial-original-image');
            var facialCroppedImagePopup = document.getElementById('facial-cropped-image-popup');

            facialOriginalImage.src = e.target.result;

            $(facialOriginalImage).cropper({
                aspectRatio: 1.5,
                viewMode: 1,
                minCropBoxWidth: 50,
                minCropBoxHeight: 50,
                ready: function () {
                    $(facialOriginalImage).cropper('getCroppedCanvas').toBlob(function (blob) {
                        var url = URL.createObjectURL(blob);
                        facialCroppedImagePopup.src = url;
                        openModal('facial-crop-popup');
                    });
                }
            });
        };

        reader.readAsDataURL(input.files[0]);
    });

    var documentPhotoInput = document.getElementById('document-photo');

    $(documentPhotoInput).change(function () {
        var input = this;
        var reader = new FileReader();

        reader.onload = function (e) {
            var documentOriginalImage = document.getElementById('document-original-image');
            var documentCroppedImagePopup = document.getElementById('document-cropped-image-popup');

            documentOriginalImage.src = e.target.result;

            $(documentOriginalImage).cropper({
                aspectRatio: 1,
                viewMode: 1,
                minCropBoxWidth: 50,
                minCropBoxHeight: 50,
                ready: function () {
                    $(documentOriginalImage).cropper('getCroppedCanvas').toBlob(function (blob) {
                        var url = URL.createObjectURL(blob);
                        documentCroppedImagePopup.src = url;
                        openModal('document-crop-popup');
                    });
                }
            });
        };

        reader.readAsDataURL(input.files[0]);
    });
});


//document.querySelector("#facial-option").click()


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

function carregarDados(){
    if (resultado.biometria_face.disponivel) {
        let result = document.querySelector('.resultados');
        result.innerHTML = resultado.biometria_face.probabilidade;
        console.log(resultado.biometria_face.probabilidade);
    } else {
        console.log('nao esta disponivel');
    }

}

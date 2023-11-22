function toggleSection(sectionId) {
    // Esconder todos os sections
    document.getElementById('facial-section').classList.add('hidden');
    document.getElementById('document-section').classList.add('hidden');

    // Mostrar o section específico
    document.getElementById(sectionId).classList.remove('hidden');
}

function submitForm(formId) {
// Aqui você pode adicionar lógica para processar o formulário antes de enviar
alert('Formulário enviado com sucesso!');
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
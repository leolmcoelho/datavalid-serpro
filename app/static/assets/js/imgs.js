/*
// Funções para abrir e fechar o modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'hidden';
}

// Função para processar a imagem
function processImage(input, originalImageId, croppedImagePopupId, aspectRatio) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var originalImage = document.getElementById(originalImageId);
        var croppedImagePopup = document.getElementById(croppedImagePopupId);

        originalImage.src = e.target.result;

        $(originalImage).cropper({
            aspectRatio: aspectRatio,
            viewMode: 1,
            minCropBoxWidth: 50,
            minCropBoxHeight: 50,
            ready: function () {
                $(originalImage).cropper('getCroppedCanvas').toBlob(function (blob) {
                    var url = URL.createObjectURL(blob);
                    croppedImagePopup.src = url;
                    openModal(croppedImagePopupId);
                });
            }
        });
    };

    reader.readAsDataURL(input.files[0]);
}

$(document).ready(function () {
    var facialPhotoInput = document.getElementById('facial-photo');
    var documentPhotoInput = document.getElementById('document-photo');

    $(facialPhotoInput).change(function () {
        processImage(this, 'facial-original-image', 'facial-cropped-image-popup', 1.5);
    });

    $(documentPhotoInput).change(function () {
        processImage(this, 'document-original-image', 'document-cropped-image-popup', 1);
    });
});*/


function showImageProfile() {
    console.log('Image');
    var input = document.getElementById('facial-photo');
    var imageContainer = document.getElementById('image-container');
    var uploadedImage = document.getElementById('uploaded-image');

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);

    imageContainer.style.display = 'flex';
}

function openFileInputProfile() {
    document.getElementById('facial-photo').click();
}


function openFileInput(index) {
    document.getElementById(`file-input-${index}`).click();
    console.log('openFileInput');
    console.log(index);
}

function showImage(index) {
    console.log(index);
    let input = document.getElementById(`file-input-${index}`);
    let parentContainer = input.parentNode;
    let uploadText = parentContainer.querySelector(`.upload-text`);
    let uploadedImage = document.getElementById(`uploaded-image-${index}`);

    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        uploadedImage.style.visibility = 'visible';
        uploadedImage.src = e.target.result;
        uploadText.style.display = 'none';
    };

    reader.readAsDataURL(file);
}

// Função para exibir a imagem carregada
function showImageProfile() {
    var input = document.getElementById('facial-photo');
    var uploadedImage = document.getElementById('uploaded-image');
    var uploadText = document.getElementById('upload-text');

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        uploadedImage.src = e.target.result;

        if (file) {
            uploadText.style.display = 'none';
        } else {
            uploadText.style.display = 'block';
        }
    };

    reader.readAsDataURL(file);
}

// Event listener para o input de arquivo
document.getElementById('file-input-1').addEventListener('change', showImage);


document.querySelectorAll('.image-container').forEach(function (container, index) {
    console.log(container);
    container.addEventListener('click', function () {
        openFileInput(index + 1);
    });

    var fileInput = container.querySelector('.file-input');
    fileInput.addEventListener('change', function () {
        showImage(index + 1);
        this.value = null;
    });
});


let img_input = document.querySelector('#facial-photo');
let img_container = document.querySelector('#image-container');

//document.getElementById('facial-photo').addEventListener('change', showImageProfile);

//img_input.addEventListener('change', showImageProfile);
//img_container.addEventListener('click', openFileInputProfile);
$(document).ready(function () {

  const $uploadBtn = $('#upload-btn');
  const $fileInput = $('#file-input');

  let fileToUpload = '';

  $fileInput.on('change', (e) => {
    fileToUpload = e.target.files[0];
  });

  $uploadBtn.on('click', function (e) {
    if (fileToUpload) {
      $fileInput.val('');
      uploadFile(fileToUpload);
    }
  });

});

// ---------- AJAX -----------

const baseURL = 'http://localhost:3000';

// -- UPLOAD DATA TO BE CONVERTED
const uploadFile = (file, successCallback = () => { }, errorCallback = () => { }) => {
  let formData = new FormData();
  formData.append('input_json', file);

  $.AJAX({
    url: baseURL + '/upload_csv',
    type: 'POST',
    contentType: 'multipart/form-data',
    data: formData,
    dataType: 'csv',
    success: successCallback,
    error: errorCallback
  });
};

const downloadFile = (successCallback = () => { }, errorCallback = () => { }) => {
  $.AJAX({
    url: baseURL + '/download_csv',
    type: 'GET',
    success: successCallback,
    error: errorCallback
  });
};


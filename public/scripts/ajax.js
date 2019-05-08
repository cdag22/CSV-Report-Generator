
// ---------- AJAX -----------

const baseURL = 'http://localhost:3000';

// -- UPLOAD DATA TO BE CONVERTED
const uploadFile = (file, successCallback = () => { }, errorCallback = () => { }) => {
  new Response(file).json()
    .then(data => {
      $.ajax({
        url: baseURL + '/upload_csv',
        type: 'POST',
        success: successCallback,
        data: JSON.stringify(data),
        contentType: 'application/json'
      });
    })
    .catch(error => console.error(error));
};


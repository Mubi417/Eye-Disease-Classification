function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
        $('.image-title').html(input.files[0].name);
        $('#class').text('Loading...')
        $('#confidence').text('Loading...')

        var formData = new FormData();
        formData.append("file", input.files[0]);
        axios({
          method: 'post',
          url: 'http://localhost:8000/predict',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            $('#class').text(response.data.class)
            // $('#confidence').text(`${Math.round((response.data.confidence * 100 + Number.EPSILON) * 100) / 100} %`)
            $('#confidence').text(`${(response.data.confidence * 100).toFixed(2)} %`)
          })
          .catch(function (response) {
            console.log(response);
          });

        $('.classify').show();
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
}
  
function removeUpload() {
$('.file-upload-input').replaceWith($('.file-upload-input').clone());
$('.file-upload-content').hide();
$('.image-upload-wrap').show();
$('.classify').hide();
}
$('.image-upload-wrap').bind('dragover', function () {
        $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
        $('.image-upload-wrap').removeClass('image-dropping');
});
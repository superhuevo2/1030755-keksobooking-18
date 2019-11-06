'use strict';
(function () {
  var EXTENSION = ['jpg', 'jpeg', 'png', 'gif'];

  var loadPhoto = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = EXTENSION.some(function (el) {
        return fileName.endsWith(el);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (preview.tagName.toLowerCase() === 'img') {
            preview.src = reader.result;
          } else if (preview.tagName.toLowerCase() === 'div') {
            var link = 'url(' + reader.result + ')';
            preview.style.backgroundImage = link;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var resetPhoto = function () {
    avatarPreview.setAttribute('src', 'img/muffin-grey.svg');
    photoPreview.removeAttribute('style');
  };

  var avatarChooser = document.querySelector('.ad-form__field input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  loadPhoto(avatarChooser, avatarPreview);

  var photoChooser = document.querySelector('.ad-form__upload input');
  var photoPreview = document.querySelector('.ad-form__photo');

  loadPhoto(photoChooser, photoPreview);

  window.photo = {
    resetPhoto: resetPhoto
  };
})();

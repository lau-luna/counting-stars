 function loadImages() {
      let imagesContainer = document.getElementsByClassName('images')[0];

      links.forEach((link, index) => {
        let img = document.createElement('img');
        img.src = link;
        img.alt = '';
        img.className = 'image';

        img.addEventListener('click', function () {
          openLightbox(index);
        });

        imagesContainer.appendChild(img);
      });
    }

    function openLightbox(startIndex) {
      let currentIndex = startIndex;

      // Lightbox contenedor
      let lightbox = document.createElement('div');
      lightbox.className = 'lightbox';

      // Imagen principal
      let lightboxImg = document.createElement('img');
      lightboxImg.src = links[currentIndex];
      lightboxImg.alt = '';

      // Flechas
      let leftArrow = document.createElement('div');
      leftArrow.className = 'arrow left';
      leftArrow.innerHTML = '&#10094;';

      let rightArrow = document.createElement('div');
      rightArrow.className = 'arrow right';
      rightArrow.innerHTML = '&#10095;';

      // Botón de cierre
      let closeButton = document.createElement('div');
      closeButton.className = 'close-button';
      closeButton.innerHTML = '&times;';

      // Función para actualizar la imagen
      function updateImage() {
        lightboxImg.src = links[currentIndex];
      }

      // Eventos
      leftArrow.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + links.length) % links.length;
        updateImage();
      });

      rightArrow.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % links.length;
        updateImage();
      });

      closeButton.addEventListener('click', function (e) {
        e.stopPropagation();
        lightbox.remove();
      });

      lightbox.addEventListener('click', function () {
        lightbox.remove();
      });

      lightboxImg.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      // Añadir elementos al DOM
      lightbox.appendChild(closeButton);
      lightbox.appendChild(leftArrow);
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(rightArrow);
      document.body.appendChild(lightbox);
    }

    loadImages();


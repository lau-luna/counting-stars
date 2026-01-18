let metaData = [];

function loadImages() {
      let imagesContainer = document.getElementsByClassName('images')[0];
    

      links.forEach(async (link, index) => {
        let img = document.createElement('img');
        img.src = link;
        img.alt = '';
        img.className = 'image';
        img.loading = 'lazy'

        img.addEventListener('click', function () {
          openLightbox(index);
        });

        imagesContainer.appendChild(img);



       // Esperar a que la imagen cargue completamente
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Continuar incluso si hay error
    });

    // Extraer metadatos EXIF
    try {
      EXIF.getData(img, function() {
        const allMetaData = EXIF.getAllTags(this);
        const exifData = EXIF.getTag(this, 'Exif');

        // Metadatos específicos a buscar
        let imgMetaData = {
            iso: EXIF.getTag(this, 'ISOSpeedRatings') ? 'ISO ' +  EXIF.getTag(this, 'ISOSpeedRatings') : undefined ,
            aperture: EXIF.getTag(this, 'FNumber') ? 'f/' + EXIF.getTag(this, 'FNumber').toFixed(1) : undefined,
            exposureTime: EXIF.getTag(this, 'ExposureTime') ? `${EXIF.getTag(this, 'ExposureTime').numerator}/${EXIF.getTag(this, 'ExposureTime').denominator}s` : undefined ,
            focalLength: EXIF.getTag(this, 'FocalLength') ? EXIF.getTag(this, 'FocalLength') + 'mm' : undefined ,
            exposureBias: EXIF.getTag(this, 'ExposureBias') ? EXIF.getTag(this, 'ExposureBias') + ' EV' : undefined,
            cameraMakeModel: EXIF.getTag(this, 'Make') && EXIF.getTag(this, 'Model') ? EXIF.getTag(this, 'Make') + ' ' + EXIF.getTag(this, 'Model') : undefined,
            lensModel: EXIF.getTag(this, 'LensModel') ? EXIF.getTag(this, 'LensModel') : undefined ,
            dateTaken: EXIF.getTag(this, 'DateTimeOriginal') ? EXIF.getTag(this, 'DateTimeOriginal') : undefined,
        }

        metaData.push(imgMetaData);
     
      });
    } catch (error) {
      console.warn('No se pudieron leer metadatos EXIF:', link, error);
    }

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

      // Metadatos de la imagen
      let exifDiv = document.createElement('div');
      exifDiv.className = 'exifDiv';

      let exifDivBottom = document.createElement('div');
      exifDivBottom.className = 'exifDivBottom';
      
      let iso = document.createElement('p');
      iso.className = 'metaData';
      iso.innerText = metaData[currentIndex].iso;
      if (metaData[currentIndex].iso) {
        exifDiv.appendChild(iso);
      }
      
      let aperture = document.createElement('p');
      aperture.className = 'metaData';
      aperture.innerText = metaData[currentIndex].aperture;
      if (metaData[currentIndex].aperture) {
        exifDiv.appendChild(aperture);
      }

      let exposureTime = document.createElement('p');
      exposureTime.className = 'metaData';
      exposureTime.innerText = metaData[currentIndex].exposureTime;
      if (metaData[currentIndex].exposureTime) {
        exifDiv.appendChild(exposureTime);
      }

      let focalLength = document.createElement('p');
      focalLength.className = 'metaData';
      focalLength.innerText = metaData[currentIndex].focalLength;
      if (metaData[currentIndex].focalLength) {
        exifDiv.appendChild(focalLength);
      }

      let exposureBias = document.createElement('p');
      exposureBias.className = 'metaData';
      exposureBias.innerText = metaData[currentIndex].exposureBias;
      if (metaData[currentIndex].exposureBias) {
        exifDiv.appendChild(exposureBias);
      }

      let makeModel = document.createElement('p');
      makeModel.className = 'metaData';
      makeModel.innerText = metaData[currentIndex].cameraMakeModel;
      if (metaData[currentIndex].cameraMakeModel) {
        exifDiv.appendChild(makeModel);
      }

      let dateTaken = document.createElement('p');
      dateTaken.className = 'metaData';
      dateTaken.innerText = metaData[currentIndex].dateTaken;
      if (metaData[currentIndex].dateTaken) {
        exifDiv.appendChild(dateTaken);
      }

      // Función para actualizar la imagen
      function updateImage() {
        lightboxImg.src = links[currentIndex];

        if (metaData[currentIndex].iso) {
          iso.innerText = metaData[currentIndex].iso;
        } 
        if (metaData[currentIndex].aperture) {
          aperture.innerText = metaData[currentIndex].aperture;
        }
        if (metaData[currentIndex].exposureTime) {
          exposureTime.innerText = metaData[currentIndex].exposureTime;
        }
        if (metaData[currentIndex].focalLength) {
          focalLength.innerText = metaData[currentIndex].focalLength;
        }
        if (metaData[currentIndex].exposureBias) {
          exposureBias.innerText = metaData[currentIndex].exposureBias;
        }
        if (metaData[currentIndex].cameraMakeModel) {
          makeModel.innerText = metaData[currentIndex].cameraMakeModel;
        }
        if (metaData[currentIndex].dateTaken) {
          dateTaken.innerText = metaData[currentIndex].dateTaken;
        }
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
      lightbox.appendChild(exifDiv);
      lightbox.appendChild(exifDivBottom);
      document.body.appendChild(lightbox);


    }

    loadImages();

console.log(metaData);

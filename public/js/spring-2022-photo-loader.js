let links =  ['https://files.catbox.moe/itfr9i.jpg', 
    'https://files.catbox.moe/m1jnw0.jpg', 
    'https://files.catbox.moe/e6bw3b.JPG',
    'https://files.catbox.moe/ikqigs.JPG',
    'https://files.catbox.moe/dxafb4.JPG',
    'https://files.catbox.moe/t26pdr.JPG',
    'https://files.catbox.moe/mvhrya.jpg',
    'https://files.catbox.moe/4t527i.JPG',
    'https://files.catbox.moe/dc0lcw.JPG',
    'https://files.catbox.moe/706ua2.jpg',
    'https://files.catbox.moe/l4vkdz.jpg',
    'https://files.catbox.moe/q4vwka.jpg',
    'https://files.catbox.moe/kod1oo.JPG',
    'https://files.catbox.moe/wjpw36.JPG',
    'https://files.catbox.moe/ge3w5n.JPG',
    'https://files.catbox.moe/203hep.JPG'
];

function loadImages() {
  let imagesContainer = document.getElementsByClassName('images')[0];

  links.forEach((link, index) => {
    let img = document.createElement('img');
    img.src = link;
    img.alt = '';
    img.className = 'image';

    img.addEventListener('click', function () {
      openLightbox(index); // Pasamos el índice
    });

    imagesContainer.appendChild(img);
  });
}

function openLightbox(startIndex) {
  let currentIndex = startIndex;

  // Creamos el lightbox
  let lightbox = document.createElement('div');
  lightbox.className = 'lightbox';

  // Imagen dentro del lightbox
  let lightboxImg = document.createElement('img');
  lightboxImg.src = links[currentIndex];
  lightboxImg.alt = '';

  // Botones
  let leftArrow = document.createElement('div');
  leftArrow.className = 'arrow left';
  leftArrow.innerHTML = '&#10094;'; // «

  let rightArrow = document.createElement('div');
  rightArrow.className = 'arrow right';
  rightArrow.innerHTML = '&#10095;'; // »

  // Función para actualizar la imagen
  function updateImage() {
    lightboxImg.src = links[currentIndex];
  }

  // Eventos de las flechas
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

  // Cerrar lightbox al hacer clic fuera
  lightbox.addEventListener('click', function () {
    lightbox.remove();
  });

  // Evitar que el clic en imagen cierre el lightbox
  lightboxImg.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Agregamos todo al DOM
  lightbox.appendChild(leftArrow);
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(rightArrow);
  document.body.appendChild(lightbox);
}

loadImages();

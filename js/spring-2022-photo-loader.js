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
  
    links.forEach(link => {
      let img = document.createElement('img');
      img.src = link;
      img.alt = '';
      img.className = 'image'; // Agregamos una clase a la imagen
  
      // Agregamos un evento de clic a la imagen
      img.addEventListener('click', function() {
        // Creamos un elemento de diálogo (lightbox)
        let lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
  
        // Creamos un elemento de imagen dentro del diálogo
        let lightboxImg = document.createElement('img');
        lightboxImg.src = this.src; // Utilizamos la fuente de la imagen actual
        lightboxImg.alt = '';
  
        // Agregamos la imagen al diálogo
        lightbox.appendChild(lightboxImg);
  
        // Agregamos el diálogo al cuerpo del documento
        document.body.appendChild(lightbox);
  
        // Agregamos un evento de clic al diálogo para cerrarlo
        lightbox.addEventListener('click', function() {
          this.remove();
        });
      });
  
      imagesContainer.appendChild(img);
    });
  }

loadImages();
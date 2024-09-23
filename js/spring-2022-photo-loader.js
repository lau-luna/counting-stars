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
    'https://files.catbox.moe/svqsgh.JPG',
    'https://files.catbox.moe/1dxsfp.JPG',
    'https://files.catbox.moe/igts1l.JPG',
    'https://files.catbox.moe/m2yzn8.JPG',
    'https://files.catbox.moe/203hep.JPG'
];

function loadImages() {
    let images = document.getElementsByClassName('images');

    links.forEach(link => {
        let img = document.createElement('img');
        img.src = link;
        img.alt = '';
        images[0].appendChild(img);
    });
}

loadImages();
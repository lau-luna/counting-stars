
// API
fetch('./diary/entries.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const entriesDiv = doc.getElementById('entries');
        // Ahora puedes acceder a los elementos dentro de entriesDiv
        const lis = entriesDiv.querySelectorAll('li');

        const datos = [];

        lis.forEach(li => {
            const anchor = li.querySelector('a');
            const texto = anchor.textContent;
            const href = anchor.getAttribute('href');
            const fecha = texto.match(/\b(\w{3}-\d{2})\b/)[1]; // Sep-24, Aug-30, etc.

            datos.push({
                fecha,
                texto,
                href
            });
        });

        console.log(datos);
    });


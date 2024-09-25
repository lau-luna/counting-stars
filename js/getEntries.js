function getEntries(qEntries) {
    if (qEntries == null) {
        fetch('./diary/entries.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const entriesDiv = doc.getElementById('entries-2024');
                const lis = entriesDiv.querySelectorAll('li');

                const datos = [];

                Array.from(lis).forEach(li => { // Convert NodeList to array
                    const anchor = li.querySelector('a');
                    const texto = anchor.textContent;
                    const href = anchor.getAttribute('href');
                    const fecha = texto.match(/\b(\w{3}-\d{2})\b/)[1]; // Sep-24, Aug-30, etc.

                    // Convertir la fecha a un objeto Date
                    const fechaParts = fecha.split('-');
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const monthIndex = monthNames.indexOf(fechaParts[0]);
                    const day = fechaParts[1];
                    const date = new Date(`2024-${monthIndex + 1}-${day}`);

                    // Formatear la fecha como dd/mm/yy
                    const formattedDate = `${date.getDate()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getFullYear().toString().slice(-2)}`;

                    // ...

                    datos.push({
                        fecha: formattedDate,
                        texto,
                        href
                    });

                });

                datos.slice(0, 5).forEach(dato => {
                    const entryPath = `./diary/${dato.href}`;

                    fetch(entryPath)
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            const entryDate = dato.fecha;
                            const entryTitle = doc.getElementById('entry-title').textContent;

                            let entriesDiv = document.getElementById('diary-container');

                            let date = document.createElement('p');
                            date.textContent = entryDate;

                            let lastEntry = document.createElement('a');
                            lastEntry.href = entryPath;
                            lastEntry.textContent = entryTitle;

                            entriesDiv.appendChild(date);
                            entriesDiv.appendChild(lastEntry);

                            console.log(datos);
                        });
                })

                console.log(datos);
            });
    } else {
        fetch('./diary/entries.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const entriesDiv = doc.getElementById('entries-2024');
                const lis = entriesDiv.querySelectorAll('li');

                const datos = [];

                Array.from(lis).slice(0, qEntries).forEach(li => { // Convert NodeList to array and use slice
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

                const entryPath = `./diary/${datos[0].href}`;

                fetch(entryPath)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const entryDate = doc.getElementById('entry-date').textContent;
                        const entryTitle = doc.getElementById('entry-title').textContent;

                        let lastDiaryEntryDiv = document.getElementById('lastDiaryEntry');

                        let date = document.createElement('p');
                        date.textContent = entryDate;

                        let lastEntry = document.createElement('a');
                        lastEntry.href = entryPath;
                        lastEntry.textContent = entryTitle;

                        lastDiaryEntryDiv.appendChild(date);
                        lastDiaryEntryDiv.appendChild(lastEntry);

                        console.log(datos);
                    });


            });
    }
}


getEntries();

getEntries(1);

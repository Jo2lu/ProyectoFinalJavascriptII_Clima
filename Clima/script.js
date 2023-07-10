function consultarClima() {
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = '34c701e351fd37d34db3c2d7f65c18bb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;

    fetch(url)
        .then(respondeLaUrl => {
            if (respondeLaUrl.ok) {
                return respondeLaUrl.json()
            } else {
                throw new Error('Error, Problemas con la API')
            }
        })
        .then(datosConsultadosATabla => {
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
            const fila = tabla.insertRow();
            fila.insertCell().innerHTML = datosConsultadosATabla.name;
            fila.insertCell().innerHTML = `${(datosConsultadosATabla.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = datosConsultadosATabla.weather[0].description;
            const icon = datosConsultadosATabla.weather[0].icon;
            fila.insertCell().innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}.png alt="">`;
        })
        .catch(error => {
            console.error('Error al consultar el clima', error);
        });
}

function consultarClimas() {
    const ciudadesConsultadas = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim())
    const API_KEY = '34c701e351fd37d34db3c2d7f65c18bb';
    Promise.all(ciudadesConsultadas.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=es`;
        return fetch(url)
            .then(respondeLaUrl => {
                if (respondeLaUrl.ok) {
                    return respondeLaUrl.json()
                } else {
                    throw new Error('Error, Problemas con la API')
                }
            })
    }))
        .then(desgloceDeDatos => {
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
            desgloceDeDatos.forEach(datosConsultadosATabla => {
                const fila = tabla.insertRow();
                fila.insertCell().innerHTML = datosConsultadosATabla.name;
                fila.insertCell().innerHTML = `${(datosConsultadosATabla.main.temp - 273.15).toFixed(1)}°C`;
                fila.insertCell().innerHTML = datosConsultadosATabla.weather[0].description;
                const icon = datosConsultadosATabla.weather[0].icon;
                fila.insertCell().innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}.png alt="">`;
            });
        })
        .catch(error => {
            console.error('Error al consultar el clima', error);
        });
}

function formateoTabla() {
    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for (let i = 0; i < tabla.length; i++) {
        tabla[i].innerHTML = "";
    }
}

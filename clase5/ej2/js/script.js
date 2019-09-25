window.addEventListener('load', () => {
    document.getElementById('btnTraer').addEventListener('click', traerTexto);

});

function traerTexto() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        //aca va el codigo que maneja la peticion
        let info = document.getElementById('info');

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                setTimeout(() => {
                    info.innerText = xhr.responseText;
                    clearTimeout(tiempo);
                }, 3000);

            } else {
                console.log(`Error ${xhr.status} - ${xhr.statusText}`);
            }
        } else {
            info.innerHTML = '<img src="./images/800.gif" alt = "spinner" />';
        }

    }
    xhr.open('GET', './persona.json', true);
    xhr.send();

    var tiempo = setTimeout(() => {
        xhr.abort();
        info.innerHTML = 'Servidor ocupado. Intente mas tarde';
    }, 2000);
}
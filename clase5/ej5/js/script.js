window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', enviarDatos);

});

function enviarDatos(e) {

    e.preventDefault();
    let data = traerDatos(e.target);
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
    xhr.open('GET', './servidor.php', true);
    xhr.send(data);

    var tiempo = setTimeout(() => {
        xhr.abort();
        info.innerHTML = 'Servidor ocupado. Intente mas tarde';
    }, 4000);
}

function traerDatos(form) {
    let nombre = form.nombre.value;
    let apellido = form.apellido.value;

    return `nombre=${nombre}&apellido=${apellido}`;
}
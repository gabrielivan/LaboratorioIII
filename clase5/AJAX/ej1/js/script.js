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
                    let persona = JSON.parse(xhr.responseText);
                    info.innerText = `Nombre: ${persona.nombre} ${persona.apellido} Edad: ${persona.edad}`;
                }, 3000);

            } else {
                console.log(`Error ${xhr.status} - ${xhr.statusText}`);
            }
        } else {
            info.innerHTML = '<img src="./images/800.gif" alt = "spinner" />';
        }

    }
    xhr.open('GET', './documento.txt', true);
    xhr.send();
}
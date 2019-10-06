let frm;

window.addEventListener('load', inicializarManejadores);
window.addEventListener('load', armarTabla);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
    document.getElementById("btnBorrar").addEventListener('click', borrarAnuncio);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    console.log(nuevoAnuncio);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    modificarAnuncio(anuncio);
}

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let cantidadBaños;
    let cantidadEstacionamientos;
    let cantidadDormitorios;
    let transaccion;
    let id = -1;
    
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "cantidadBaños":
                cantidadBaños = element.value;
                break;
            case "cantidadEstacionamientos":
                cantidadEstacionamientos = element.value;
                break;
            case "cantidadDormitorios":
                cantidadDormitorios = element.value;
                break;
            case "transaccion":
                if(element.checked === true){    
                    transaccion = element.value;
                }
                break;
            case "idAnuncio":
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, precio, cantidadBaños, cantidadEstacionamientos, cantidadDormitorios, transaccion);
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function armarTabla() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById("divTabla").innerHTML = "";
                let anuncios = JSON.parse(xhr.responseText);
                // console.log(crearTabla(anuncios.data));
                document.getElementById("divTabla").appendChild(crearTabla(anuncios.data));
                let tds = document.getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++) {
                    let td = tds[i];
                    td.addEventListener('click', setValues);
                }
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
    xhr.send();
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;

    document.getElementById("lblId").hidden = false;
    document.getElementById("txtTitulo").value = nodos[1].innerText;
    document.getElementById("txtDescripcion").value = nodos[3].innerText;
    document.getElementById("numPrecio").value = nodos[4].innerText;
    document.getElementById("numCantidadBaños").value = nodos[5].innerText;
    document.getElementById("numCantidadEstacionamientos").value = nodos[6].innerText;
    document.getElementById("numCantidadDormitorios").value = nodos[7].innerText;
    if(nodos[2].innerText === "Alquiler"){
        document.getElementById("alquiler").checked = true
    }
    else{
        document.getElementById("venta").checked = true
    }

    document.getElementById("btnCrearModificar").value = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);
}

function limpiarValues() {
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;

    document.getElementById("lblId").hidden = true;
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("numPrecio").value = 0;
    document.getElementById("numCantidadBaños").value = 0;
    document.getElementById("numCantidadEstacionamientos").value = 0;
    document.getElementById("numCantidadDormitorios").value = 0;
    document.getElementById("alquiler").checked = false;
    document.getElementById("venta").checked = false;

    document.getElementById("btnCrearModificar").value = "Crear Anuncio";
    document.getElementById("btnBorrar").hidden = true;
}

function altaAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}

function borrarAnuncio() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}

function modificarAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
        }
    }
    xhr.open('POST', 'http://localhost:3000/modificarAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    anuncio.active = true;
    xhr.send(JSON.stringify(anuncio));
}


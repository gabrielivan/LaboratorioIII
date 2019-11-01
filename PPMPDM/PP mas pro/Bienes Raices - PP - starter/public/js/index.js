//ATRIBUTOS DE ANUNCIO
//id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio;
let frm;
window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
    document.getElementById("btnBorrar").addEventListener('click', borrarAnuncio);
    cargarDatos();
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    //console.log(nuevoAnuncio); 
    altaAnuncio(nuevoAnuncio);

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    //console.log(anuncio);
    modificarAnuncio(anuncio);

}

function filtrarTransaccion(e, array) {
    let valorSeleccionado = e.target.value;
    let arr = array.filter((elemento) => elemento.transaccion == valorSeleccionado);
    let tabla = document.getElementById("divTabla");
    tabla.innerHTML = "";
    tabla.appendChild(crearTabla(arr));

}
function filtrarTransaccion(e, array) {
    let valorSeleccionado = e.target.value;
    let arr = array.filter((elemento) => elemento.transaccion == valorSeleccionado);
    let tabla = document.getElementById("divTabla");
    tabla.innerHTML = "";
    tabla.appendChild(crearTabla(arr));

}function filtrarCheckbox(e, array, element) {
     let valorSeleccionado = e.target.value;
     //console.log(valorSeleccionado);
     for(elemento in array)
     {
         switch(element)
         {
             case 'titulo':
                 var elemento = elemento.titulo;
                 break;
         }
         
     }
     

     let arr = array.filter((elemento) => elemento == valorSeleccionado);
     console.log(arr);
    // let tabla = document.getElementById("divTabla");
    // tabla.innerHTML = kcrearTabla(arr));

}

//////////////////////LLAMADAS AJAX/////////////////////////////////
function cargarDatos() {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    let chk = document.getElementById("divChk");
    let divSelect = document.getElementById("selectTransaccion");
    xhr.onreadystatechange = function() {
        //validar readyState y status
        //
        //si todo está OK, parseo la respuesta(responseText) y genero el array de anuncios
        if (xhr.readyState == 4 && xhr.status == 200) {
            tabla.innerHTML = "";
            let objetos = JSON.parse(xhr.responseText);
            crearBoxes(objetos.data, "divChk");
            chk.hidden = false;
            tabla.appendChild(crearTabla(objetos.data));
            divSelect.appendChild(crearSelect(objetos.data));
            document.getElementsByTagName("select")[0].addEventListener("change", (e) => {
                filtrarTransaccion(e, objetos.data);
            });
            let seleccion = document.querySelectorAll("input[class=checkbox]");
            for (let i = 0; i < seleccion.length; i++) {
                seleccion[i].addEventListener("change", (e) => {
                    if(seleccion[i].checked)
                    {
                        filtrarCheckbox(e, objetos.data);
                    }
                    else
                    {
                        console.clear();
                    }
                });
            }
            
            let tds = document.getElementsByTagName("td")
            for (let i = 0; i < tds.length; i++) {
                tds[i].addEventListener("click", setValues);
            }
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/traerAnuncios";
    xhr.open("GET", url, true);
    xhr.send();
}

function altaAnuncio(nuevoAnuncio) {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            tabla.innerText = "";
            cargarDatos();
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/altaAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'Application/json');
    xhr.send(JSON.stringify(nuevoAnuncio));
}

function modificarAnuncio(nuevoAnuncio) {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            tabla.innerText = "";
            cargarDatos();
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/modificarAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'Application/json');
    xhr.send(JSON.stringify(nuevoAnuncio));
}

function borrarAnuncio() {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            tabla.innerText = "";
            cargarDatos();
            limpiarForm();
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/bajaAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}


function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let num_wc;
    let num_estacionamiento;
    let num_dormitorio;
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
            case "num_wc":
                num_wc = element.value;
                break;
            case "num_estacionamiento":
                num_estacionamiento = element.value;
                break;
            case "num_dormitorio":
                num_dormitorio = element.value;
                break;
            case "transaccion":
                if (element.checked === true) {
                    transaccion = element.value;
                }
                break;
            case "idAnuncio":
                if (tieneId === true) {
                    console.log("entro");
                    id = element.value;
                } else {
                    id = element.value;
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_dormitorio, num_estacionamiento);
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;

    document.getElementById("lblId").hidden = false;
    document.getElementById("titulo").value = nodos[1].innerText;
    if (nodos[2].innerHTML == "Venta") {
        document.getElementById("transaccionVenta").checked = true;
    } else {
        document.getElementById("transaccionAlquiler").checked = true;
    }
    document.getElementById("descripcion").value = nodos[3].innerText;
    document.getElementById("precio").value = nodos[4].innerText;
    document.getElementById("num_wc").value = nodos[5].innerText;
    document.getElementById("num_estacionamiento").value = nodos[6].innerText;
    document.getElementById("num_dormitorio").value = nodos[7].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function limpiarForm() {
    document.getElementById("idAnuncio").hidden = true;
    document.getElementById("lblId").hidden = true;
    document.getElementById("descripcion").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("num_wc").value = "";
    document.getElementById("num_estacionamiento").value = "";
    document.getElementById("num_dormitorio").value = "";
    document.getElementById("transaccionAlquiler").checked = false;
    document.getElementById("transaccionVenta").checked = false;

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);

}
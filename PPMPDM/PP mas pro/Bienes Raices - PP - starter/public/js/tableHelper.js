//funciones utiles:
//document.createElement("elemento")
//setAttribute('atributo', 'valor');
//appendChild(child);
//createTextNode(valor);


function crearTabla(array) {
    var tabla = document.createElement("table");
    tabla.className = "tabla";

    let cabecera = document.createElement("tr");
    // let cabeceraCheckbox = document.createElement("tr");

    // //Completando cabecera
    // for (header in array[0]) {
    //     let th = document.createElement("th");
    //     let chk = document.createElement("input");
    //     chk.type = "checkbox";
    //     chk.name = "chk_" + header;
    //     chk.checked = true;
    //     chk.id = chk.name;

    //     th.appendChild(chk);
    //     cabeceraCheckbox.appendChild(th);
    // }
    // tabla.appendChild(cabeceraCheckbox);


    //Completando cabecera
    for (headers in array[0]) {
        let th = document.createElement("th");
        th.textContent = headers;

        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for (i in array) {

        let fila = document.createElement("tr");
        let objeto = array[i];
        for (j in objeto) {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}
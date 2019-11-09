
function crearTabla(array) {
    let tbody = document.createElement("tbody");
    let col = document.createElement("div");
    col.className = "col-12";
    let tabla = document.createElement("table");
    tabla.className= "table tabla table-bordered table-striped table-hover";

    let cabecera = document.createElement("tr");
    cabecera.className = "thead-dark";
    //Completando cabecera}
    for (headers in array[0]) {  
            let th = document.createElement("th");
            th.textContent = headers;
            cabecera.appendChild(th);
        
    }
    tbody.appendChild(cabecera)
    tabla.appendChild(tbody);

    for (i in array) {

        let fila = document.createElement("tr");
        fila.className = "table-success";
        let objeto = array[i];
        for (j in objeto) {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
        tabla.appendChild(tbody);
    }
    return tabla;
}

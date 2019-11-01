function crearTabla(array)
{
    let tabla = document.createElement("tablle");
    tabla.className = "tabla";

    let cabecera = document.createElement("tr");
    for(header in array[0])
    {
        let th = document.createElement("th");
        th.textContent = header;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for(i in array)
    {
        var fila = document.createElement("tr");
        var objeto = array[i];

        for(j in objeto)
        {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;

}
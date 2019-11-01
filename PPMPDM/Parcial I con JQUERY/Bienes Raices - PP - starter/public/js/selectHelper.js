function crearSelect(array) {
    // for (i in array){
    //     //let atributo = array[i];
    //     //for(atributo in )
    // }
    let transacciones = array.map(function(elemento) {
        return elemento.transaccion;
    });
    let set = [...new Set(transacciones)];

    let select = document.createElement("select");
    for (elemento of set) {
        let opcion = document.createElement("option");
        opcion.innerText = elemento;
        select.appendChild(opcion);
    }
    return select;
}
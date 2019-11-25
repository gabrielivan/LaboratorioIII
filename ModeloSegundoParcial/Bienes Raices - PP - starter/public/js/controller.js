//Setea en el localStorage a datos con la key = "Legisladores"
//Obtiene los Legisladores del localStorage y los retorna
function init(){
    localStorage.setItem("Legisladores", JSON.stringify(datos));
    var arrayAux = JSON.parse(localStorage.getItem("Legisladores"));
    arrayAux.forEach(function(obj){
        let legislador = new Legislador(obj.id, obj.nombre, obj.apellido, obj.edad, obj.email, obj.sexo, obj.tipo)
        arrayLegisladores.push(legislador);
    });
    return arrayLegisladores;
}

//Recibe un legislador y lo modifica.
function modificarLegislador(legislador){
    for(i = 0; i < arrayLegisladores.length; i++)
    {
        if(arrayLegisladores[i].id == legislador.id)
        {
            arrayLegisladores.splice(i, 2, legislador);
        }
    }
    
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    limpiarForm();
    cargarTabla(arrayLegisladores);
}

//borra el legislador que se haya seleccionado obteniendo el id apartir del frm
function borrarLegislador(){
    let id = obtenerId(frm);
    
    for(i = 0; i < arrayLegisladores.length; i++)
    {
        if(arrayLegisladores[i].id == id)
        {
            arrayLegisladores.splice(i, 1);
        }
    }
    
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    limpiarForm();
    cargarTabla(arrayLegisladores);
}

//Da de alta el legislador recibido por parametro
function altaLegislador(nuevoLegislador) {
    arrayLegisladores.push(nuevoLegislador);
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    cargarTabla(arrayLegisladores);
}

//Crea la tabla y la carga con los datos del array recibido por parametro
//Crea los checkBoxs unicamente la primera vez.
function cargarTabla(array) {
    let tabla = $("#divTabla");
    let checkbox = $("divChk");
    tabla.html("");
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(arrayLegisladores, "divChk");
        primeraVez = false;
    }
    checkbox.html("");
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);
}
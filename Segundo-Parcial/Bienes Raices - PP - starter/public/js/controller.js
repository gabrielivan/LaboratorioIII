//Setea en el localStorage a datos con la key = "Legisladores"
//Obtiene los Legisladores del localStorage y los retorna
function init(){
    localStorage.setItem("Anuncios", JSON.stringify(datos));
    var arrayAux = JSON.parse(localStorage.getItem("Anuncios"));
    arrayAux.forEach(function(obj){
        let bienRaiz = new BienRaiz(obj.id, obj.precio, obj.transaccion, obj.descripcion, obj.numwc, obj.numdormitorio, obj.numestacionamiento, obj.titulo)
        arrayAnuncios.push(bienRaiz);
    });
    return arrayAnuncios;
}

//Recibe un legislador y lo modifica.
function modificarAnuncio(anuncio){
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id == anuncio.id)
        {
            arrayAnuncios.splice(i, 2, anuncio);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}

//borra el legislador que se haya seleccionado obteniendo el id apartir del frm
function borrarAnuncio(){
    let id = obtenerId(frm);
    
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id == id)
        {
            arrayAnuncios.splice(i, 1);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}

//Da de alta el legislador recibido por parametro
function altaAnuncio(nuevoAnuncio) {
    arrayAnuncios.push(nuevoAnuncio);
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    cargarTabla(arrayAnuncios);
}

//Crea la tabla y la carga con los datos del array recibido por parametro
//Crea los checkBoxs unicamente la primera vez.
function cargarTabla(array) {
    let tabla = $("#divTabla");
    let checkbox = $("divChk");
    tabla.html("");
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(arrayAnuncios, "divChk");
        primeraVez = false;
    }
    checkbox.html("");
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);
}
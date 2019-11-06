//VARIABLES GLOBALES
let frm;
let primeraVez = true;
var arrayAnuncios;

$(function() {
    inicializarManejadores();
})

function inicializarManejadores() {
    frm = document.forms[0];
    $("#frm").submit(manejadorAlta);
    $("#btnBorrar").click(borrarAnuncio);
    $("#btnLimpiar").click(limpiarForm);
    $("#idAnuncio").hide();
    $("#lblId").hide();
    $("#btnBorrar").hide();
    $("#btnLimpiar").hide();
    localStorage.setItem("Anuncios", JSON.stringify(datos));
    arrayAnuncios = JSON.parse(localStorage.getItem("Anuncios"));
    cargarTabla(arrayAnuncios);
}

function manejadorAlta(e) {
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

function modificarAnuncio(anuncio){
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id === anuncio.id)
        {
            arrayAnuncios.splice(i, 2, anuncio);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}


function borrarAnuncio(){
    let id = obtenerId(frm);
    
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id === id)
        {
            arrayAnuncios.splice(i, 1);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}

function cargarTabla(array) {
    let tabla = $("#divTabla");
    tabla.html("");
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(datos, "divChk");
        primeraVez = false;
    }
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);
}

function filtrarDatos() {
    
    let opciones = ['id']; //creo un array de las opciones con el id puesto.
    
    //Aca recorro uno por uno todos los checkbox que esten tildados!!
    $('.box input:checked').each(function() {
        ///Aca meto en un array todos los valores de los checkbox que esten tildados (titulo, descricion etc)
        opciones.push($(this).val());
    });
    
    //Filtro por el valor del select
    let transaccion = $('#selTransaccion').val(); //te devuelve el valor que tiene el select (transaccion o alquiler o todos).
    let cantBanios = $('#selBaños').val(); //te devuelve el valor que tiene el select (>= 2 >= 3 etc).
    
    let datosFiltradosSelect = arrayAnuncios; //le asigno (arrayAnuncios) de base por si no hay algun select seleccionados.
    
    if (transaccion !== "Todos") {
        datosFiltradosSelect = datosFiltradosSelect.filter(obj => obj.transaccion === transaccion);
    }
    if (cantBanios !== "Todos") {
        datosFiltradosSelect = datosFiltradosSelect.filter(obj => obj.num_wc >= cantBanios);
    }
    
    //Filtro por el valor de los checkbox
    let datosFiltradosCheckbox = datosFiltradosSelect.map(function(dato) { //dato es cada objeto del array de objetos ya sea filtrado o no
        
        let retorno = new Object(); //{"key" : "value", "key" : "value", etc}
        
        opciones.forEach(elemento => { //recorre cada opcion del array de opciones (serian los checkbox tildados)
            retorno[elemento] = dato[elemento]; //le asigna al valor de cada campo del nuevo objeto el valor del cada campo del dato que se esta recorriendo que coincida con la opcion que este tildada
        });
        return retorno; // retorna el nuevo objeto {"id" : "x", "titulo" : "aaa", etc}
    });
    
    //Vuelvo a cargar la tabla con los arrayAnuncios filtrados por select y/o por checkbox.
    cargarTabla(datosFiltradosCheckbox);
}

function altaAnuncio(nuevoAnuncio) {
    arrayAnuncios.push(nuevoAnuncio);
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    cargarTabla(arrayAnuncios);
}


function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let num_wc;
    let num_estacionamiento;
    let num_dormitorio;
    let transaccion;
    let id;
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
                    id = element.value;
                } else {
                    ids = datos.map(element => element.id).sort(function (a, b) { return a - b; });
                    ultimoId = ids[ids.length - 1];
                    ultimoId++;
                    id = ultimoId.toString();
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_dormitorio, num_estacionamiento);
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayAnuncios.filter(obj => obj.id === nodos[0].innerText); //obtengo el dato por id, pregunto si el id de la tr que seleccione es igual a algun id del arrayAnuncios 
    
    //ID
    $("#idAnuncio").val(dato[0].id);
    $("#idAnuncio").show();
    $("#lblId").show();
    
    //Titulo
    $("#titulo").val(dato[0].titulo);
    
    //Transaccion
    if (dato[0].transaccion == "Venta") {
        $('#transaccionVenta').prop('checked', true);
    } else {
        $('#transaccionAlquiler').prop('checked', true);
    }
    
    //Descripcion
    $("#descripcion").val(dato[0].descripcion);
    
    //Precio
    $("#precio").val(dato[0].precio);
    
    //Num WC
    $("#num_wc").val(dato[0].num_wc);
    
    //Num Estancionamiento
    $("#num_estacionamiento").val(dato[0].num_estacionamiento);
    
    //Num Dormitorio
    $("#num_dormitorio").val(dato[0].num_dormitorio);

    $("#btnCrearModificar").text("Modificar"); //Cambio el nombre del boton Crear por Modificar
    $("#btnBorrar").show(); //muestro el boton de borrar por si en vez de querer modificar desea borrar el objeto seleccionado por tr.
    $("#frm").off('submit', manejadorAlta); //Le saco la funcion de alta al boton submit
    $("#frm").submit(manejadorModificar); //Le agrego la funcion de modificar al boton submit
    $("#btnLimpiar").show(); //Muestro el boton de Limpiar
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return element.value;
        }
    }
}

function limpiarForm() {

    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
    
    $("#idAnuncio").hide();
    $("#lblId").hide()
    $("#descripcion").val("");
    $("#titulo").val("");
    $("#precio").val("");
    $("#num_wc").val("");
    $("#num_estacionamiento").val("");
    $("#num_dormitorio").val("");
    $('#transaccionVenta').prop('checked', false);
    $('#transaccionAlquiler').prop('checked', false);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorAlta);

    cargarTabla(arrayAnuncios);

}
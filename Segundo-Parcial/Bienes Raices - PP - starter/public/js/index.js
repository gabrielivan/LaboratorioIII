//VARIABLES GLOBALES
let frm;
let primeraVez = true;
var arrayAnuncios = [];

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
    
    arrayAnuncios = init();

    // calcularEdad(arrayLegisladores);
    // calcularGenderMix(arrayLegisladores);
    
    cargarTabla(arrayAnuncios);
}

//MANEJADORES

function manejadorAlta(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    modificarAnuncio(anuncio);
}

//FUNCIONES

function filtrarDatos() {
    
    let opciones = ['id']; //creo un array de las opciones con el id puesto.
    
    //Aca recorro uno por uno todos los checkbox que esten tildados!!
    $('.box input:checked').each(function() {
        ///Aca meto en un array todos los valores de los checkbox que esten tildados (nombre, apellido etc)
        opciones.push($(this).val());
    });
    
    //Filtro por el valor del select
    let tipo = $('#selectTipo').val();
    let datosFiltradosSelect = arrayAnuncios;
    if (tipo !== "Todos") {
        datosFiltradosSelect = datosFiltradosSelect.filter(obj => obj.transaccion == tipo);
    }
    calcularPrecio(datosFiltradosSelect);    
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

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let numwc;
    let numestacionamiento;
    let numdormitorio;
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
            case "numwc":
                numwc = element.value;
                break;
            case "numestacionamiento":
                numestacionamiento = element.value;
                break;
            case "numdormitorio":
                numdormitorio = element.value;
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
    let bienRaiz = new BienRaiz(id, precio, transaccion, descripcion, numwc, numdormitorio, numestacionamiento, titulo);
    console.log(typeof(bienRaiz));
    return bienRaiz;
}


function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayAnuncios.filter(obj => obj.id == nodos[0].innerText); //obtengo el dato por id, pregunto si el id de la tr que seleccione es igual a algun id del arrayAnuncios 
    
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
    $("#numwc").val(dato[0].numwc);
    
    //Num Estancionamiento
    $("#numestacionamiento").val(dato[0].numestacionamiento);
    
    //Num Dormitorio
    $("#numdormitorio").val(dato[0].numdormitorio);

    $("#btnCrearModificar").text("Modificar"); //Cambio el nombre del boton Crear por Modificar
    $("#btnBorrar").show(); //muestro el boton de borrar por si en vez de querer modificar desea borrar el objeto seleccionado por tr.
    $("#frm").off('submit', manejadorAlta); //Le saco la funcion de alta al boton submit
    $("#frm").submit(manejadorModificar); //Le agrego la funcion de modificar al boton submit
    $("#btnLimpiar").show(); //Muestro el boton de Limpiar
}

//Obtiene el id del legislador seleccionado del formulario
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
    $("#numwc").val("");
    $("#numestacionamiento").val("");
    $("#numdormitorio").val("");
    $('#transaccionVenta').prop('checked', false);
    $('#transaccionAlquiler').prop('checked', false);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorAlta);

    cargarTabla(arrayAnuncios);

}

function calcularPrecio(array) {
    let promedio = array.map(obj => parseInt(obj.precio))
        .reduce((prev, curr) => (prev + curr))/array.length;
    $('#txtInfoPrecio').val(promedio.toFixed(2));
}

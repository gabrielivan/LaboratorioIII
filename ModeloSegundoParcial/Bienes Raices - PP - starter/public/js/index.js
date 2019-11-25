//VARIABLES GLOBALES
let frm;
let primeraVez = true;
var arrayLegisladores = [];

$(function() {
    inicializarManejadores();
})

function inicializarManejadores() {
    frm = document.forms[0];
    $("#frm").submit(manejadorAlta);
    $("#btnBorrar").click(borrarLegislador);
    $("#btnLimpiar").click(limpiarForm);
    $("#idLegislador").hide();
    $("#lblId").hide();
    $("#btnBorrar").hide();
    $("#btnLimpiar").hide();
    
    arrayLegisladores = init();

    calcularEdad(arrayLegisladores);
    calcularGenderMix(arrayLegisladores);
    
    cargarTabla(arrayLegisladores);
}

//MANEJADORES

function manejadorAlta(e) {
    e.preventDefault();
    let nuevoLegislador = obtenerLegislador(e.target, false);
    altaLegislador(nuevoLegislador);
}

function manejadorModificar(e) {
    e.preventDefault();
    let legislador = obtenerLegislador(e.target, true);
    modificarLegislador(legislador);
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
    let datosFiltradosSelect = arrayLegisladores;
    if (tipo !== "Todos") {
        datosFiltradosSelect = datosFiltradosSelect.filter(obj => obj.tipo === tipo);
    }
    calcularEdad(datosFiltradosSelect);
    calcularGenderMix(datosFiltradosSelect);
    
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

function obtenerLegislador(frm, tieneId) {
    let id;
    let nombre;
    let apellido;
    let email;
    let edad;
    let radioTipo;
    let radioSexo;

    for (element of frm.elements) {
        switch (element.name) {
            case "nombre":
                nombre = element.value;
                break;
            case "apellido":
                apellido = element.value;
                break;
            case "edad":
                edad = element.value;
                break;
            case "email":
                email = element.value;
                break;
            case "radioSexo":
                if (element.checked === true) {
                    radioSexo = element.value;
                }
                break;
            case "radioTipo":
                if (element.checked === true) {
                    radioTipo = element.value;
                }
                break;
            case "legislador":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    id = element.value;
                    ids = arrayLegisladores.map(element => element.id).sort(function (a, b) { return a - b; });
                    ultimoId = ids[ids.length - 1];
                    ultimoId++;
                    id = ultimoId.toString();
                }
                break;
        }
    }
    let legislador = new Legislador(id, nombre, apellido, edad, email, radioSexo, radioTipo);
    console.log(typeof(legislador));
    return legislador;
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayLegisladores.filter(obj => obj.id == nodos[0].innerText); //obtengo el dato por id, pregunto si el id de la tr que seleccione es igual a algun id del arrayLegisladores 
    
    //ID
    $("#idLegislador").val(dato[0].id);
    $("#idLegislador").show();
    $("#lblId").show();
    
    //Nombre
    $("#txtNombre").val(dato[0].nombre);
    
    //Apellido
    $("#txtApellido").val(dato[0].apellido);
    
    //Edad
    $("#numEdad").val(dato[0].edad);
    
    //Email
    $("#txtEmail").val(dato[0].email);
    
    //Tipo
    if (dato[0].tipo == "Senador") {
        $('#tipoSenador').prop('checked', true);
    } else {
        $('#tipoDiputado').prop('checked', true);
    }

    //Sexo
    if (dato[0].sexo == "Male") {
        $('#sexoMasculino').prop('checked', true);
    } else {
        $('#sexoFemenino').prop('checked', true);
    }
    
    //BOTONES/MANEJADORES

    $("#btnCrearModificar").text("Modificar"); //Cambio el nombre del boton Crear por Modificar
    $("#btnBorrar").show(); //muestro el boton de borrar por si en vez de querer modificar desea borrar el objeto seleccionado por tr.
    $("#frm").off('submit', manejadorAlta); //Le saco la funcion de alta al boton submit
    $("#frm").submit(manejadorModificar); //Le agrego la funcion de modificar al boton submit
    $("#btnLimpiar").show(); //Muestro el boton de Limpiar
}

//Obtiene el id del legislador seleccionado del formulario
function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "legislador") {
            return element.value;
        }
    }
}

function limpiarForm() {

    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
    
    $("#idLegislador").hide();
    $("#lblId").hide()
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEmail").val("");
    $("#numEdad").val("");
    $('#tipoDiputado').prop('checked', false);
    $('#tipoSenador').prop('checked', false);
    $('#sexoFemenino').prop('checked', false);
    $('#sexoMasculino').prop('checked', false);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorAlta);

    cargarTabla(arrayLegisladores);

}

function calcularEdad(array) {
    let promedio = array.map(obj => parseInt(obj.edad))
        .reduce((prev, curr) => (prev + curr))/array.length;
    $('#txtInfoEdad').val(promedio.toFixed(2));
}

function calcularGenderMix(array) {
    let cantidadLegisladores = array.length;
    let cantidadMujeres = array.filter(obj => obj.sexo === "Female").length;
    let genderMix = (cantidadMujeres/cantidadLegisladores) * 100;
    $('#txtInfoGender').val(genderMix.toFixed(2));
}
let arrayAnuncios;
let primeraVez = true;
let arrayLegisladores = [];
$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
    $("#frm").submit(manejadorSubmit);
    $("#lblId").hide();
    $("#idLegislador").hide();
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#btnBorrar").click(manejadorBorrar);
    $("#btnLimpiar").click(limpiarForm);
    arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
    arrayObjetos.forEach(object => {
        let legislador = new Legislador(object.id, object.nombre, object.apellido, object.edad, object.email, object.sexo, object.tipo)
        arrayLegisladores.push(legislador);
    });
    calcularEdad(arrayLegisladores);
    calcularGenderMix(arrayLegisladores);
    cargarGrilla(arrayLegisladores);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoLegislador = obtenerLegislador(e.target, false);
    arrayLegisladores.push(nuevoLegislador);
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    cargarGrilla(arrayLegisladores);
    reestablecerBoxes();
    limpiarForm();

}

function manejadorModificar(e) {
    e.preventDefault();
    let legislador = obtenerLegislador(e.target, true);
    for (i = 0; i < arrayLegisladores.length; i++) {
        if (arrayLegisladores[i].id === legislador.id) {
            arrayLegisladores.splice(i, 1, legislador);
        }
    }
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    reestablecerBoxes()
    limpiarForm();
    cargarGrilla(arrayLegisladores);
}

function manejadorBorrar() {

    let id = $("#idLegislador").val();
    for (i = 0; i < arrayLegisladores.length; i++) {
        if (arrayLegisladores[i].id === id) {
            arrayLegisladores.splice(i, 1);
        }
    }
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    reestablecerBoxes()
    limpiarForm();
    cargarGrilla(arrayLegisladores);
}

function cargarGrilla(array) {
    let tabla = $("#divTabla");
    let checkbox = $("divChk");
    tabla.html('');
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(arrayLegisladores, "divChk");
        primeraVez = false;
    }
    checkbox.html('');
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);
}
function filtrarDatos() {
    let opciones = ['id'];
    //Aca recorro uno por uno todos los checkbox
    $('.box input:checked').each(function () {
        if ($(this).prop('checked') == true) {
            ///Aca meto en un array todos los valores de los checkbox que esten tildados (titulo, descricion etc)
            opciones.push($(this).val());
        }
    });
    //Filtro por el valor del select
    let tipo = $('#selTipo').val();
    let datosFiltradosSel = arrayLegisladores;
    if (tipo !== "Todos") {
        datosFiltradosSel = datosFiltradosSel.filter(obj => obj.tipo === tipo);
    }
    calcularEdad(datosFiltradosSel);
    calcularGenderMix(datosFiltradosSel);
    
    //Filtro por el valor de los checkbox
    let datosFiltradosChk = datosFiltradosSel.map(function (dato) {
        let retorno = new Object();
        
        opciones.forEach(elemento => {
            retorno[elemento] = dato[elemento];
        });
        return retorno;
    });
    //Vuelvo a cargar la tabla con los datos filtrados
    cargarGrilla(datosFiltradosChk);
}


function obtenerLegislador(frm, tieneId) {
    let nombre;
    let apellido;
    let email;
    let edad;
    let radioTipo;
    let radioSexo;
    let id;

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
            case "idLegislador":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
                    if (arrayObjetos.length !== 0) {
                        ids = arrayObjetos.map(element => element.id).sort(function (a, b) { return a - b; });
                        ultimoId = ids[ids.length - 1];
                        ultimoId++;
                        id = ultimoId.toString();
                    }
                    else {
                        id = "1";
                    }
                }
                break;
        }
    }
    let legislador = new Legislador(id, nombre, apellido, edad, email, radioSexo, radioTipo);
    return legislador;
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayLegisladores.filter(obj => obj.id === nodos[0].innerText);
    //ID
    $("#idLegislador").val(dato[0].id);
    $("#idLegislador").show();
    $("#lblId").show();
    //Nombre
    $("#txtNombre").val(dato[0].nombre);
    //Sexo
    if (dato[0].sexo == "Masculino") {
        $('#sexoMasculino').prop('checked', true);
    } else {
        $('#sexoFemenino').prop('checked', true);
    }
    //Tipo
    if (dato[0].tipo == "Diputado") {
        $('#tipoDiputado').prop('checked', true);
    } else {
        $('#tipoSenador').prop('checked', true);
    }
    //Apellido
    $("#txtApellido").val(dato[0].apellido);
    //Email
    $("#txtEmail").val(dato[0].email);
    //Edad
    $("#numEdad").val(dato[0].edad);

    $("#btnCrearModificar").text("Modificar");
    $("#btnBorrar").show();
    $("#frm").off('submit', manejadorSubmit);
    $("#frm").submit(manejadorModificar);
    $("#btnLimpiar").show();

}

function limpiarForm() {
    $("#idLegislador").hide();
    $("#lblId").hide()
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEmail").val("");
    $("#numEdad").val("18");
    $('#sexoMasculino').prop('checked', true);
    $('#tipoDiputado').prop('checked', true);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorSubmit);

}

function reestablecerBoxes()
{
    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
}

function calcularEdad(arr) {
    let promedio = arr.map(obj => parseInt(obj.edad))
        .reduce((prev, curr) => (prev + curr))/arr.length;
    //$('#txtInfoEdad').val(promedio.toFixed(2));
}

function calcularGenderMix(arr) {
    let cantidadLegisladores = arr.length;
    let cantidadMujeres = arr.filter(obj => obj.sexo === "Femenino").length;
    let genderMix = (cantidadMujeres/cantidadLegisladores) * 100;
    $('#txtInfoEdad').val(genderMix.toFixed(2));
}


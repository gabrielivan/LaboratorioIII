let selTransaccion;
let selBanios;

$(function () {
    selTipo = document.getElementById("selTipo");
    cargarSelect(selTipo, obtenerTipo(arrayLegisladores));
    selTipo.addEventListener('change', filtrarDatos);
});

function obtenerTipo(arr) {
    return arr.map(obj => obj.tipo)
        .unique()
        .sort();
}

function cargarSelect(sel, arr) {
    limpiarSelect(sel);
    let option = document.createElement('option');
    option.value = "Todos";
    option.textContent = "Todos";
    sel.appendChild(option);
    arr.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        sel.appendChild(option);
    });
}

function limpiarSelect(sel) {
    //sel.options.length = 0;
    while (sel.hasChildNodes()) {
        sel.removeChild(sel.firstElementChild);
    }
}

Array.prototype.unique = function() {
    return [...new Set(this)];
}
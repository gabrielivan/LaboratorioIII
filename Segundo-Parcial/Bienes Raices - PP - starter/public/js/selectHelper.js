
$(function () {
    selectTipo = document.getElementById("selectTipo");
    cargarSelect(selectTipo, obtenerTipo(arrayAnuncios));
    selectTipo.addEventListener('change', filtrarDatos);
});

function obtenerTipo(array) {
    return array.map(obj => obj.transaccion)
        .unique()
        .sort();
}

function cargarSelect(select, array) {
    limpiarSelect(select);
    let option = document.createElement('option');
    option.value = "Todos";
    option.textContent = "Todos";
    select.appendChild(option);
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
    });
}

function limpiarSelect(select) {
    //sel.options.length = 0;
    while (select.hasChildNodes()) {
        select.removeChild(select.firstElementChild);
    }
}

Array.prototype.unique = function() {
    return [...new Set(this)];
}
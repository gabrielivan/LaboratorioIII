let selTransaccion;
let selBanios;

window.addEventListener('load', function() {
    selTransaccion = document.getElementById("selTransaccion");
    selBanios = document.getElementById("selBaños");
    cargarSelect(selTransaccion, obtenerTransacciones(datos));
    cargarSelect(selBanios, obtenerBanios(datos));
    selTransaccion.addEventListener('change', filtrarDatos);
    selBanios.addEventListener('change', filtrarDatos);
});

function obtenerTransacciones(arr) {
    return arr.map(obj => obj.transaccion)
        .unique()
        .sort();
}

function obtenerBanios(arr) {
    let maximo = arr.map(obj => obj.num_wc)
        .unique()
        .reduce((prevMax, obj) => {
            if (prevMax > obj)
                return prevMax;
            return obj;
        })
    let retorno = [];
    for (let i = 1; i <= maximo; i++) {
        retorno.push(i);
    }
    return retorno;
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
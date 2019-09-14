var arrayDeAnuncios = [];
var anuncio = {};
var btnAltaAnuncio;
var nombreAnuncio = "";
var descripcionAnuncio = "";
var precioAnuncio = 0;
var bañosAnuncio = 0;
var dormitoriosAnuncio = 0;
var cocherasAnuncio = 0;

window.addEventListener('load', function(){
    btnAltaAnuncio = document.getElementById('btnAltaAnuncio');

    btnAltaAnuncio.addEventListener('click', altaBoton);
});

altaBoton = function(){
    nombreAnuncio = document.getElementById("txtNombreAnuncio").value;
    descripcionAnuncio = document.getElementById("txtDescripcionAnuncio").value;
    precioAnuncio = document.getElementById("numPrecio").value;
    bañosAnuncio = document.getElementById("numBaños").value;
    dormitoriosAnuncio = document.getElementById("numDormitorios").value;
    cocherasAnuncio = document.getElementById("numCocheras").value;
    
    anuncio = {
        nombre : nombreAnuncio,
        descripcion: descripcionAnuncio,
        precio: precioAnuncio,
        cantidadBaños: bañosAnuncio,
        cantidadDormitorios: dormitoriosAnuncio,
        cantidadCocheras: cocherasAnuncio
    }
    
    arrayDeAnuncios.push(anuncio);
    console.log(JSON.stringify(arrayDeAnuncios));

}


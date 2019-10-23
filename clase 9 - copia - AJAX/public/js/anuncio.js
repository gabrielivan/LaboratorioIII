function Anuncio(id, titulo, descripcion, precio, cantidadBaños, cantidadEstacionamientos, cantidadDormitorios, transaccion) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
    this.num_wc = cantidadBaños;
    this.num_estacionamiento = cantidadEstacionamientos;
    this.num_dormitorio = cantidadDormitorios;
}

//ATRIBUTOS DE ANUNCIO
//id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio;
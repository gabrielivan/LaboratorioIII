class Anuncio
{
    protected id:any;
    protected precio:string;
    protected transaccion:ETransaccion;
    protected descripcion:string;
    protected numwc:string;
    protected numdormitorio:string;
    protected numestacionamiento:string;

    constructor(id:any,precio: string, transaccion: ETransaccion, descripcion: string, numwc: string, numdormitorio:string, numestacionamiento:string) {
        this.id = id;
        this.precio = precio;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.numwc = numwc;
        this.numdormitorio = numdormitorio;
        this.numestacionamiento = numestacionamiento;
    }

    // Setters & Getters
    set Precio(e:string){this.precio = e};
    get Precio():string{return this.precio;};

    set Transaccion(e:ETransaccion){this.transaccion = e};
    get Transaccion():ETransaccion{return this.transaccion;};

    set Descripcion(e:string){this.descripcion = e};
    get Descripcion():string{return this.descripcion;};
    
    set Numwc(e:string){this.numwc = e};
    get Numwc():string{return this.numwc;};

    set Numdormitorio(e:string){this.numdormitorio = e};
    get Numdormitorio():string{return this.numdormitorio;};

    set Numestacionamiento(e:string){this.numestacionamiento = e};
    get Numestacionamiento():string{return this.numestacionamiento;};

    set Id(e:string){this.id = e};
    get Id():string{return this.id;};
}

enum ETransaccion{
    Alquiler,
    Venta
}
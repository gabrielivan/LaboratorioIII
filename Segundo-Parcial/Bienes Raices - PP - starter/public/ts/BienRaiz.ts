/// <reference path="anuncio.ts" />

class BienRaiz extends Anuncio{

    private titulo: string;

    constructor(id:any,precio: string, transaccion: ETransaccion, descripcion: string, numwc: string, 
        numdormitorio:string, numestacionamiento:string, titulo:string){
        super(id,precio,transaccion,descripcion, numwc, numdormitorio, numestacionamiento);
        this.titulo = titulo;
    }

    public get Titulo(): string {
        return this.titulo;
    }
    public set Titulo(value: string) {
        this.titulo = value;
    }
}
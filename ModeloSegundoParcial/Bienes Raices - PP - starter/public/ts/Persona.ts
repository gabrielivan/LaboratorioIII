class Persona
{
    protected nombre:string;
    protected apellido:string;
    protected edad:number;
    protected email:string;
    protected sexo:string;
    protected id:any;

    constructor(id:any,nombre: string, apellido: string, edad: number, email: string, sexo:string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.sexo = sexo;
    }

    // Setters & Getters
    set Nombre(e:string){this.nombre = e};
    get Nombre():string{return this.nombre;};

    set Apellido(e:string){this.apellido = e};
    get Apellido():string{return this.apellido;};

    set Edad(e:number){this.edad = e};
    get Edad():number{return this.edad;};
    
    set Email(e:string){this.email = e};
    get Email():string{return this.email;};

    set Sexo(e:string){this.sexo = e};
    get Sexo():string{return this.sexo;};

    set Id(e:string){this.id = e};
    get Id():string{return this.id;};
}

enum tipoLegislador{
    Diputado,
    Senador
}
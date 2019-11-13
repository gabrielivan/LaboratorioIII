let mensaje:string = "Hello world";
console.log(mensaje);

// let mensaje:string | number | boolean = "Hello world";
// console.log(mensaje);

// let mensaje:any = "a";
// console.log(mensaje);

//Array

let vector:number[] = [1,2,3,4];

//Tupla

let tupla:[number, string] = [1, "Iroman"];


//Enum

enum Eheroe{
    Xmen,
    Avenger
}
console.log("Enum...");
console.log(Eheroe.Avenger);
console.log(Eheroe[Eheroe.Avenger]);
console.log(Eheroe[0]);

for(let key in Eheroe){
    console.log(key);
}

//funciones

// let funcionEnviarMision = function(heroe?:string):string{ //parametro opcional (heore)
//     return heroe + " enviado"
// }

let funcionEnviarMision = function(heroe:string = "Spiderman"):string{ //parametro opcional (heore)
    return heroe + " enviado"
}

// let retorno:string = funcionEnviarMision("Spiderman");
// console.log(retorno);

let retorno:string = funcionEnviarMision();
console.log(retorno);

let funcionEnviarMision2 = function(...heroes:string[]):void{
    for(let i = 0; i < heroes.length; i++){
        console.log(heroes[i] + " enviado");
    }
}

funcionEnviarMision2("Spiderman", "Iroman", "Hulk");

//funcion flecha

let funcionEnviarMision3 = (heroe:string="Black Widow"):string=>{
    return heroe + " enviado a mision 3";
}

console.log(funcionEnviarMision3());

//tipo en el objeto
let flash:{nombre:string, edad:number, poderes:string[],getNombre:()=>string} =
{
    nombre:"Barry Allen",
    edad:24,
    poderes:["Corre, Viaja en el tiempo"],
    getNombre(){
        return this.nombre;
    }
}

//tipo personalizado

type Heroe = {nombre:string, edad:number, poderes?:string[],getNombre:()=>string};

let iroman:Heroe = {
    nombre:"Tony Stark",
    edad:24,
    getNombre:function(){return this.nombre;}
}

console.log(iroman.getNombre());
console.log(flash.getNombre());

//Interfaces
interface IHeroe{
    nombre:string,
    poder?:string,
    mostrar?():string
}
let wolverine:IHeroe = {
    nombre:"James",
}

console.log(wolverine.nombre);

//Interfaces en clase
class Avenger implements IHeroe{
    nombre:string = "un avenger";
}

class Mutante implements IHeroe{
    nombre:string = "un mutante";
}

let unAvenger = new Avenger();
let unMutante = new Mutante();

console.log("unAvenger: " + unAvenger.nombre);
console.log("unMutante: " + unMutante.nombre);

//interface en funcion

interface IfuncDosNumeros{
    (num1:number, num2:number):number;
}

let miFuncion:IfuncDosNumeros;

miFuncion = (num1, num2) => num1 + num2;
console.log(miFuncion(2, 3));

//Clases

class Avenger2 implements IHeroe{
    nombre:string = "un avenger";

    constructor(nombre:string){
        this.nombre = nombre;
    }
}

let av2 = new Avenger2("Hulk");
console.log("Clase: " + av2.nombre);

//Clase con atributo privado
class Avenger3{
    private _nombre:string = "un avenger";
    private _edad:number = 0;
    constructor(nombre:string){
        this._nombre = nombre;
    }
    get edad():number{
        return this._edad;
    }
    set edad(e:number){
        this._edad = e;
    }
    public mostrar = ()=> this._nombre;
}

//TODO :  HACERLO CON ANUNCIO SETERS Y GETERS Y CONSTRUCTORES.

let av3 = new Avenger3("Ironman");
    console.log("Clases 2: " + av3.mostrar());

    av3.edad = 35;
    console.log("Edad: " + av3.edad);

//Clases con metodos estaticos

class Xmen{
    static nombre_de_clase = "Xmen";
}

console.log("atributo estatico " + Xmen.nombre_de_clase);

//Herencia

class AvengerHeredado extends Avenger2{

}

let avengerHeredado = new AvengerHeredado("Avenger-Heredado");
console.log(avengerHeredado.nombre);

//Herencia 2
class AvengerHeredado2 extends Avenger2{
    edad:number = 0;
    constructor(nombre:string, edad:number){
        super(nombre);
        this.edad = edad;
    }
}

let avengerHeredado2 = new AvengerHeredado2("Heredad", 44)
console.log("heredado2: " + avengerHeredado2.edad + " nombre: " + avengerHeredado2.nombre);

//namesspaces

namespace Funciones{
    export function f1(){
        console.log("Yo soy la f1");
    }
    export function f2(){
        console.log("Yo soy la f2");
    }
}

Funciones.f1();
Funciones.f2();

$(function(){
    console.log("ready");
})

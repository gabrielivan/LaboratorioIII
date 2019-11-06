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
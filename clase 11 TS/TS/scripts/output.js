"use strict";
var mensaje = "Hello world";
console.log(mensaje);
// let mensaje:string | number | boolean = "Hello world";
// console.log(mensaje);
// let mensaje:any = "a";
// console.log(mensaje);
//Array
var vector = [1, 2, 3, 4];
//Tupla
var tupla = [1, "Iroman"];
//Enum
var Eheroe;
(function (Eheroe) {
    Eheroe[Eheroe["Xmen"] = 0] = "Xmen";
    Eheroe[Eheroe["Avenger"] = 1] = "Avenger";
})(Eheroe || (Eheroe = {}));
console.log("Enum...");
console.log(Eheroe.Avenger);
console.log(Eheroe[Eheroe.Avenger]);
console.log(Eheroe[0]);
for (var key in Eheroe) {
    console.log(key);
}
//funciones
// let funcionEnviarMision = function(heroe?:string):string{ //parametro opcional (heore)
//     return heroe + " enviado"
// }
var funcionEnviarMision = function (heroe) {
    if (heroe === void 0) { heroe = "Spiderman"; }
    return heroe + " enviado";
};
// let retorno:string = funcionEnviarMision("Spiderman");
// console.log(retorno);
var retorno = funcionEnviarMision();
console.log(retorno);
/// <reference path="hello.ts" />
var mens = "Goodbye";
console.log(mens);
//# sourceMappingURL=output.js.map
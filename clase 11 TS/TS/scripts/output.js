"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var funcionEnviarMision2 = function () {
    var heroes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        heroes[_i] = arguments[_i];
    }
    for (var i = 0; i < heroes.length; i++) {
        console.log(heroes[i] + " enviado");
    }
};
funcionEnviarMision2("Spiderman", "Iroman", "Hulk");
//funcion flecha
var funcionEnviarMision3 = function (heroe) {
    if (heroe === void 0) { heroe = "Black Widow"; }
    return heroe + " enviado a mision 3";
};
console.log(funcionEnviarMision3());
//tipo en el objeto
var flash = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["Corre, Viaja en el tiempo"],
    getNombre: function () {
        return this.nombre;
    }
};
var iroman = {
    nombre: "Tony Stark",
    edad: 24,
    getNombre: function () { return this.nombre; }
};
console.log(iroman.getNombre());
console.log(flash.getNombre());
var wolverine = {
    nombre: "James",
};
console.log(wolverine.nombre);
//Interfaces en clase
var Avenger = /** @class */ (function () {
    function Avenger() {
        this.nombre = "un avenger";
    }
    return Avenger;
}());
var Mutante = /** @class */ (function () {
    function Mutante() {
        this.nombre = "un mutante";
    }
    return Mutante;
}());
var unAvenger = new Avenger();
var unMutante = new Mutante();
console.log("unAvenger: " + unAvenger.nombre);
console.log("unMutante: " + unMutante.nombre);
var miFuncion;
miFuncion = function (num1, num2) { return num1 + num2; };
console.log(miFuncion(2, 3));
//Clases
var Avenger2 = /** @class */ (function () {
    function Avenger2(nombre) {
        this.nombre = "un avenger";
        this.nombre = nombre;
    }
    return Avenger2;
}());
var av2 = new Avenger2("Hulk");
console.log("Clase: " + av2.nombre);
//Clase con atributo privado
var Avenger3 = /** @class */ (function () {
    function Avenger3(nombre) {
        var _this = this;
        this._nombre = "un avenger";
        this._edad = 0;
        this.mostrar = function () { return _this._nombre; };
        this._nombre = nombre;
    }
    Object.defineProperty(Avenger3.prototype, "edad", {
        get: function () {
            return this._edad;
        },
        set: function (e) {
            this._edad = e;
        },
        enumerable: true,
        configurable: true
    });
    return Avenger3;
}());
//TODO :  HACERLO CON ANUNCIO SETERS Y GETERS Y CONSTRUCTORES.
var av3 = new Avenger3("Ironman");
console.log("Clases 2: " + av3.mostrar());
av3.edad = 35;
console.log("Edad: " + av3.edad);
//Clases con metodos estaticos
var Xmen = /** @class */ (function () {
    function Xmen() {
    }
    Xmen.nombre_de_clase = "Xmen";
    return Xmen;
}());
console.log("atributo estatico " + Xmen.nombre_de_clase);
//Herencia
var AvengerHeredado = /** @class */ (function (_super) {
    __extends(AvengerHeredado, _super);
    function AvengerHeredado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AvengerHeredado;
}(Avenger2));
var avengerHeredado = new AvengerHeredado("Avenger-Heredado");
console.log(avengerHeredado.nombre);
//Herencia 2
var AvengerHeredado2 = /** @class */ (function (_super) {
    __extends(AvengerHeredado2, _super);
    function AvengerHeredado2(nombre, edad) {
        var _this = _super.call(this, nombre) || this;
        _this.edad = 0;
        _this.edad = edad;
        return _this;
    }
    return AvengerHeredado2;
}(Avenger2));
var avengerHeredado2 = new AvengerHeredado2("Heredad", 44);
console.log("heredado2: " + avengerHeredado2.edad + " nombre: " + avengerHeredado2.nombre);
//namesspaces
var Funciones;
(function (Funciones) {
    function f1() {
        console.log("Yo soy la f1");
    }
    Funciones.f1 = f1;
    function f2() {
        console.log("Yo soy la f2");
    }
    Funciones.f2 = f2;
})(Funciones || (Funciones = {}));
Funciones.f1();
Funciones.f2();
$(function () {
    console.log("ready");
});
/// <reference path="hello.ts" />
var mens = "Goodbye";
console.log(mens);
//# sourceMappingURL=output.js.map
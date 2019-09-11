// var x = function() {
//     return 4 + 3;
// }

//x();

//var x = {};

// var x = {
//     nombre: "Juan",
//     apellido: "Perez",
//     edad: 30,
//     saludar: function() {
//         return "Hola, me llamo " + this.nombre;
//     }
// }

// function Persona(nombre, apellido, edad) {
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.edad = edad;
//     this.saludar = function() {
//         return "Holo, me llamo " + this.nombre;
//     }
// }

// var p1 = new Persona("Jose", "Alvarez", 34);
// var p2 = new Persona("Ana", "Gonzales", 20);

// Persona.prototype.altura = 0;

// p1.altura = 1.67;

// console.log(p1.saludar());
// console.log(p2.saludar());
// console.log(p1.altura);
// console.log(p2.altura);


//console.log(x);
//console.log(x.saludar());

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var x;

// function foo(a, b, c) {
//     console.log(arguments);
// }

// function foo(a, b, c) {
//     console.log(arguments[0]);
// }

// function foo(a, b, c) {
//     console.log(arguments.length);
// }

// function foo(a, b, c) {
//     if (!c) {
//         c = 10;
//     }
//     console.log(a, b, c);
// }

function foo(a, b, c) {
    if (!c) {
        c = 10;
    }
    var x = a + b + c;
    console.log(a, b, c);
}


x = foo;
// foo();

// x(23, 12, 40);
// x(23, 12);
// x(23, 12, 35, 45, 66, 77);
// x(23, 12);
// x(23, null, 100);
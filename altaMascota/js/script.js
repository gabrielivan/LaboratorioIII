var frm;

window.addEventListener("load", inicializarManejadores);

function inicializarManejadores(){

    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
}

function manejadorSubmit(e){
    e.preventDefault();

     let nuevaMascota = obtenerMascota(e.target);
     //console.log(nuevaMascota);
     mascotas.push(nuevaMascota);
    //  console.log(mascotas);
    document.getElementById("divTabla").innerHTML = "";
    document.getElementById("divTabla").appendChild(crearTabla(mascotas));

}

function obtenerMascota(frm){
    let nombre;
    let edad;
    let tipo;
    let vacunado;
    let desparasitado;
    let castrado;
    let alimento;
    
    for(elemento of frm.elements){

        switch(elemento.name){
            case "nombre":
                nombre = elemento.value;
            break;

            case "edad":
                edad = parseInt(elemento.value);
            break;

            case "tipo":
                if(elemento.checked){
                    tipo = elemento.value;
                }
            break;

            case "vacunado":
                vacunado = elemento.checked;
            break;

            case "desparasitado":
                desparasitado = elemento.checked;
            break;

            case "castrado":
                castrado = elemento.checked;
            break;

            case "alimento":
                alimento = elemento.value;
            break;
        }
    }

    return new Mascota(nombre, edad, tipo, castrado, vacunado, desparasitado, alimento);
}












// function operar(a, b, callback){
//     return callback(a, b);
// }

// console.log("la respuesta es " + operar(4, 5, restar));

// function sumar(x, y){
//     return x + y;
// }

// function restar(x, y){
//     return x - y;
// }

// function multiplicar(x, y){
//     return x * y;
// }

// function dividir(x, y){
//     let z;
//     if(x != 0){
//         z = x / y;
//     }
//     return z;
// }
//console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function(usuarios){
    return usuarios
    .filter(function(user){
        return user.genero === 'Female';
    })
    .map(function(user){
        return user.nombre;
    });
}

//console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function(usuarios){
   return usuarios
   .filter(function(user){
       return user.genero === "Male";
   })
   .map(function(user){
       return user.email;
   });
}

//console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

var usuariosNombreEmailEdad = function(usuario){
    return {
        "nombre": usuario.nombre,
        "email": usuario.email,
        "edad": usuario.edad
    }
}

soluciones.usuariosMayores = function(usuarios, edad){    
    return usuarios
    .filter(function(user){
        return user.edad > edad;
    })
    .map(function(user){
        return usuariosNombreEmailEdad(user);
    });
}

//console.log(soluciones.usuariosMayores(data, 40));

  // Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

    var valorMayor = function(objetoUno, objetoDos){
        if(objetoUno.edad > objetoDos.edad){
            return objetoUno;
        }
        else {
            return objetoDos;
        }
    }

  soluciones.usuarioMasGrande = function(usuarios){ 
    return usuarios
    .map(function(user){
        return {
            "nombre" : user.nombre,
            "edad" : user.edad
        }
    })
    .reduce(function(valorAnterior, valorActual, indice, array){
        return valorMayor(valorAnterior, valorActual);
    });
}

//console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function(usuarios){
    return usuarios
    .map(function(user){
        return user.edad;
    })
    .reduce(function(valorAnterior, valorActual, indice, array){
        return valorAnterior + valorActual / array.length;
    }, 0);
    
}

//console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function(usuarios){
   return usuarios
   .filter(function(user){
        return user.genero === "Male";
   })
   .map(function(user){
       return user.edad;
   })
   .reduce(function(valorAnterior, valorActual, indice, array){
        return valorAnterior + valorActual / array.length;
   }, 0);
}

//console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

 // Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function(usuarios){
    return usuarios
    .filter(function(user){
         return user.genero === "Female";
    })
    .map(function(user){
        return user.edad;
    })
    .reduce(function(valorAnterior, valorActual, indice, array){
         return valorAnterior + valorActual / array.length;
    }, 0);
}

//console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));
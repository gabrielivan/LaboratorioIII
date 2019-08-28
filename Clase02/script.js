var btnSaludar;

window.addEventListener('load', function(){
    btnSaludar = document.getElementById('btnSaludar');
    
    // btnSaludar.onClick = function(){
    //     console.log('Hola');
    // }
      
    btnSaludar.addEventListener('click', function(){
        console.log("Hola");
    });
    btnSaludar.addEventListener('click', function(){
        console.log("Chau");
    });
});

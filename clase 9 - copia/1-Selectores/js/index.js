$(function(){
    $("#btnEnviar").click(function(){
        alert("Hiciste click en el boton");
    })

    $("p").hover(function(){
        console.log("Hola");
    },

    function(){
        console.log("Chau!");
    })

    $("p.rojo").on("click", function(){

    })

    $("p.rojo").on({
        "click": function(){
            console.log("has dado click");
        },
        "mouseenter": function(){
            console.log("hola");
        },
        "mouseleave": function(){
            console.log("chau");
        }
    })

    $("p.rojo").off("click");
})
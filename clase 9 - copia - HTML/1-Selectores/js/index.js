$(function(){
    $("#btnEnviar").click(function(){
        console.log($("p").text());
        console.log($("p.rojo").html());
        console.log($("#btnEnviar").val());
        console.log($("#btnEnviar").attr("id"));
    })

    $("#btnCambiar").click(function(){
        $("p.rojo").text("Este es el nuevo texto del parrafo rojo");
        $("p:last").html("<strong> Este parrafo va en negrita </strong>");
        //Si no me interesa pisar el html lo appendeo, es decir que no lo borro sino que agrego mas html
        $("p:last").html(function(i, prevHTML){
            return prevHTML + " Agrego mas HTML ";
        });
        $("#btnCambiar").val("Nuevo Cambiar");

        $("#btnCambiar").attr("class", "azul");

        $("#btnEnviar").attr({
            "class": "azul",
            "miAtributo": "miValor"
        });

        $("#btnEnviar").attr("class", function(i, prevValue){
            console.log("Clase anterior: " + prevValue);
            return "rojo";
        });

        // var boton = $("<input>").val("Nuevo Boton").attr("type", "button");
        // $("#btnCambiar").after(boton);

        var boton = $("<input>").val("Nuevo Boton").attr("type", "button");
        $("#btnCambiar").before(boton);

        // $("body").append(boton);
        
        $("body").prepend(boton);
    })

})
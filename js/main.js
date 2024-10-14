let entrada =  prompt ("ingrese la opción deseada"+ "\n"+"1-Entra"+"\n"+"2-Sale"+"\n"+"3-Autos ingresados"+"\n"+"4-Resumen del día"+"\n"+"5-Salir");
let patente = 0;
let clase = "";
const autos = [];
const resumen = [];


while(entrada != "5"){
    
    switch(entrada){
        case "1":
            console.log("Ingresa vehículo")
            patente = prompt("ingresa los 3 números de la patente") ;
            if(patente.length > 3 && patente.length < 3){
                alert ("Error en formato de fatente, por favor ingrese nuevamente la patente")
                patente = prompt("ingresa los 3 números de la patente") ;
            }else
            ingresar(patente);
            break;
        case "2":
            console.log("salida de vehiculo");
            patente = prompt("ingresa los 3 números de la patente") ;
            eliminar(patente);
            break;
        case "3":
            console.log("Autos en playa");
            autos.sort();
            console.log(autos.join(" "+ "\n"));
            console.log("Hay "+autos.length + "autos en playa");
            break;
        case "4" :
            console.log("Resumen diario de vahículos");
            console.log(resumen.join(" "+ "\n"));
            break;
        default :
        console.log("Error, ingrese una opcion válida");
            break;
    }
    entrada =  prompt ("ingrese la opción deseada"+ "\n"+"1-Entra"+"\n"+"2-Sale"+"\n"+"3-Autos ingresados"+"\n"+"4-Resumen del día"+"\n"+"5-Salir");
}

function ingresar (patente) {
    if (autos.includes(patente)) {
        alert ("Este auto ya fue ingresado"); 
    }else{
        autos.push(patente);
        resumen.push(patente);
    }
    
}

function eliminar (patente){
    if(autos.includes(patente)){
        if(autos.indexOf(patente) >= 0)
            autos.splice(autos.indexOf(patente) , 1)
    }else{
        console.log("el auto no se encuentra en la lista")
    }
}
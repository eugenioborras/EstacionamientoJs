let entrada =  prompt ("ingrese la opción deseada"+ "\n"+"1-Entra"+"\n"+"2-Sale"+"\n"+"3-Editar Patente"+"\n"+"4-Autos ingresados"+"\n"+"5-Resumen del día"+"\n"+"6-Salir");
let patente = 0;
const autos = [];
const resumen = [];
let nuevaPatente = 0;

while(entrada != "6"){
    
    switch(entrada){
        case "1":
            console.log("Ingresa vehículo")
            patente = prompt("ingresa los 3 números de la patente") ;
            ingresar(patente);
            break;
        case "2":
            console.log("salida de vehiculo");
            patente = prompt("ingresa los 3 números de la patente") ;
            eliminar(patente);
            break;
        case "3":
            console.log("Editar Patente");
            patente = prompt("Ingresa la patente a editar");
            editar(patente);
            break;
        case "4":
            console.log("Autos en playa");
            autos.sort();
            console.log(autos.join(" "+ "\n"));
            console.log("Hay "+autos.length + " autos en playa");
            break;
        case "5" :
            console.log("Resumen diario de vahículos");
            console.log(resumen.join(" "+ "\n"));
            break;
        default :
        alert("Error, ingrese una opcion válida");
            break;
    }
    entrada =  prompt ("ingrese la opción deseada"+ "\n"+"1-Entra"+"\n"+"2-Sale"+"\n"+"3-Modificar Patente"+"\n"+"4-Autos ingresados"+"\n"+"5-Resumen del día"+"\n"+"6-Salir");
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
            autos.splice(autos.indexOf(patente) , 1);
    }else{
        alert("el auto no se encuentra en la lista");
    }
}

function editar(patente){
    if(autos.includes(patente)){
        if(autos.indexOf(patente) >= 0)
            nuevaPatente = prompt ("Ingrese la nueva patente")
            autos.splice(autos.indexOf(patente) , 1, nuevaPatente);
            resumen.splice(resumen.indexOf(patente) , 1, nuevaPatente);
            console.log("Patente editada exitosamente")
    }else{
        alert("el auto no se encuentra en la lista");
    }
}
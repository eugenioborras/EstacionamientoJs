let container = document.getElementById("contenedorMensuales")

fetch("../db/data.json")
.then(response => response.json())
.then(data =>{
    data.forEach(mensual => {
        const lista = document.createElement("div")
        lista.innerHTML =`<h2 class="border-bottom text-center">Nombre y Apellido: ${mensual.nombre}</h2>
                          <h3 class="border-bottom text-center">Patente: ${mensual.patente}</h3>
                          <h4 class="border-bottom text-center">Clase: ${mensual.clase}</h4>
                          <h5 class="border-bottom text-center">Telefono: ${mensual.tel}</h5>`
        
        container.appendChild(lista)
    });
    })

    
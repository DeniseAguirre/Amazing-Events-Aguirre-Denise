// crear el contenedor 
const contenedor = document.getElementById('cards-upcoming')
// obtener los datos en una variable
const eventos = fechasProximas(data.eventos);
//invocar a la función
imprimirArticle(eventos, contenedor);



// crear el article
function crearArticle(evento){
    return ` <article class="card border-black col-11 col-md-4 col-xl-3">
    <img class="card-img-top" src="${evento.image}" alt=""></img>
    <div class="card-body">
        <span class="date">${evento.date}</span>
        <h4 class="card-title">${evento.name}</h4>
        <p class="card-text">${evento.description}</p>
    </div>
    <div class="card-footer c-footer d-flex justify-content-between align-items-center">
        <span>Price: $${evento.price}</span>
        <a href="./details.html" class="btn btn-dark">Details</a>
    </div>
</article>
`
}

//filtra los articulos por fechas actuales y proximas
function fechasProximas(listaEventos){
    const fechaActual = data.fechaActual
    let aux=[]
    for (let evento of listaEventos) {
        if(evento.date >= fechaActual) {
            aux.push(evento)
        }
    } 
    return aux;
}

// mandar los articulos filtrados al HTML
function imprimirArticle (listaEventos, elementoHTML) {
    // crear el template
    let template = ` `
    // traer todos los eventos al template
    for (let evento of listaEventos) {
        template += crearArticle(evento)
    }
    // asignar el espacio donde va a estar el template
    elementoHTML.innerHTML = template
    
}
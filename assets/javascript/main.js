// crear el contenedor 
const contenedor = document.getElementById('cards-home')
// obtener los datos en una variable
const eventos = data.eventos

imprimirArticle(eventos, contenedor);

// crear el article
function crearArticle(evento){
    return ` <article class="card col-11 col-md-5 col-xl-3 m-2">
    <img class="card-img-top" src="${evento.image}" alt=""></img>
    <div class="card-body">
        <span class="date">${evento.date}</span>
        <h4 class="card-title">${evento.name}</h4>
        <p class="card-text">${evento.description}</p>
    </div>
    <div class="card-footer c-footer d-flex justify-content-between align-items-center">
        <span>Price: $${evento.price}</span>
        <a href="../assets/pages/details.html" class="btn btn-dark">Details</a>
    </div>
</article>
`
}

// mandar los articulos al HTML
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



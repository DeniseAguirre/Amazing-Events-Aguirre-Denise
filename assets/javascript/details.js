const container = document.getElementById('detail-event')
// console.log([document])
const events = data.eventos
//buscanos y asignamos el valor del document location search
let urlParams = location.search;
// extraemos el valor del url paraments con el metodo get de urlsearchparaments lo que hace es devolver el valor del parametro con la clave especificada
let params = new URLSearchParams(urlParams)
let idName = params.get('id');

//Filtrar
let eventFound = events.find((event) => event.name === idName)
console.log(eventFound)

function paintDetailEvent(event){
    let template = "";
    template = `
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src="${event.image}" class="card-img img-details"
                            alt="${event.name}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body m-3">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <ul class="list-details">
                                <li>date: ${event.date}</li>
                                <li>category: ${event.category}</li>
                                <li>place: ${event.place}</li>
                                <li>capacity: ${event.capacity}</li>
                                <li>price: ${event.price}</li>
                            </ul>
                        </div>
                    </div>
                </div>`
            container.innerHTML = template;
}

paintDetailEvent(eventFound);
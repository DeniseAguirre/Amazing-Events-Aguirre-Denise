import { paintDetailEvent } from "../javascript/module/funciones.js";

const container = document.getElementById('detail-event')

let eventsData, urlParams, params, id, eventFound;

//petición
const url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url) 
    .then(response => response.json())
    .then (datos => {
        
            eventsData = datos.events

            urlParams = location.search;

            // extraemos el valor del url paraments con el metodo get de urlsearchparaments lo que hace es devolver el valor del parametro con la clave especificada
            params = new URLSearchParams(urlParams)
            
            id = params.get('id');
            
            eventFound = eventsData.find((event) => event._id == id)

            paintDetailEvent(eventFound, container);
            
    })
    .catch(err => console.log("Error :", err))


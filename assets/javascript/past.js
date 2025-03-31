import {printCards, printCheckbox, crossFilter } from "../javascript/module/funciones.js";

const container = document.getElementById('cards-past');
const containerCheckbox = document.getElementById('category-js')
const containerSearch = document.getElementById('search-js')

let eventsData, referenceDate, eventsPast, arrayCategories;


//petición
const url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url) 
    .then(response => response.json())
    .then (datos => {
        
            referenceDate = datos.currentDate
            
            eventsData = datos.events

            eventsPast = eventsData.filter(events => events.date < referenceDate);

            arrayCategories = [ ... new Set(eventsData.map(event => event.category))]

            printCheckbox(arrayCategories, containerCheckbox)

            printCards(eventsPast, container, "./details.html"); 

    })
    .catch(err => console.log("Error :", err))



//evenListeners
containerCheckbox.addEventListener("change",() => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const inputSearch = document.getElementById('search-js');
    const selectedCategories = Array.from(checkboxes)
                                        .filter((checkbox) => checkbox.checked)
                                        .map((checkbox) => checkbox.value);

    const filteredEvents = crossFilter(eventsData, selectedCategories.length === 0 ? arrayCategories : selectedCategories, inputSearch.value)
    printCards(filteredEvents, container);
});

containerSearch.addEventListener("input",() => {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const inputSearch = document.getElementById('search-js');
    const selectedCategories = Array.from(checkboxes)
                                        .filter((checkbox) => checkbox.checked)
                                        .map((checkbox) => checkbox.value);

    const filteredEvents = crossFilter(eventsData, selectedCategories.length === 0 ? arrayCategories : selectedCategories, inputSearch.value)

    printCards(filteredEvents, container);
});

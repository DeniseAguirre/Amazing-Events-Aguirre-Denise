import { printCards, printCheckbox, crossFilter } from "../javascript/module/funciones.js";

const container = document.getElementById("cards-home");
const containerCheckbox = document.getElementById("category-js");
const containerSearch = document.getElementById("search-js");

let eventsData, arrayCategories;

//petición
const url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url) 
    .then(response => response.json())
    .then (datos => {
            
            eventsData = datos.events

            arrayCategories = [ ... new Set(eventsData.map(event => event.category))]

            printCheckbox(arrayCategories, containerCheckbox);

            printCards(eventsData, container, "../assets/pages/details.html");
            
    })
    .catch(err => console.log("Error :", err))


//evenListeners
containerCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".form-check-input");
    const inputSearch = document.getElementById("search-js");
    const selectedCategories = Array.from(checkboxes)
                                    .filter((checkbox) => checkbox.checked)
                                    .map((checkbox) => checkbox.value);

    const filteredEvents = crossFilter(eventsData,
    selectedCategories.length === 0 ? arrayCategories : selectedCategories,
    inputSearch.value
    );
    printCards(filteredEvents, container);
});

containerSearch.addEventListener("input", () => {
    const checkboxes = document.querySelectorAll(".form-check-input");
    const inputSearch = document.getElementById("search-js");
    const selectedCategories = Array.from(checkboxes)
                                    .filter((checkbox) => checkbox.checked)
                                    .map((checkbox) => checkbox.value);

    const filteredEvents = crossFilter(eventsData,
    selectedCategories.length === 0 ? arrayCategories : selectedCategories,
    inputSearch.value
    );

    printCards(filteredEvents, container);
});

import {
  printCards,
  printCheckbox,
  crossFilter,
} from "../javascript/module/funciones.js";
import { datos } from "../data/data.js";

const container = document.getElementById("cards-home");
const containerCheckbox = document.getElementById("category-js");
const containerSearch = document.getElementById("search-js");

let eventsData = datos.events;
let arrayCategories = [...new Set(eventsData.map((event) => event.category))]; // Extraemos las categorías únicas

printCheckbox(arrayCategories, containerCheckbox);
printCards(eventsData, container, "../assets/pages/details.html");

containerCheckbox.addEventListener("change", filterEvents);
containerSearch.addEventListener("input", filterEvents);

function filterEvents() {
  const checkboxes = document.querySelectorAll(".form-check-input");
  const inputSearch = document.getElementById("search-js");
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filteredEvents = crossFilter(
    eventsData,
    selectedCategories.length === 0 ? arrayCategories : selectedCategories,
    inputSearch.value
  );

  printCards(filteredEvents, container);
}

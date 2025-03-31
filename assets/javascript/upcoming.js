import {
  printCards,
  printCheckbox,
  crossFilter,
} from "../javascript/module/funciones.js";
import { datos } from "../data/data.js";

const container = document.getElementById("cards-upcoming");
const containerCheckbox = document.getElementById("category-js");
const containerSearch = document.getElementById("search-js");

let referenceDate = datos.currentDate;
let eventsData = datos.events;
let eventsUpcoming = eventsData.filter((event) => event.date >= referenceDate);
let arrayCategories = [...new Set(eventsData.map((event) => event.category))];

printCheckbox(arrayCategories, containerCheckbox);
printCards(eventsUpcoming, container, "./details.html");

containerCheckbox.addEventListener("change", filterEvents);
containerSearch.addEventListener("input", filterEvents);

function filterEvents() {
  const checkboxes = document.querySelectorAll(".form-check-input");
  const inputSearch = document.getElementById("search-js");
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filteredEvents = crossFilter(
    eventsUpcoming,
    selectedCategories.length === 0 ? arrayCategories : selectedCategories,
    inputSearch.value
  );

  printCards(filteredEvents, container);
}

const container = document.getElementById("cards-home");

const containerCheckbox = document.getElementById("category-js");

const containerInput = document.getElementById("inlineCheckbox1");

const containerSearch = document.getElementById("search-js");

const eventsData = data.eventos;

const categoriesCheckbox = eventsData.map((event) => event.category);

const setCategories = new Set(categoriesCheckbox);

const arrayCategories = Array.from(setCategories);

printCheckbox(arrayCategories, containerCheckbox);

printCards(eventsData, container);

//evenListeners
containerCheckbox.addEventListener("change", () => {
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
});

containerSearch.addEventListener("input", () => {
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
});

//Funciones
function cardTemplate(event) {
    return ` <article class="card col-11 col-md-5 col-xl-3 m-2">
    <img class="card-img-top" src="${event.image}" alt=""></img>
    <div class="card-body">
        <span class="date">${event.date}</span>
        <h4 class="card-title">${event.name}</h4>
        <p class="card-text">${event.description}</p>
    </div>
    <div class="card-footer c-footer d-flex justify-content-between align-items-center">
        <span>Price: $${event.price}</span>
        <a href="../assets/pages/details.html?id=${event.name}" class="btn btn-dark btn-details">Details</a>
    </div>
</article>
`;
}

function printCards(eventList, place) {
    let template = ` `;
    for (let event of eventList) {
    template += cardTemplate(event);
    }
    if (eventList.length === 0) {
    template = `<h4>No se encontraron resultados</h4>`;
    }
    place.innerHTML = template;
}

function printCheckbox(categories, place) {
    let template = "";
    for (let category of categories) {
        template += `   <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" onchange="">
                            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                        </div>
`;
    }
    place.innerHTML += template;
}

function filterCategories(events, categories) {
    const categoriesFound = events.filter((event) =>
    categories.includes(event.category)
    );
    return categoriesFound;
}

function filterText(events, text) {
    return events.filter((event) =>
    event.name.toLowerCase().includes(text.toLowerCase())
    );
}

function crossFilter(events, category, text) {
    const resultFilterCategories = filterCategories(events, category);
    const resultFilterText = filterText(resultFilterCategories, text);
    return resultFilterText;
}

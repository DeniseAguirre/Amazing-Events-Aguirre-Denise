//CARDS
export function cardTemplate(event, detailsUrl) {
    return ` <article class="card col-11 col-md-5 col-xl-3 m-2">
    <img class="card-img-top" src="${event.image}" alt=""></img>
    <div class="card-body">
        <span class="date">${event.date}</span>
        <h4 class="card-title">${event.name}</h4>
        <p class="card-text">${event.description}</p>
    </div>
    <div class="card-footer c-footer d-flex justify-content-between align-items-center">
        <span>Price: $${event.price}</span>
        <a href="${detailsUrl}?id=${event._id}" class="btn btn-dark btn-details">Details</a>
    </div>
</article> `;
}

export function printCards(eventList, place, detailsUrl) {
    let template = ` `;
    for (let event of eventList) {
    template += cardTemplate(event, detailsUrl);
    }
    if (eventList.length === 0) {
    template = `<h4>No se encontraron resultados</h4>`;
    }
    place.innerHTML = template;
}

//FILTER
export function printCheckbox(categories, place) {
    let template = "";
    for (let category of categories) {
        template += `   <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" onchange="">
                            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                        </div>  `;
    }
    place.innerHTML += template;
}

export function filterCategories(events, categories) {
    const categoriesFound = events.filter((event) =>
    categories.includes(event.category)
    );
    return categoriesFound;
}

export function filterText(events, text) {
    return events.filter((event) =>
    event.name.toLowerCase().includes(text.toLowerCase())
    );
}

export function crossFilter(events, category, text) {
    const resultFilterCategories = filterCategories(events, category);
    const resultFilterText = filterText(resultFilterCategories, text);
    return resultFilterText;
}

//DETAILS
export function paintDetailEvent(event, container){
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

//STATS
export function tableTemplateStatistic(max, high, min, lowest, larger) {
    return `<tr class="text-center">
                <td>${max.name} ${high.toFixed(2)} %</td>
                <td>${min.name} ${lowest.toFixed(2)} %</td>
                <td>${larger.name} ${larger.capacity}</td>
            </tr>
`;
}

export function printTableStatistics(max, high, min, lowest, larger, place) {
    let template = ` `;
    
    template = tableTemplateStatistic(max, high, min, lowest, larger)
    
    place.innerHTML = template;
}

export function tableByCategoryTemplate(category) {
    return `<tr class="text-center">
                <td>${category.category}</td>
                <td>${category.revenue}</td>
                <td>${(category.attendance/category.events).toFixed(2)} %</td>
            </tr>
`;
}

export function printTableByCategory(eventList, place) {
    let template = ` `;
    for (let events of eventList) {
    template += tableByCategoryTemplate(events);
    }
    
    place.innerHTML = template;
}




import { printTableStatistics, printTableByCategory } from "../javascript/module/funciones.js";

const containerTableEvents = document.getElementById('events-statistics');
const containerTableUpcoming = document.getElementById('statistics-upcoming');
const containerTablePast = document.getElementById('statistics-past');

let referenceDate, eventsData, eventsUpcoming, eventsPast;

//petición
const url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url) 
    .then(response => response.json())
    .then (datos => {

            referenceDate = datos.currentDate

            eventsData = datos.events

            eventsUpcoming = eventsData.filter(events => events.date >= referenceDate);

            eventsPast = eventsData.filter(events => events.date < referenceDate);

            //TABLE 1
            // Highest Attendance 

            let eventMax = eventsPast.reduce((previousEvent, currentEvent) => (previousEvent.assistance / previousEvent.capacity) > (currentEvent.assistance / currentEvent.capacity) ? previousEvent : currentEvent);

            let highestAttendance = (eventMax.assistance / eventMax.capacity) * 100;

            //Lowest Attendance

            let eventMin = eventsPast.reduce((previousEvent, currentEvent) => (previousEvent.assistance / previousEvent.capacity) < (currentEvent.assistance / currentEvent.capacity) ? previousEvent : currentEvent);
            console.log(eventMin)

            let lowestAttendance = (eventMin.assistance / eventMin.capacity) * 100;
            console.log(lowestAttendance)

            //Larger Capacity 

            let eventLargerCapacity = eventsData.reduce((previousEvent, currentEvent) =>  previousEvent.capacity > currentEvent.capacity ? previousEvent : currentEvent);
            
            let firstLargerCapacity = eventsData.find(objeto => objeto.capacity == eventLargerCapacity.capacity);
            console.log(firstLargerCapacity)

            printTableStatistics(eventMax, highestAttendance, eventMin,  lowestAttendance, firstLargerCapacity, containerTableEvents)

            //TABLE 2
            //Upcoming events statistics by category

            let UpcomingCategories = eventsUpcoming.reduce((acc, curr) => {
            
                if (curr.category in acc) {
                    acc[curr.category].category = curr.category
                    acc[curr.category].events += 1,
                    acc[curr.category].attendance += (curr.estimate * 100 / curr.capacity)
                    acc[curr.category].revenue += curr.price * curr.estimate
                    

                } else {
                    acc[curr.category] = {
                    category: curr.category,
                    events: 1,
                    attendance: (curr.estimate * 100 / curr.capacity),
                    revenue: curr.price * curr.estimate,
                };
            }
            
            return acc;
            }, {});

            printTableByCategory(Object.values(UpcomingCategories), containerTableUpcoming)

            //TABLE 3
            //Past events statistics by category

            let PastCategories = eventsPast.reduce((acc, curr) => {
            
                if (curr.category in acc) {
                    acc[curr.category].category = curr.category
                    acc[curr.category].events += 1,
                    acc[curr.category].attendance += (curr.assistance
                        * 100 / curr.capacity)
                    acc[curr.category].revenue += curr.price * curr.assistance

                } else {
                    acc[curr.category] = {
                    category: curr.category,
                    events: 1,
                    attendance: (curr.assistance
                        * 100 / curr.capacity),
                    revenue: curr.price * curr.assistance
                    ,
                };
            }            
            return acc;
            }, {});
        
            printTableByCategory(Object.values(PastCategories), containerTablePast)

    })
    .catch(err => console.log("Error :", err))




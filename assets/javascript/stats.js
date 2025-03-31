import { datos } from "../data/data.js";
import {
  printTableStatistics,
  printTableByCategory,
} from "../javascript/module/funciones.js";

const containerTableEvents = document.getElementById("events-statistics");
const containerTableUpcoming = document.getElementById("statistics-upcoming");
const containerTablePast = document.getElementById("statistics-past");

let referenceDate = datos.currentDate;
let eventsData = datos.events;

let eventsUpcoming = eventsData.filter((event) => event.date >= referenceDate);
let eventsPast = eventsData.filter((event) => event.date < referenceDate);

// 🏆 Highest Attendance
let eventMax = eventsPast.reduce((prev, curr) =>
  prev.assistance / prev.capacity > curr.assistance / curr.capacity
    ? prev
    : curr
);
let highestAttendance = (eventMax.assistance / eventMax.capacity) * 100;

// 🛑 Lowest Attendance
let eventMin = eventsPast.reduce((prev, curr) =>
  prev.assistance / prev.capacity < curr.assistance / curr.capacity
    ? prev
    : curr
);
let lowestAttendance = (eventMin.assistance / eventMin.capacity) * 100;

// 🎟️ Larger Capacity
let eventLargerCapacity = eventsData.reduce((prev, curr) =>
  prev.capacity > curr.capacity ? prev : curr
);

printTableStatistics(
  eventMax,
  highestAttendance,
  eventMin,
  lowestAttendance,
  eventLargerCapacity,
  containerTableEvents
);

// 📅 Upcoming Events by Category
let UpcomingCategories = eventsUpcoming.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = {
      category: curr.category,
      events: 0,
      attendance: 0,
      revenue: 0,
    };
  }
  acc[curr.category].events += 1;
  acc[curr.category].attendance += (curr.estimate * 100) / curr.capacity;
  acc[curr.category].revenue += curr.price * curr.estimate;
  return acc;
}, {});

printTableByCategory(Object.values(UpcomingCategories), containerTableUpcoming);

// ⏳ Past Events by Category
let PastCategories = eventsPast.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = {
      category: curr.category,
      events: 0,
      attendance: 0,
      revenue: 0,
    };
  }
  acc[curr.category].events += 1;
  acc[curr.category].attendance += (curr.assistance * 100) / curr.capacity;
  acc[curr.category].revenue += curr.price * curr.assistance;
  return acc;
}, {});

printTableByCategory(Object.values(PastCategories), containerTablePast);

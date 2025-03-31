import { datos } from "../data/data.js";
import { paintDetailEvent } from "../javascript/module/funciones.js";

const container = document.getElementById("detail-event");

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");

const eventFound = datos.events.find((event) => event.id == id);

if (!eventFound) {
  console.error("Evento no encontrado");
  container.innerHTML = "<p>Evento no encontrado</p>";
} else {
  paintDetailEvent(eventFound, container);
}

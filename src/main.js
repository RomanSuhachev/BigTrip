import createMainMenuTemplate from "./view/main-menu";
import createTripInfoTemplate from "./view/trip-info";
import createTripFiltersTemplate from "./view/trip-filters";
import createEmptyList from "./view/empty-list";
import tripSortTemplate from "./view/trip-sort";
import editPointTemplate from "./view/edit-point";
import addPointtempalte from "./view/add-point";
import tripCostTemplate from "./view/trip-cost";
import {pointTemplate} from "./view/point";

const POINTS_COUNT = 3;

const INSERT_POSITION = "beforeEnd";
const render = (template, container, insertPosition = INSERT_POSITION) => {
    container.insertAdjacentHTML(insertPosition, template);
}

const pageBody = document.querySelector(".page-body");

const menuContainer = pageBody.querySelector(".trip-controls__navigation");
render(createMainMenuTemplate(), menuContainer);

const tripInfoContainer = pageBody.querySelector(".trip-main");
render(createTripInfoTemplate(), tripInfoContainer, "afterBegin");

const tripCostContainer = tripInfoContainer.querySelector('.trip-info');
render(tripCostTemplate(), tripCostContainer);

const tripFiltersContainer = document.querySelector('.trip-controls__filters');
render(createTripFiltersTemplate(), tripFiltersContainer);

const tripEventsContainer = document.querySelector(".trip-events");
render(tripSortTemplate(), tripEventsContainer);

const eventListItem = tripEventsContainer.querySelector(".trip-events__list");
render(editPointTemplate(), eventListItem);
render(addPointtempalte(), eventListItem)

for(let i = 0; i < POINTS_COUNT; i++) {
    render(pointTemplate(), eventListItem);
}
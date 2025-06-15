import MainMenuView from './view/main-menu.js';
import FilterView from './view/filter.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripSortView from './view/trip-sort.js';
import PointListView from './view/point-list.js';
import PointEditorView from './view/point-editor.js';
import PointView from './view/point.js';

import {generatePointData} from './mock/point-data-generator.js';
import {generateFilterData} from './mock/filter-data-generator.js';
import {isEscKeyDown} from './utils.js';
import {RenderPosition} from "./utils/render";
import {render} from "./utils/render";


const POINT_COUNT = 20;

const randomPointsData = new Array(POINT_COUNT).fill(null).map(generatePointData);
const filterData = generateFilterData(randomPointsData);


const siteBodyElement = document.querySelector('.page-body');

const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(menuElement, new MainMenuView());

const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(filterElement, new FilterView(filterData));

const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
render(tripDetailsElement, new TripInfoView(randomPointsData), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripDetailsElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(randomPointsData));

const tripBoardElement = siteBodyElement.querySelector('.trip-events');
render(tripBoardElement, new TripSortView());
const pointListComponent = new PointListView();
render(tripBoardElement, pointListComponent);


const renderPoint = (pointListElement, pointData) => {
  const changeViewToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
    document.removeEventListener('keydown', changeViewOnEscKeyPress);
  };

  const changeViewToEdit = () => {
    pointListElement.replaceChild(pointEditorComponent.getElement(), pointComponent.getElement());
    document.addEventListener('keydown', changeViewOnEscKeyPress);
  };

  const changeViewOnEscKeyPress = (e) => {
    if (isEscKeyDown(e)) {
      e.preventDefault();
      changeViewToPoint();
    }
  };

  const pointComponent = new PointView(pointData, changeViewToEdit);
  const pointEditorComponent = new PointEditorView(pointData,
    [
      {
        el: '.event__rollup-btn',
        event: 'click',
        fn: changeViewToPoint,
      },
      {
        el: '.event--edit',
        event: 'submit',
        fn: (e) => {
          e.preventDefault();
          changeViewToPoint();
        }
      },
    ]
  );

  pointComponent.bindEventListeners(pointComponent.getElement().querySelector('.event__rollup-btn'));
  pointEditorComponent.bindEventListeners();

  render(pointListElement, pointComponent);
};


for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(pointListComponent.getElement(), randomPointsData[i]);
}

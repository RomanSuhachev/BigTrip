import MainMenuView from './view/main-menu.js';
import FilterView from './view/filter.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import PointListView from './view/point-list.js';
import PointListPresenter from "./presenter/point-list";
import {generatePointData} from './mock/point-data-generator.js';
import {generateFilterData} from './mock/filter-data-generator.js';
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


const presenter = new PointListPresenter();
presenter.init(new PointListView(), randomPointsData);


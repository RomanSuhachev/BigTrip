import PointPresenter from "./point-presenter";
import FormObserver from "../utils/form-observer";
import {render} from "../utils/render";
import TripSortView from "../view/trip-sort";

const SORT_MODES = {
  day: 'day',
  time: 'time',
  price: 'price'
}

const SORT_TYPES = {
  day: 'dateFrom',
  price: 'basePrice',
  time: 'duration'
}

export default class PointListPresenter {
  #POINT_COUNT = 20;
  #pointPresenters = new Map();
  #pointData;
  #formObserver;
  #sortComponent;
  #listComponent;
  #sortContainer;
  #sortMode;

  init(listContainer, pointData) {
    this.#pointData = pointData;
    this.#listComponent = listContainer;
    this.#formObserver = new FormObserver();
    this.#sortComponent = new TripSortView();
    this.#renderTripSort();
    this.#renderPoints(this.#listComponent, this.#pointData);
    this._onSortClick();
  }

  changeData = (updatedData) => {
    let currentPointPresenter = this.#pointPresenters.get(updatedData.id);
    currentPointPresenter.init(updatedData);
  }

  #renderTripSort() {
    this.#sortContainer = document.querySelector('.trip-events');
    render(this.#sortContainer, this.#sortComponent);
  }

  #renderPoints(listContainer, pointData) {
    this.#clearPoints();
    for (let i = 0; i < this.#POINT_COUNT; i++) {
      let presenter = new PointPresenter(listContainer, this.changeData, this.#formObserver.notify).init(pointData[i]);
      this.#pointPresenters.set(pointData[i].id, presenter);
      this.#formObserver.subscribe(presenter);
    }
    render(this.#sortComponent, this.#listComponent);
  }

  #sortData(sortType) {
    this.#sortMode = SORT_MODES[sortType];
    let sort = SORT_TYPES[sortType];
    const sortedData = Array.from(this.#pointData).sort((a, b) => a[sort] - b[sort]);
    this.#pointData = sortedData;
    this.#renderPoints(this.#listComponent, this.#pointData);
  }

  #clearPoints() {
    this.#pointPresenters.forEach(presenter => presenter._destroy());
    this.#pointPresenters.clear();
  }

  #isActiveCurrentMode = (mode) => (mode === this.#sortMode);


  _onSortClick() {
    this.#sortComponent._onSortClickHandler((e) => {
      if (e.target.dataset.sort) {
        let sortType = e.target.dataset.sort;

        if(this.#isActiveCurrentMode(sortType)) return;

        this.#sortData(sortType);
      }
    })
  }

}

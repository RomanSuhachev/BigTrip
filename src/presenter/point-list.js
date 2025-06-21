import PointPresenter from "./point-presenter";
import FormObserver from "../utils/form-observer";

export default class PointListPresenter {
  #POINT_COUNT = 20;
  #pointPresenters = new Map();
  #pointData;
  #formObserver;

  init(listContainer, pointData) {
    this.#pointData = pointData;
    this.#formObserver = new FormObserver();
    for (let i = 0; i < this.#POINT_COUNT; i++) {
      let presenter = new PointPresenter(listContainer, this.changeData, this.#formObserver.notify).init(pointData[i]);
      this.#pointPresenters.set(pointData[i].id, presenter);
      this.#formObserver.subscribe(presenter);
    }
  }

  changeData = (updatedData) => {
    let currentPointPresenter = this.#pointPresenters.get(updatedData.id);
    currentPointPresenter.init(updatedData);
  }

}

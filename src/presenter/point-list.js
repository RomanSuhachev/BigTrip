import PointPresenter from "./point-presenter";
import {render} from "../utils/render";

export default class PointListPresenter {
  #POINT_COUNT = 20;
  #pointPresenters = new Map();
  #pointData;

  init(listContainer, pointData) {
    this.#pointData = pointData;
    for (let i = 0; i < this.#POINT_COUNT; i++) {
      let presenter = new PointPresenter(listContainer, this.changeData).init(pointData[i]);
      this.#pointPresenters.set(pointData[i].id, presenter);
    }
  }

  changeData = (updatedData) => {

    let currentPointPresenter = this.#pointPresenters.get(updatedData.id);
    currentPointPresenter.init(updatedData);
  }

}

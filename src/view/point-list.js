import AbstractView from "./abstract-view";

const createPointListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class PointList extends AbstractView {

  getTemplate() {
    return createPointListTemplate();
  }

}

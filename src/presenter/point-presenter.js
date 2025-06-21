import Point from "../view/point";
import PointEditor from "../view/point-editor";
import {render} from "../utils/render";

export default class PointPresenter {

  #pointComponent = null;
  #pointEditorComponent = null;
  #pointListContainer = null;
  #prevPointComponent = null;
  #prevPointEditorComponent = null;
  #data = null;
  #id = null;

  constructor(listContainer, changeData) {
    this.#pointListContainer = listContainer;
    this.changeData = changeData;
    this._changeViewToPoint = this._changeViewToPoint.bind(this);
  }

  init(pointData) {
    this.#data = pointData;
    this.#prevPointComponent = this.#pointComponent;
    this.#prevPointEditorComponent = this.#pointEditorComponent;

    this.#pointComponent = new Point(pointData);
    this.#pointEditorComponent = new PointEditor(pointData);
    this.#id = this.#data.id;
    this.#addListeners();

    if (this.#prevPointComponent === null || this.#prevPointEditorComponent === null) {
      render(this.#pointListContainer, this.#pointComponent);
      return this;
    }

    if(this.#pointListContainer.getElement().contains(this.#prevPointComponent.getElement())) {
      this.#pointListContainer.getElement().replaceChild(this.#pointComponent.getElement(), this.#prevPointComponent.getElement());
    }

    if(this.#pointListContainer.getElement().contains(this.#prevPointEditorComponent.getElement())) {
      this.#pointListContainer.getElement().replaceChild(this.#pointEditorComponent.getElement(), this.#prevPointEditorComponent.getElement());
    }

    return this;

  }

  _destroy = () => {
    this.#pointComponent = null;
    this.#pointEditorComponent = null;
  }

  _changeViewToPoint = () => {
    this.#pointListContainer.getElement().replaceChild(this.#pointComponent.getElement(), this.#pointEditorComponent.getElement());
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  };

  _changeViewToEdit = () => {
    this.#pointListContainer.getElement().replaceChild(this.#pointEditorComponent.getElement(), this.#pointComponent.getElement());
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  };

  _isEscKeyDown(e) {
    return e.key === `Escape` || e.key === 'Esc';
  }

  _onEscKeyDownHandler = (e) => {
    if (this._isEscKeyDown(e)) this._changeViewToPoint();
  };

  _onFavoriteClickHandler = () => {
    let updatedData = Object.assign({}, this.#data, {
      isFavorite: !this.#data.isFavorite
    });
    this.changeData(updatedData);
  }


  #addListeners() {
    this.#pointComponent.bindClickHandler(this._changeViewToEdit);
    this.#pointComponent.setFavoriteClickHandler(this._onFavoriteClickHandler);
    this.#pointEditorComponent.setClickHandler(this._changeViewToPoint);
    this.#pointEditorComponent.setSubmitHandler((e) => {e.preventDefault(); this._changeViewToPoint()});
  }

}

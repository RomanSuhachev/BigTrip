import Point from "../view/point";
import PointEditor from "../view/point-editor";
import {render} from "../utils/render";

const VIEW_MODES = {
  DEFAULT:'DEFAULT',
  EDITOR:'EDITOR'
}

export default class PointPresenter {

  #pointComponent = null;
  #pointEditorComponent = null;
  #pointListContainer = null;
  #prevPointComponent = null;
  #prevPointEditorComponent = null;
  #data = null;
  #id = null;
  #mode;

  constructor(listContainer, changeData, changeMode) {
    this.#pointListContainer = listContainer;
    this.changeData = changeData;
    this.changeMode = changeMode;
    this.#changeViewToPoint = this.#changeViewToPoint.bind(this);
  }

  init(pointData) {
    this.#data = pointData;
    this.#prevPointComponent = this.#pointComponent;
    this.#prevPointEditorComponent = this.#pointEditorComponent;

    this.#pointComponent = new Point(pointData);
    this.#pointEditorComponent = new PointEditor(pointData);
    this.#id = this.#data.id;
    this.#mode = VIEW_MODES.DEFAULT;
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
    this.#pointComponent.getElement().remove();
  }

  _changeView = () => {
    this.#mode === VIEW_MODES.DEFAULT ? this.#changeViewToEdit() : this.#changeViewToPoint();
  }

  _resetView = () => {
    if(this.#mode !== VIEW_MODES.DEFAULT) {
      this._changeView();
    }
  }

  #changeViewToPoint = () => {
    this.#mode = VIEW_MODES.DEFAULT;
    this.#pointListContainer.getElement().replaceChild(this.#pointComponent.getElement(), this.#pointEditorComponent.getElement());
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  };

  #changeViewToEdit = () => {
    this.changeMode();
    this.#mode = VIEW_MODES.EDITOR;
    this.#pointListContainer.getElement().replaceChild(this.#pointEditorComponent.getElement(), this.#pointComponent.getElement());
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  };

  _isEscKeyDown(e) {
    return e.key === `Escape` || e.key === 'Esc';
  }

  _onEscKeyDownHandler = (e) => {
    if (this._isEscKeyDown(e)) this.#changeViewToPoint();
  };

  _onFavoriteClickHandler = () => {
    let updatedData = Object.assign({}, this.#data, {
      isFavorite: !this.#data.isFavorite
    });
    this.changeData(updatedData);
  }


  #addListeners() {
    this.#pointComponent.bindClickHandler(this._changeView);
    this.#pointComponent.setFavoriteClickHandler(this._onFavoriteClickHandler);
    this.#pointEditorComponent.setClickHandler(this._changeView);
    this.#pointEditorComponent.setSubmitHandler((e) => {e.preventDefault(); this.#changeViewToPoint()});
  }

}

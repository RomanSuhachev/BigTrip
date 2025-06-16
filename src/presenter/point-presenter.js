import Point from "../view/point";
import PointEditor from "../view/point-editor";
import {render} from "../utils/render";
export default class PointPresenter {

  #pointComponent;
  #pointEditorComponent;
  #pointListContainer;

  constructor(listContainer) {
    this.#pointComponent = null;
    this.#pointEditorComponent = null;
    this.#pointListContainer = listContainer;
  }

  init(pointData) {
    this.#pointComponent = new Point(pointData);
    this.#pointEditorComponent = new PointEditor(pointData);
    this.#addListeners();

    render(this.#pointListContainer, this.#pointComponent);
  }

  _changeViewToPoint = () => {
    this.#pointListContainer.getElement().replaceChild(this.#pointComponent.getElement(), this.#pointEditorComponent.getElement());
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  };

  _changeViewToEdit = () => {
    this.#pointListContainer.getElement().replaceChild(this.#pointEditorComponent.getElement(), this.#pointComponent.getElement());
    document.addEventListener('keydown', this._onEscKeyDownHandler);
    // console.log('work');
  };

  _isEscKeyDown(e) {
    return e.key === `Escape` || e.key === 'Esc';
  }

  _onEscKeyDownHandler = (e) => {
    if(this._isEscKeyDown(e)) this._changeViewToPoint();
  };


  #addListeners() {
    this.#pointComponent.bindClickHandler(this._changeViewToEdit);
  }

}

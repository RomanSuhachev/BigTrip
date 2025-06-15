import { createElement } from "../utils";

export default class AbstractView {

  constructor() {
    if(new.target === AbstractView) {
      throw new Error('От данного класса можно только наследоваться');
    }

    this._element = null;
  }


  getTemplate() {
    throw new Error('Метод абстрактного класса не реализован: getTemplate')
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }


}

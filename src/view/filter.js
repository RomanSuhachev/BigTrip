import AbstractView from "./abstract-view";
import {createElement} from "../utils";

const createFilterItemTemplate = (filterData) => {
  return filterData.map(({ name, amount }) => {
    return `<div class="trip-filters__filter">
     <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${amount}" checked>
     <label class="trip-filters__filter-label" for="filter-everything">${name} ${amount}</label>
    </div>`;
  }).join('');
};


const createFilterTemplate = (filterData) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(filterData)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};


export default class Filter extends AbstractView {
  constructor(filterData) {
    super();
    this._filterData = filterData;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filterData);
  }

  removeElement() {
    this._element = null;
  }
}

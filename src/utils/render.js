import AbstractView from "../view/abstract-view";

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, position = RenderPosition.BEFOREEND) => {

  if(container instanceof AbstractView) {
    container = container.getElement();
  }

  if(element instanceof AbstractView) {
    element = element.getElement();
    console.log(`container ${container} - el ${element}`);
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {render, RenderPosition};

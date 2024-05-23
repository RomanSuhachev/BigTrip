const INSERT_POSITION = "beforeend";
const render = (template, container, insertPosition = INSERT_POSITION) => {
    container.insertAdjacentHTML(template, insertPosition)
}
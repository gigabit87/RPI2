import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class ClearButtonComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `<button class="clear-btn">Х Очистить</button>`;
  }

  setClearClickHandler(callback) {
    this.element.addEventListener('click', callback);
  }
}
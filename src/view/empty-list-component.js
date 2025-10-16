import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class EmptyListComponent extends AbstractComponent {
  constructor(message = "Нет задач") {
    super();
    this._message = message;
  }

  get template() {
    return `<p class="empty-list">${this._message}</p>`;
  }
}
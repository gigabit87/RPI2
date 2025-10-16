import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class TaskComponent extends AbstractComponent {
  #taskText;

  constructor(taskText) {
    super();
    this.#taskText = taskText;
  }

  get template() {
    return `<div class="task">${this.#taskText}</div>`;
  }
}
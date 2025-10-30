import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class TaskComponent extends AbstractComponent {
  #task;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return `<div class="task" draggable="true">${this.#task.title}</div>`;
  }

  setDragStartHandler(callback) {
    this.element.addEventListener('dragstart', (evt) => {
      evt.dataTransfer.setData('text/plain', this.#task.id);
      callback();
    });
  }
}
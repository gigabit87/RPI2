import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class TaskListComponent extends AbstractComponent {
  #title;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
  const columnClass =
    this.#title === "Бэклог" ? "backlog-column" :
    this.#title === "В процессе" ? "progress-column" :
    this.#title === "Готово" ? "done-column" :
    "trash-column";

  return `
    <div class="task-column ${columnClass}">
      <h3>${this.#title}</h3>
      <div class="task-list"></div>
    </div>
  `;
}
}
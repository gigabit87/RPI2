import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class TaskListComponent extends AbstractComponent {
  #title;
  #status;

  constructor(title, status) {
    super();
    this.#title = title;
    this.#status = status;
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

  setDropHandler(callback) {
    const taskList = this.element.querySelector('.task-list');
    
    taskList.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      taskList.classList.add('drag-over');
    });

    taskList.addEventListener('dragleave', () => {
      taskList.classList.remove('drag-over');
    });

    taskList.addEventListener('drop', (evt) => {
      evt.preventDefault();
      taskList.classList.remove('drag-over');
      const taskId = evt.dataTransfer.getData('text/plain');
      callback(taskId, this.#status);
    });
  }
}
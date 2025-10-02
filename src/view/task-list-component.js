import {createElement} from "../framework/render.js";

function createTaskListComponentTemplate(title) {
  const columnClass = title === 'Бэклог' ? 'backlog-column' : 
                      title === 'В процессе' ? 'progress-column' :
                      title === 'Готово' ? 'done-column' : 'trash-column';

  return `
    <div class="task-column ${columnClass}">
      <h3>${title}</h3>
      <div class="task-list"></div>
    </div>
  `;
}

export default class TaskListComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

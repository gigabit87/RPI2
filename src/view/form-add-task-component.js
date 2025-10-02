import {createElement} from "../framework/render.js";

function createFormAddTaskComponentTemplate() {
    return `
        <div class="add-task__form">
            <input type="text" placeholder="Новая задача">
            <button>+ Добавить</button>
        </div>
    `;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
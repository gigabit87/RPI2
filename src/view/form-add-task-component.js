import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return `
      <div class="add-task__form">
        <input type="text" placeholder="Новая задача">
        <button>+ Добавить</button>
      </div>
    `;
  }
}

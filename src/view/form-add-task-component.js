import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class FormAddTaskComponent extends AbstractComponent {
  constructor() {
    super();
    this._callback = null;
  }

  get template() {
    return `
      <div class="add-task__form">
        <input type="text" placeholder="Новая задача">
        <button type="button">+ Добавить</button>
      </div>
    `;
  }

  setFormSubmitHandler(callback) {
    this._callback = callback;
    this.element.querySelector('button').addEventListener('click', this._formSubmitHandler.bind(this));
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const input = this.element.querySelector('input');
    const taskText = input.value.trim();
    
    if (taskText && this._callback) {
      this._callback(taskText);
      input.value = '';
    }
  }
}
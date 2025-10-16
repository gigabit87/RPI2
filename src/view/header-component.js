import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return `
      <header>
        <h1>Список задач</h1>
      </header>
    `;
  }
}

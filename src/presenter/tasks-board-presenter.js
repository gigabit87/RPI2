import TaskBoardComponent from "../view/taskboard-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #taskBoardComponent = null;

  constructor({ boardContainer, taskModel }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskBoardComponent = new TaskBoardComponent();
  }

  init() {
    render(this.#taskBoardComponent, this.#boardContainer);

    const boardTasks = this.#taskModel.tasks;

    const columns = {
      backlog: "Бэклог",
      progress: "В процессе",
      done: "Готово",
      trash: "Корзина",
    };

    Object.entries(columns).forEach(([status, title]) => {
      this.#renderTasksList(status, title, boardTasks);
    });
  }

  #renderTasksList(status, title, allTasks) {
    const taskListComponent = new TaskListComponent(title);
    render(taskListComponent, this.#taskBoardComponent.element);

    const listContainer = taskListComponent.element.querySelector(".task-list");
    const filteredTasks = allTasks.filter((task) => task.status === status);

    if (filteredTasks.length === 0) {
      this.#renderEmptyList(listContainer);
    } else {
      filteredTasks.forEach((task) => this.#renderTask(task, listContainer));
    }

    if (status === "trash") {
      this.#renderClearButton(taskListComponent.element);
    }
  }

  #renderTask(task, container) {
    render(new TaskComponent(task.title), container);
  }

  #renderClearButton(container) {
    render(new ClearButtonComponent(), container);
  }

  #renderEmptyList(container) {
    render(new EmptyListComponent(), container);
  }
}

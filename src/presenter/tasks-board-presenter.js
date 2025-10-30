import TaskBoardComponent from "../view/taskboard-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import { render } from "../framework/render.js";
import { generateID } from "../utils.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #taskBoardComponent = null;

  constructor({ boardContainer, taskModel }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskBoardComponent = new TaskBoardComponent();
    
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
  }

  get tasks() {
    return this.#taskModel.tasks;
  }

  init() {
    render(this.#taskBoardComponent, this.#boardContainer);
    this.#renderBoard();
  }

  #renderBoard() {
    const boardTasks = this.tasks;

    const columns = {
      backlog: "Бэклог",
      progress: "В процессе", 
      done: "Готовo",
      trash: "Корзина",
    };

    Object.entries(columns).forEach(([status, title]) => {
      this.#renderTasksList(status, title, boardTasks);
    });
  }

  #renderTasksList(status, title, allTasks) {
    const taskListComponent = new TaskListComponent(title, status);
    render(taskListComponent, this.#taskBoardComponent.element);

    const listContainer = taskListComponent.element.querySelector(".task-list");
    const filteredTasks = allTasks.filter((task) => task.status === status);

    if (filteredTasks.length === 0) {
      const message = status === "trash" ? "Перетащите карточку" : "Нет задач";
      this.#renderEmptyList(listContainer, message);
    } else {
      filteredTasks.forEach((task) => this.#renderTask(task, listContainer));
    }

    if (status === "trash") {
      this.#renderClearButton(taskListComponent.element);
    }
    taskListComponent.setDropHandler(this.#handleTaskDrop.bind(this));
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    taskComponent.setDragStartHandler(() => {
      taskComponent.element.classList.add('dragging');
    });
    render(taskComponent, container);
  }

  #renderClearButton(container) {
    const clearButtonComponent = new ClearButtonComponent();
    clearButtonComponent.setClearClickHandler(() => {
      this.#taskModel.clearTrash();
    });
    render(clearButtonComponent, container);
  }

  #renderEmptyList(container, message = "Нет задач") {
    render(new EmptyListComponent(message), container);
  }

  #handleModelChange = () => {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = '';
  }

  handleFormSubmit = (taskText) => {
    const newTask = {
      id: generateID(),
      title: taskText,
      status: 'backlog'
    };
    this.#taskModel.addTask(newTask);
  }

  #handleTaskDrop = (taskId, newStatus) => {
    this.#taskModel.updateTaskStatus(taskId, newStatus);
  }
}
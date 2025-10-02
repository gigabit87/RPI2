import TaskBoardComponent from "../view/taskboard-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  constructor({ boardContainer, taskModel }) {
    this.boardContainer = boardContainer;
    this.taskModel = taskModel;

    this.taskBoardComponent = new TaskBoardComponent();
  }

  init() {
    render(this.taskBoardComponent, this.boardContainer);

    const boardTasks = this.taskModel.getTasks();

    const columns = {
      backlog: 'Бэклог',
      progress: 'В процессе',
      done: 'Готово',
      trash: 'Корзина'
    };

    Object.entries(columns).forEach(([status, title]) => {
      const taskListComponent = new TaskListComponent(title);
      render(taskListComponent, this.taskBoardComponent.getElement());

      const listContainer = taskListComponent.getElement().querySelector('.task-list');

      boardTasks
        .filter(task => task.status === status)
        .forEach(task => {
          render(new TaskComponent(task.title), listContainer);
        });

      if (status === 'trash') {
        render(new ClearButtonComponent(), taskListComponent.getElement());
      }
    });
  }
}

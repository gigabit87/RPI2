import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";

import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import { tasks } from "./mock/task.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.BEFOREEND);

const taskModel = new TaskModel(tasks);

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskboardContainer,
  taskModel: taskModel
});

tasksBoardPresenter.init();

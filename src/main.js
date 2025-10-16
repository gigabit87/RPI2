import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";

import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import { tasks } from "./mock/task.js";

const bodyContainer = document.body;
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

const taskModel = new TaskModel(tasks);

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formAddTaskComponent = new FormAddTaskComponent();
render(formAddTaskComponent, formContainer);

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskboardContainer,
  taskModel: taskModel
});

formAddTaskComponent.setFormSubmitHandler((taskText) => {
  tasksBoardPresenter.handleFormSubmit(taskText);
});

tasksBoardPresenter.init();
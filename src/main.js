import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";

import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import TasksApiService from "./tasks-api-service.js";

const bodyContainer = document.body;
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

const tasksApiService = new TasksApiService('https://6903b1f4d0f10a340b255dab.mockapi.io');
const taskModel = new TaskModel({ tasksApiService });

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
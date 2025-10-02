import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskBoardComponent from "./view/taskboard-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";

import {render, RenderPosition} from "./framework/render.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

const taskBoardComponent = new TaskBoardComponent();

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.BEFOREEND);
render(taskBoardComponent, taskboardContainer);

const columns = {
  'Бэклог': ['Выучить JS', 'Выучить React', 'Сделать домашку'],
  'В процессе': ['Выпить смузи', 'Попить воды'],
  'Готово': ['Позвонить маме', 'Погладить кота'],
  'Корзина': ['Сходить погулять', 'Прочитать Войну и Мир']
};

Object.entries(columns).forEach(([title, tasks]) => {
  const taskListComponent = new TaskListComponent(title);
  render(taskListComponent, taskBoardComponent.getElement());

  const listContainer = taskListComponent.getElement().querySelector('.task-list');
  tasks.forEach(taskText => {
    render(new TaskComponent(taskText), listContainer);
  });
});

import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #tasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#tasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#tasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status
      }));
    } catch(err) {
      this.#tasks = [];
    }

    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#tasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const taskIndex = this.#tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = this.#tasks[taskIndex];
    
    try {
      const updatedTask = {
        ...task,
        status: newStatus
      };

      const response = await this.#tasksApiService.updateTask(updatedTask);
      this.#tasks[taskIndex] = response;
      this._notify(UserAction.UPDATE_TASK, response);
    } catch(err) {
      throw err;
    }
  }

  async clearTrash() {
    const trashTasks = this.#tasks.filter(task => task.status === 'trash');
    
    try {
      await Promise.all(
        trashTasks.map(task => this.#tasksApiService.deleteTask(task.id))
      );
      
      this.#tasks = this.#tasks.filter(task => task.status !== 'trash');
      this._notify(UserAction.DELETE_TASK);
    } catch(err) {
      throw err;
    }
  }
}
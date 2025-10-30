export default class TaskModel {
  #tasks = [];
  #observers = [];

  constructor(tasks) {
    this.#tasks = tasks;
  }

  get tasks() {
    return this.#tasks;
  }

  addTask(task) {
    this.#tasks.push(task);
    this._notifyObservers();
  }

  clearTrash() {
    this.#tasks = this.#tasks.filter(task => task.status !== 'trash');
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  updateTaskStatus(taskId, newStatus) {
  const task = this.#tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    this._notifyObservers();
  }
}
}
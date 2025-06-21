export default class FormObserver {
  observers = [];

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify = () => {
    this.observers.forEach(observer => observer._resetView())
  }
}

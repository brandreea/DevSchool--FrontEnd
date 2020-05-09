import { LitElement, html, css } from 'lit-element';

import { read, append, remove } from './storage.js';
import './TodoList';
import './TodoAddForm';

export class TodoMain extends LitElement {
  static get styles() {
    return css`
      main {
        display: flex;
      }
    `;
  }
  static get properties() {
    return {
      todos: { type: Array },
    };
  }
  constructor() {
    super();
    this.todos = read();
  }
  render() {
    return html`
      <main>
        <todo-add-form
          @add-element=${this._addAction}
          @filter-elements=${this._filterAction}
        ></todo-add-form>
        <todo-list .todos=${this.todos} @delete-element=${this._onListAction}></todo-list>
      </main>
    `;
  }
  _addAction(event) {
    event.preventDefault();
    append(event.detail);
    this.todos = read();
  }
  _filterAction(event) {
    if (event.detail.cathegory != 'all')
      this.todos = read().filter((value, index, arr) => {
        if (value.cathegory === event.detail.cathegory) return value;
      });
    else this.todos = read();
  }
  _onListAction(event) {
    switch (event.detail.action) {
      case 'delete':
        this._onDeleteUtils(event);
        break;
    }
  }
  _onDeleteUtils(event) {
    let todo = this.todos.find(todo => todo.id === event.detail.todo);
    remove(todo);
    this.todos = this.todos.filter((value, index, arr) => {
      return value.id != todo.id;
    });
  }
}

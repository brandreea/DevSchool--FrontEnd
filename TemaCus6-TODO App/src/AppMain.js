import { LitElement, html, css } from 'lit-element';

import { read, append, remove } from './storage.js';
import './AppList';
import './AppComponentAdd';

export class AppMain extends LitElement {
  static get styles() {
    return css`
      h1 {
        text-align: center;
      }
      app-list {
        margin-left: 10%;
        margin-right: 10%;
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
    console.log(this.todos);
  }
  render() {
    return html`
      <h1>TODO</h1>
      <app-component-add @add-element=${this._addAction}></app-component-add>
      <app-list .todos=${this.todos} @delete-element=${this._onListAction}></app-list>
    `;
  }
  _addAction(event) {
    console.log('here');
    event.preventDefault();
    append(event.detail);
    this.todos = read();
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

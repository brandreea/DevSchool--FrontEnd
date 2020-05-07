import { LitElement, html, css } from 'lit-element';
import { read, append, remove, write } from './storage.js';
import './AppListComponent';
import { AppComponentAdd } from './AppComponentAdd.js';
export class AppList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
      #form-delete {
        list-style-type: none;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      todos: { type: Array },
    };
  }
  constructor() {
    super();
    this.todos = [];
  }

  render() {
    console.log('render');
    return html`<form>
      <ul id="form-delete" @action=${this._onClickAction}>
        ${this.todos.map(
          todo => html` <app-list-component
            @action=${this._onClickAction}
            name="${todo.name}"
            id=${todo.id}
            content=${todo.content}
          ></app-list-component>`
        )}
      </ul>
      <form></form>
    </form>`;
  }
  _onClickAction(event) {
    console.log(event);
    console.log('action');
    event.preventDefault();

    switch (event.detail.action) {
      case 'delete':
        this.dispatchEvent(new CustomEvent('delete-element', { detail: event.detail }));
        break;
    }
  }
}
window.customElements.define('app-list', AppList);

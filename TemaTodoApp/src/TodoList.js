import { LitElement, html, css } from 'lit-element';

import './TodoListElement';
export class TodoList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5) inset;
        width:80%;
        }
      }
      .todo-list {
        flex: 80%;
        width: 100%;
        background-color: blue;
      }
    `;
  }

  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  render() {
    console.log('render');
    return html`
      <div class="todo-list" @action=${this._onClickAction}>
        ${this.todos.map(
          todo => html` <todo-list-element
            @action=${this._onClickAction}
            name="${todo.name}"
            id=${todo.id}
            content=${todo.content}
            cathegory=${todo.cathegory}
          ></todo-list-element>`
        )}
      </div>
    `;
  }
  _onClickAction(event) {
    event.preventDefault();
    switch (event.detail.action) {
      case 'delete':
        this.dispatchEvent(new CustomEvent('delete-element', { detail: event.detail }));
        break;
    }
  }
}
window.customElements.define('todo-list', TodoList);

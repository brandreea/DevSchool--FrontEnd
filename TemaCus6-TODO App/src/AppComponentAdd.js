import { LitElement, html, css } from 'lit-element';
import './AppList';

export class AppComponentAdd extends LitElement {
  static get styles() {
    return css`
      :host {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        display: block;
        padding: 2rem;
        height: 2rem;
        border-color: orange;
      }
    `;
  }

  render() {
    return html`
      <p>Add a todo task:</p>
      <form @submit=${this._onSubmit} id="addForm">
        <input type="text" name="name" id="name" placeholder="Title" required />
        <input type="text" name="content" id="content" placeholder="Content" />
        <button type="submit">Add</button>
      </form>
    `;
  }
  _onSubmit(event) {
    event.preventDefault();
    console.log('onAdd');
    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());
    const todoElem = Object.fromEntries(data);
    this.dispatchEvent(new CustomEvent('add-element', { detail: todoElem }));
  }
}
window.customElements.define('app-component-add', AppComponentAdd);

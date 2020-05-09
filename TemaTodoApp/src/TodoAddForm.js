import { LitElement, html, css } from 'lit-element';
import './TodoList';

export class TodoAddForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        border-color: orange;
        float: left;
        flex: 30%;
        max-width: 30%;
      }
      h2 {
        font-size: 1.8rem;
      }
      input,
      select,
      textarea {
        display: block;
        height: 3.5rem;
        width: 70%;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1.5rem;
      }
      #content,
      textarea {
        font-size: 1.5rem;
        height: 12rem;
        resize: none;
      }
      button {
        background-color: darkorange;
        border: none;
        color: white;
        padding: 7px 15px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 1.4rem;
        margin: 4px 15px;
        cursor: pointer;
        border-radius: 8px;
      }
      .item-label {
        font-size: 1.7rem;
      }
      .cat {
        padding: 2%;
        border-radius: 7px;
      }
      #cat1 {
        display: inline;
        background-color: darkorchid;
      }
      #cat2 {
        display: inline;
        background-color: gold;
      }
      #cat3 {
        display: inline;
        background-color: dodgerblue;
      }
      .all {
        padding: 2%;
        border-radius: 7px;
        display: block;
        background-color: gray;
      }
    `;
  }

  //Renders the form along with an clickable index (the legend)
  //on click, each index filters the TODOs by cathegory
  render() {
    let color = 'gold';
    return html`
      <h2>Add a TODO note</h2>
      <form @submit=${this._onSubmit} id="addForm">
        <p>
          <label class="item-label">Title</label>
          <input type="text" name="name" id="name" placeholder="Title" required />
        </p>
        <label class="item-label">Content</label>
        <p>
          <textarea name="content" rows="10" cols="30" placeholder="Content"></textarea>
        </p>
        <label class="item-label">Note Type</label>
        <p>
          <select name="cathegory" id="list-cathegory" form="addForm">
            <option>University</option>
            <option>House-keeping</option>
            <option>Work</option>
          </select>
        </p>
        <button type="submit">+ Add</button>
      </form>
      <h2>Index</h2>
      <button class="all" id="all" name="all" @click=${this._onCathegory}>All</button>
      <button class="cat1" id="cat1" name="University" id="cat1" @click=${this._onCathegory}>
        University
      </button>
      <button class="cat2" id="cat2" name="House-keeping" @click=${this._onCathegory}>
        House-keeping
      </button>
      <button class="cat3" id="cat3" name="Work" @click=${this._onCathegory}>Work</button>
    `;
  }
  _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());
    const todoElem = Object.fromEntries(data);
    this.dispatchEvent(new CustomEvent('add-element', { detail: todoElem }));
  }
  _onCathegory(event) {
    const data = {
      cathegory: event.target.name,
    };
    this.dispatchEvent(new CustomEvent('filter-elements', { detail: data }));
  }
}
window.customElements.define('todo-add-form', TodoAddForm);

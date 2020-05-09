import { LitElement, html, css } from 'lit-element';

export class TodoListElement extends LitElement {
  static get styles() {
    return css`
      :host {
        text-align: center;
      }
      input,
      textarea {
        border: none;
        margin-top: 10px;
        width: 98%;
        font-size: 1.2rem;
        display: block;
        resize: none;
        padding-right: 2%;
      }

      .list-item {
        width: 50%;
        display: block;
        padding: 1% 1% 3% 2%;
        shadow: none;
        border-radius: 15px;
        border-color: darkorange;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2%;
        margin-bottom: 2%;
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
      }
      #title {
        font-weight: bold;
      }
      .delete {
        border: none;
        color: white;
        float: right;
        margin-bottom: 1%;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      content: { type: String },
      cathegory: { type: String },
      id: { type: Number },
    };
  }

  render() {
    let color = 'lightgray';

    if (this.cathegory === 'University') color = 'darkorchid';
    if (this.cathegory === 'House-keeping') color = 'gold';
    if (this.cathegory === 'Work') color = 'dodgerblue';

    let textareaHeight = this.content.length / 50 + (this.content.match(/\r*\n/g) || []).length + 1;

    return html`
      <form name="${'element' + this.id}" class="list-item" style="background-color:${color}">
        <button type="reset" name="${this.id}" class="button delete" @click=${
      this._onClickDelete
    } style="background-color:${color}"/>x</button>
        <input style="background-color:${color}" type="text" name="title" value="${
      this.name
    }" id="title" readonly />
        <textarea style="background-color:${color}" type="text" name="content" rows="${textareaHeight}" readonly />${
      this.content
    }</textarea>
      </form>
    `;
  }
  _onClickDelete(event) {
    const data = {
      todo: event.target.name,
      action: 'delete',
    };
    this.dispatchEvent(new CustomEvent('action', { detail: data }));
  }
}

window.customElements.define('todo-list-element', TodoListElement);

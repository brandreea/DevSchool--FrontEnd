import { LitElement, html, css } from 'lit-element';

export class AppListComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        padding: 2rem;
        height: 2rem;

        max-width: 30%;
      }
      input {
        border: none;
        display: block;

        //margin-left:auto;
        margin-top: 10px;
        margin-rigth: auto;
        background: burlywood;
      }
      li {
      }
      #title {
        font-size: 1rem;
        weigth: strong;
      }
      fieldset {
        border-color: sandybrown;
        background: burlywood;
        // border-radius: 2px;
        shadow: none;
      }
      #button {
        background-color: gainsboro;
        margin-rigth: auto;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      content: { type: String },
      id: { type: Number },
      // onEdit:{type: Boolean},
    };
  }

  render() {
    return html`
      <li name="${'element' + this.id}">
        <fieldset>
          <input type="checkbox" name="checkbox" value="${this.id} id="checkmark" >
          <input type="text" name="title" value="${this.name}" id="title" readonly />
          <input type="text" name="content" value="${this.content}" readonly />
          <input
            type="reset"
            name="${this.id}"
            id="button"
            value="Delete"
            @click=${this._onClickDelete}
          />
        </fieldset>
      </li>
    `;
    //  TODO - add edit after fixing:
    //<input type="text" name="content" value="${this.content}" readonly >
    // <input type="button" id="update" name="update" value="Update" hidden>
    // <input type="button" id="cancel" name="cancel" value="Cancel" hidden>
  }
  _onClickDelete(event) {
    console.log(event.target);
    console.log(event.target.name);
    const data = {
      todo: event.target.name,
      action: 'delete',
    };
    console.log(data);
    this.dispatchEvent(new CustomEvent('action', { detail: data }));
  }
}

window.customElements.define('app-list-component', AppListComponent);

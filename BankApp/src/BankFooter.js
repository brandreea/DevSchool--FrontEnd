import { LitElement, html, css } from 'lit-element';

export class BankFooter extends LitElement {
  static get styles() {
    return css`
      footer {
        background-color: lightgray;
        color: gray;
        padding: 3rem;
        font-size: 1rem;
        text-align: left;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <p>&copy 2020</p>
      </footer>
    `;
  }
}
window.customElements.define('bank-footer', BankFooter);

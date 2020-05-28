import { LitElement, html, css } from 'lit-element';

export class BankHeader extends LitElement {
  static get styles() {
    return css`
      header {
        background-color: orange;
        color: white;
        padding-top: 0.7rem;
        padding-bottom: 0.7rem;
        text-align: left;
        padding-left: 2rem;
        padding-right: 4rem;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>MyBankingApp</h1>
      </header>
    `;
  }
}
window.customElements.define('bank-header', BankHeader);

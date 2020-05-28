import { LitElement, html, css } from 'lit-element';
import { read, setAccount } from './storage';

export class BankListOfAccounts extends LitElement {
  static get styles() {
    return css`
      a {
        padding: 10px 10px 10px 10px;
        text-decoration: none;
        font-size: 0.7rem;
        color: #818181;
        display: block;
        transition: color 0.3s;
      }
      a:hover {
        color: #f1f1f1;
        cursor: pointer;
      }
    `;
  }
  static get properties() {
    return {
      accounts: { type: Array },
    };
  }
  constructor() {
    super();
  }

  render() {
    if (Array.isArray(this.accounts) && this.accounts.length > 0)
      return html` ${this.accounts.map(
        account =>
          html`
            <a href="account.html" name="${account.accountNo}" @click=${this._onClick}
              >${account.accountNo}</a
            >
          `
      )}`;
    return html``;
  }
  _onClick(event) {
    // event.preventDefault();
    const name = event.target.name;
    console.log(event.target.name);
    setAccount(event.target.name);
  }
}
window.customElements.define('bank-list-of-accounts', BankListOfAccounts);

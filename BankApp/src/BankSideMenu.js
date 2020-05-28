import { LitElement, html, css } from 'lit-element';
import { read, clear } from './storage';

export class BankSideMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        border-color: orange;
        float: left;
        flex: 6.5%;
        background-color: #111;
        width: 6.5%;
        min-height: 30rem;
      }
      a {
        padding: 10px 10px 10px 10px;
        text-decoration: none;
        font-size: 1rem;
        color: #818181;
        display: block;
        transition: 0.3s;
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
  //Renders the form along with an clickable index (the legend)
  //on click, each index filters the TODOs by cathegory
  render() {
    return html`
      <a href="profile.html">Home</a>
      <a @click=${this._onClick} name="accounts">Accounts</a>
      <bank-list-of-accounts .accounts=${this.accounts}></bank-list-of-accounts>
      <a href="transaction.html" name="create-transaction">Create transaction</a>
      <a href="login.html" @click=${this._onClick} name="logout">Logout</a>
    `;
  }
  async _onClick(event) {
    // event.preventDefault();
    const user = read();
    const name = event.target.name;
    console.log(event.target.name);
    switch (name) {
      case 'logout':
        const response = await fetch(
          `http://localhost:3000/bank/access/logout?token=${user.token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        clear();
        break;

      case 'accounts':
        if (!Array.isArray(this.accounts) || this.accounts.length == 0) {
          const user = read();
          this.accounts = user.accounts;
        } else {
          this.accounts = [];
          console.log(this.accounts);
        }
    }
  }
}
window.customElements.define('bank-side-menu', BankSideMenu);

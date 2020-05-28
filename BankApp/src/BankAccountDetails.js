import { LitElement, html, css } from 'lit-element';
import { read, write, getAccount } from './storage.js';
export class BankAccountDetails extends LitElement {
  static get styles() {
    return css`
      :host {
        // flex: 100%;
        width: 100%;
      }
      #balance {
        margin-left: auto;
        margin-right: auto;
        padding: 7rem;
        background-color: silver;
        color: white;
        width: 10rem;
        text-align: center;
        border-radius: 15px;
        border-style: solid;
        border-bottom: black;
        border-top: white;
        border-right: white;
        box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
      }

      h1 {
        text-align: center;
        padding: 1rem;
      }
      h2 {
        text-align: center;

        padding-bottom: 1rem;
      }
      h3 {
        text-align: center;
      }
      .asoc-account {
        font-weight: bold;
      }
      p {
        padding-left: 10rem;
      }
      .flex-box {
        margin-top: 3rem;
        flex: 48%;
        display: flex;
        position: relative;
        flex-direction: column;
        width: 49.7%;
        padding-bottom: 5rem;
      }
      #received {
        float: left;
      }
      #sent {
        margin-top: 4.2rem;
      }
      .cross-line {
        text-decoration: line-through;
        display: inline;
      }
      .lost-amount {
        color: red;
      }
      .received-amount {
        color: green;
      }
      .transaction:hover {
        background-color: lightgray;
      }
      #type {
        text-align: center;
        padding-left: 0rem;
        padding-bottom: 3rem;
      }
    `;
  }
  static get properties() {
    return {
      accountNo: { type: String },
      balance: { type: Number },
      receivedTransactions: { type: Array },
      sentTransactions: { type: Array },
      type: { type: String },
    };
  }
  constructor() {
    super();
    this.setDetails();
  }
  render() {
    let color = this.status ? 'green' : 'red';
    let styleColumn1 = '';
    let styleColumn2 = '';
    if (this.receivedTransactions.length > this.sentTransactions.length)
      styleColumn1 = 'border-right: 3px solid lightgray;';
    else styleColumn2 = 'border-left: 3px solid lightgray;';

    return html` <h1>Account:${this.accountNo}</h1>
      <h2>Balance:${this.balance}</h2>
      <p id="type">${this.type}</p>
      <div class="flex-box" id="received" style="${styleColumn1}">
        <h3>Received Transactions</h3>
        ${this.receivedTransactions.length > 0
          ? this.receivedTransactions.map(
              transaction =>
                html`<div class="transaction">
                  <p class="asoc-account">From: ${transaction.accountNoSender}</p>
                  <p class="received-amount">Amount: +${transaction.amount}</p>
                  <p class="cross-line">Before: ${transaction.balanceBefore}</p>
                  <p>After: ${transaction.balanceBefore + transaction.amount}</p>
                </div>`
            )
          : html`<p>No transactions yet.</p>`}
      </div>
      <div class="flex-box" id="sent" style="${styleColumn2}">
        <h3>Sent Transactions</h3>
        ${this.sentTransactions.length > 0
          ? this.sentTransactions.map(
              transaction =>
                html`<div class="transaction">
                  <p class="asoc-account">To: ${transaction.accountNoReceiver}</p>
                  <p class="lost-amount">Amount: -${transaction.amount}</p>
                  <p class="cross-line">Before: ${transaction.balanceBefore}</p>
                  <p>After: ${transaction.balanceBefore - transaction.amount}</p>
                </div>`
            )
          : html`<p>No transactions yet.</p>`}
      </div>`;
  }
  async setDetails() {
    const accountNo = getAccount();
    const user = read();
    console.log(accountNo);
    const response = await fetch(
      `http://localhost:3000/bank/access/account?token=${user.token}&accountNo=${accountNo}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    this.accountNo = accountNo;
    let data = await response.json();
    this.balance = data.balance;
    this.receivedTransactions = data.transactionsAsReceiver;
    this.sentTransactions = data.transactionsAsSender;
    this.type = data.type;
    console.log(data);
  }
}
window.customElements.define('bank-account-details', BankAccountDetails);

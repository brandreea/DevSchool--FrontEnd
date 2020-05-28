import { LitElement, html, css } from 'lit-element';
import { read, write } from './storage.js';
export class BankTransactionForm extends LitElement {
  static get styles() {
    return css`
      :host {
        flex: 100%;
      }

      input {
        display: block;
        margin-left: 0%;
        margin-right: auto;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        height: 2rem;
        width: 15rem;
      }
      label {
        margin-left: 0%;
        margin-right: auto;
      }
      form {
        display: block;
        margin-left: 0%;
        margin-right: auto;
        margin-bottom: 10rem;
        padding: 2rem 8rem 8rem 8rem;
      }
      .login-btn {
        margin-top: 2%;
        text-size: 4rem;
        background-color: orange;
        color: white;
        height: 3rem;
        border: orange;
        width: 15rem;
        border-radius: 5px;
      }
      .validation-response {
        display: block;
        color: red;
      }
      h1 {
        font-size: 2rem;
        margin-left: 5rem;
      }
    `;
  }
  static get properties() {
    return {
      validation: { type: String },
      status: { type: Boolean },
      dict: {
        type: Object,
      },
    };
  }
  constructor() {
    super();
    this.validation = '';
    this.status = false;
    this.dict = new Object();
    this.dict['-1'] = 'Your balance is below the amount.';
    this.dict['-2'] = 'The sender acount is not yours.';
    this.dict['-3'] = 'Sender account not found.';
    this.dict['-4'] = 'Target account not found.';
    this.dict['1'] = 'Transaction performed successfully!';
  }
  render() {
    let color = this.status ? 'green' : 'red';
    return html`
      <h1>Transaction details</h1>
      <main>
        <form @submit=${this._onSubmit}>
          <label>Your account</label>
          <input type="text" name="sender" id="sender" required />
          <label>Target account</label>
          <input type="text" name="receiver" id="receiver" required />
          <label> Amount</label>
          <input type="number" name="amount" id="amount" />
          <p class="validation-response" style="color:${color}">
            ${this.validation}
          </p>
          <button class="login-btn" type="Submit">
            Perform transaction
          </button>
        </form>
      </main>
    `;
  }
  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const user = read();
    console.log(user.token);
    let data = {
      token: user.token,
      accountNoSender: formData.get('sender'),
      accountNoReceiver: formData.get('receiver'),
      amount: formData.get('amount'),
    };
    console.log(data);
    const response = await fetch(`http://localhost:3000/bank/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    console.log(res);

    if (res.status.toString() === '1') this.status = true;
    else this.status = false;

    this.validation = this.dict[res.status.toString()];
  }
}
window.customElements.define('bank-transaction-form', BankTransactionForm);

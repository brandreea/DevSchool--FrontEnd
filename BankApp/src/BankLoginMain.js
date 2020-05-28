import { LitElement, html, css } from 'lit-element';
import { read, write, getStatistics, setStatistics } from './storage.js';
import './BankListOfAccounts.js';
export class BankLoginMain extends LitElement {
  static get styles() {
    return css`
      main {
        background-color: lavender;
        padding: 8rem;
        box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.5) inset;
      }
      input {
        display: block;
        // text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        height: 2rem;
        width: 15rem;
      }

      form {
        box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
        border-radius: 14px;
        background-color: white;
        display: block;
        // text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding: 4rem 6rem 6rem 6rem;
        width: 15rem;
      }
      #title {
        font-weight: bolder;
        text-align: center;
        font-size: 2rem;
        color: black;
      }
      p {
        color: red;
      }
      label {
        margin-left: auto;
        margin-right: auto;
      }

      .login-btn {
        margin-top: 1%;
        text-size: 1.5rem;
        text-align: center;
        margin-left: 5.5rem;
        margin-right: auto;
        background-color: orange;
        color: white;
        height: 2rem;
        border: orange;
        width: 4rem;
        border-radius: 5px;
      }
      .validation-response {
        text-align: center;
        display: block;
        color: red;
        height: 2rem;
      }
    `;
  }
  static get properties() {
    return {
      validation: { type: String },
      dict: { type: Object },
    };
  }
  constructor() {
    super();
    this.validation = '';
    this.dict = new Object();
    this.dict['-1'] = 'Incorrect password.';
    this.dict['-2'] = 'No account associated with this email address.';
    this.dict['1'] = '';
  }
  render() {
    return html`
      <main>
        <form @submit=${this._onSubmit}>
          <p id="title">Sign in</p>
          <label>Email</label>
          <input type="text" name="email" id="email" placeholder="Type you email here" required />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password here"
            required
          />
          <p class="validation-response">${this.validation}</p>
          <button class="login-btn" type="Submit">Login</button>
        </form>
      </main>
    `;
  }
  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log(event.target);
    console.log(formData);
    let data = {
      email: formData.get('email'),
      password: formData.get('password'),
      timestamp: Date.now(),
    };
    const response = await fetch(`http://localhost:3000/bank/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    this.validation = this.dict[res.status.toString()];
    if (res.status === 1) {
      write(res);
      window.location.replace('profile.html');
    }
    console.log(formData.get('email'));
  }
}

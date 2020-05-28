import { LitElement, html, css } from 'lit-element';
import { read, write, getAccount } from './storage.js';
export class ProfileStatistics extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 90%;
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
    `;
  }
  static get properties() {
    return {
      sentTransactions: { type: Array },
      receivedTransactions: { type: Array },
    };
  }
  constructor() {
    super();
    const user = read();
    this.sentTransactions = user.statistics.numberOfSentTransactions;
    this.receivedTransactions = user.statistics.numberOfReceivedTransactions;
  }
  render() {
    google.charts.load('current', { packages: ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
    return html``;
  }

  async drawChart() {
    const options = {
      chart: {
        title: 'Activity in the current week',
        subtitle:
          'Total number of both sent transactions and received transactions on all accounts',
      },
    };
    let chartData = google.visualization.arrayToDataTable([
      ['Day', 'Received', 'Sent'],
      ['Monday', this.receivedTransactions[0], this.sentTransactions[0]],
      ['Tuesday', this.receivedTransactions[1], this.sentTransactions[1]],
      ['Wednesday', this.receivedTransactions[2], this.sentTransactions[2]],
      ['Thursday', this.receivedTransactions[3], this.sentTransactions[3]],
      ['Friday', this.receivedTransactions[4], this.sentTransactions[4]],
      ['Saturday', this.receivedTransactions[5], this.sentTransactions[5]],
      ['Sunday,', this.receivedTransactions[6], this.sentTransactions[6]],
    ]);

    let chart = new google.charts.Bar(document.getElementById('statistics-component'));
    chart.draw(chartData, google.charts.Bar.convertOptions(options));
  }
}
window.customElements.define('bank-profile-statistics', ProfileStatistics);

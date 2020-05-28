export function read() {
  const json = window.sessionStorage.getItem('user-details');
  return json === null ? [] : JSON.parse(json);
}

export function write(user) {
  const json = JSON.stringify(user);
  window.sessionStorage.setItem('user-details', json);
}

export function clear() {
  window.sessionStorage.clear();
}
export function getAccount() {
  const json = window.sessionStorage.getItem('account-credentials');
  return json === null ? '1' : JSON.parse(json);
}
export function setAccount(accountNo) {
  console.log('adding to storage');
  const json = JSON.stringify(accountNo);
  window.sessionStorage.setItem('account-credentials', json);
}
export function getStatistics() {
  const json = window.sessionStorage.getItem('ststaistics');
  return json === null ? '1' : JSON.parse(json);
}
export function setStatistics(statistics) {
  console.log('adding to storage');
  const json = JSON.stringify(statistics);
  window.sessionStorage.setItem('statistics', json);
}

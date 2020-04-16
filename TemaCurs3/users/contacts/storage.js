export function read() {
    const json = window.localStorage.getItem('ds-contacts');
    return json === null ? [] : JSON.parse(json);
  }
  
  export function write(contacts) {
    console.log("here in write");
    console.log(contacts);
    const json = JSON.stringify(contacts);
    console.log(json);
    window.localStorage.setItem('ds-contacts', json);
  }
  
  export function append(contact) {
    const contacts = read();
    contacts.push(contact);
    write(contacts);
  }
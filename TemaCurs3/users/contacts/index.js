import { read, append,write } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  //render();
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete() {
    //const contacts=read();
    const contacts=read();
    event.preventDefault();
    const form = event.target;
    let aux=[];
    const data = new FormData(form)
    const contactsHTML=document.getElementById('list').getElementsByTagName('li');
    for(var i=0;i<contacts.length;i++)
       { 
           if(!contactsHTML[i].firstElementChild.checked)
           aux.push(contacts[i])
          console.log(contacts[i]);
       }
    
    write(aux);
    render();
    
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
        <input type="checkbox" name="delete">
        ${contact.name} &lt;${contact.email}&gt; [${contact.phone}]
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;
}
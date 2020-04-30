

import { read, append, remove, write } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);
  document.getElementById('form-delete').addEventListener( 'click',onClickEdit);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      remove(contact);
    }
  });
  form.reset();
  form.elements.delete.disabled = true;
  render();
}

function onChangeDelete(event) {
  console.log("on onChangeDelete:");
  const { form } = event.target;
  // const form = event.target.form;
  // const form = event.currentTarget;
  const data = new FormData(form);
  const hasChecked = data.getAll('checkbox').length > 0;
  console.log(!hasChecked);
  form.elements.delete.disabled = !hasChecked;
}

function onClickEdit(event){
  console.log("on onClickEdit:"); 
  
  const {form}=event.target;
  let contactToEdit="element"+event.target.name; 
  const contacts = read();
  switch(event.target.id){
    case "edit":
        console.log("on edit");
        
        console.log(form.elements[contactToEdit]);
        form.elements[contactToEdit].elements.name.readOnly=false;
        form.elements[contactToEdit].elements.email.readOnly=false;
        form.elements[contactToEdit].elements.phone.readOnly=false;
        form.elements[contactToEdit].elements.update.hidden=false;
        form.elements[contactToEdit].elements.cancel.hidden=false;
        form.elements[contactToEdit].elements.edit.hidden=true;

        break;
    case "update":
      console.log("on update:");
        const newContacts=contacts.map(contact=>{
          if(contact.id == event.target.name)
          {
            console.log(contact.id);
            contact.name=form.elements[contactToEdit].elements.name.value;
            contact.email=form.elements[contactToEdit].elements.email.value
            contact.phone=form.elements[contactToEdit].elements.phone.value;
          }
          return contact;
          });
          write(newContacts);
          render();
      
        break;
    case "cancel":
  
      console.log("on cancel:");
      
      const contact = contacts.find(contact => contact.id == event.target.name);
      console.log(contact);
        if (contact) {
        form.elements[contactToEdit].elements.name.readOnly=true;
        form.elements[contactToEdit].elements.name.value=contact.name;
        form.elements[contactToEdit].elements.email.readOnly=true;
        form.elements[contactToEdit].elements.email.value=contact.email;
        form.elements[contactToEdit].elements.phone.readOnly=true;
        form.elements[contactToEdit].elements.phone.value=contact.phone;
        form.elements[contactToEdit].elements.update.hidden=true;
        form.elements[contactToEdit].elements.cancel.hidden=true;
        form.elements[contactToEdit].elements.edit.hidden=false;
        }
        break;
  
      }


}
function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
        
        <label name="${'label'+ contact.id}">
          
          <fieldset name="${'element'+ contact.id}">
          <input type="checkbox" name="checkbox" value="${contact.id}" >
            <input type="text" name="name" value="${contact.name}" readonly>
            <input type="text" name="email" value="${contact.email}" readonly>
            <input type="text" name="phone" value="${contact.phone}" readonly>
            <input type="button" id="edit" name ="${contact.id}" value="Edit">
            <input type="button" id="update" name="${contact.id}" value="Update" hidden>
            <input type="button" id="cancel" name="${contact.id}" value="Cancel" hidden>
            </fieldset>
          </label>
        
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;
}
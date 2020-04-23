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
  let btn=document.getElementById('delete-btn').disabled;
  append(contact);
  render();
}

function onSubmitDelete() {

    const contacts=read();
    let aux=[];
  
    const contactsHTML=document.getElementById('list').getElementsByTagName('li');
    for(let i=0;i<contacts.length;i++)
       { 
           if(!contactsHTML[i].firstElementChild.checked)
           {
             aux.push(contacts[i]);
           }
          console.log(contacts[i]);
       }
    
    write(aux);
    render();
    
}

export function enableButton()
{
  const contactsHTML=document.getElementById('list').getElementsByTagName('li');
  console.log("here");
  let shouldEnable=false;
  for(let i=0;i<contactsHTML.length;i++)
       { 
           if(contactsHTML[i].firstElementChild.checked)
           {
             shouldEnable=true;
             break;
           }
       }
       console.log(shouldEnable);
       if(shouldEnable==true) 
           document.getElementById('delete-btn').removeAttribute("disabled");
       else document.getElementById('delete-btn').setAttribute("disabled", "disabled");
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
  const contactsHTML=document.getElementById('list').getElementsByTagName('li');
  for(let i=0;i<contacts.length;i++)
     { 
        contactsHTML[i].firstElementChild.addEventListener('change', enableButton);
        
     }
  
  
}
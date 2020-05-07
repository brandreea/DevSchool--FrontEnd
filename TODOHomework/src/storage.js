export function read() {
  const json = window.localStorage.getItem('ds-todos');
  return json === null ? [] : JSON.parse(json);
}

export function write(todos) {
  const json = JSON.stringify(todos);
  window.localStorage.setItem('ds-todos', json);
}

export function append(todo) {
  console.log('in here');
  const todos = read();
  todos.push(todo);
  write(todos);
}

export function remove(todo) {
  const todos = read();
  const index = todos.findIndex(element => element.id === todo.id);
  if (index !== -1) {
    todos.splice(index, 1);
    write(todos);
  }
}

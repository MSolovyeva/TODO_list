/* eslint-disable no-unused-vars */
let list = [];
const editTask = document.getElementById('edit-task');
let editIndex;
renderList();

document.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    AddTodo();
  }
});
document.getElementById('save-button').addEventListener('click', () => {
  updateTask(editIndex, editTask.value);
});

function makeDone(order) {
  list[order].done = !list[order].done;
  renderList();
}
function makeDelete(order) {
  list.splice(order, 1);
  renderList();
}
function updateTask(order, value) {
  list[order].title = value;
  renderList();
}
function getValueEdit(order) {
  editIndex = order;
  editTask.value = list[editIndex].title;
}
function clearList () {
  list = [];
  renderList();
}
function AddTodo() {
  const toDoInput = document.getElementById('input');
  const toDoInputValue = toDoInput.value;
  if (toDoInputValue) {
    list.push({
      title: toDoInputValue,
      done: false
    });
  }
  toDoInput.value = '';
  renderList();
}
function loadTodo(){
  const xhr = new XMLHttpRequest();
  const url = 'https://jsonplaceholder.typicode.com/todos';
    xhr.open('GET', url, true);
    xhr.send();

    let todos = [];
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        todos = JSON.parse(xhr.responseText).map(el => ({
          ...el,
          done: el.completed,
        }));

        list = [
          ...list,
          ...todos,
        ];
        renderList();
      }
    };
}
function renderList() {
  const ul = document.getElementById('list');
  let li;
  let hr;
  let buttonDone;
  let buttonDelete;
  let buttonEdit;
  ul.innerHTML = '';
  list.forEach((item, i) => {
    li = document.createElement('li');
    li.innerHTML = item.title;
    buttonDone = document.createElement('button');
    buttonDone.setAttribute('order', i);
    buttonDone.setAttribute('class', 'btn btn-outline-success float-right');
    buttonDone.innerHTML = 'Done';

    buttonDone.addEventListener('click', (e) => {
      makeDone(e.target.getAttribute('order'));
    });
    if (item.done) li.className = 'done';

    buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('order', i);
    buttonEdit.setAttribute('data-toggle', 'modal');
    buttonEdit.setAttribute('data-target', '#modal');
    buttonEdit.setAttribute('class', 'btn btn-outline-secondary float-right');
    buttonEdit.innerHTML = 'Edit';

    buttonEdit.addEventListener('click', (e) => {
      let order = e.target.getAttribute('order');
      getValueEdit(order);
    });

    buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('order', i);
    buttonDelete.setAttribute('class', 'btn btn-outline-danger float-right');
    buttonDelete.innerHTML = 'Delete';

    buttonDelete.addEventListener('click', (e) => {
      makeDelete(e.target.getAttribute('order'));
    });

    hr = document.createElement('hr');

    li.appendChild(buttonDone);
    li.appendChild(buttonEdit);
    li.appendChild(buttonDelete);

    ul.appendChild(li);
    ul.appendChild(hr);
  });
}

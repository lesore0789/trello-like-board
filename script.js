// Background Changer
const colorarray = ["#B3D9F4", "#B3B6F4", "#F4B3E2", "#B3F4CD", "#F3F4B3"];
const colorbox = document.getElementById("colorbox");

function bgchange(color) {
  document.body.style.background = colorarray[color];
}


colorarray.forEach(function (color, index) {
  let span = document.createElement("span");
  span.style.backgroundColor = color;
  span.addEventListener("click", function () {
      bgchange(index);
  });
  colorbox.appendChild(span);
});

// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Retrieve the board's name from local storage or have it be blank
const boardName = document.getElementById('board-name');
const boardNameInput = localStorage.getItem('boardNameInput') || '';

	boardName.value = boardNameInput;

	boardName.addEventListener('change', (e) => {
		localStorage.setItem('boardNameInput', e.target.value);
	})


const todoInput = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const addButton = document.querySelector(".add-button");
const editButton = document.querySelector(".edit-icon");
const deleteButton = document.querySelector(".delete-icon");




// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoLane.innerHTML = `<h3 class="heading">Waiting to Start</h3>`;
  todo.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add('task');
    div.setAttribute('draggable', true);
    div.innerHTML = `
      <p id="todo-${index}">${item.text} <div class="buttons"><button class="edit-icon" onclick="editTask(${index})"><i class="fa-solid fa-pencil fa-lg"></i></button><button class="delete-icon" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can fa-lg"></i></button></div></p>
    `;
    todoLane.appendChild(div);
  });

}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}


function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

const inputTaskAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnDelete = document.querySelectorAll("[data-btn-delete]");
const btnEdit = document.querySelectorAll("[data-btn-edit]");
const taskListContainer = document.querySelector(".task-list-container");

const validateInput = () => inputTaskAdd.value.trim().length > 0;

// adicionar tarefa
const handleAdd = () => {
  const inputIsValid = validateInput();

  // verifica se o input está vazio
  if (!inputIsValid) {
    alert("Certfique-se de preencher o campo!");
    inputTaskAdd.classList.add("error");
    return;
  }
  inputTaskAdd.classList.remove("error");

  // cria o container da task
  const taskItem = document.createElement("div");
  taskItem.setAttribute("draggable", true);
  taskItem.classList = "task-item";

  // cria o texto da task
  const taskContent = document.createElement("p");
  taskContent.innerHTML = inputTaskAdd.value;
  taskItem.appendChild(taskContent);

  // listener de tarefa completa
  taskItem.addEventListener("click", () => {
    handleComplete(taskContent);
  });

  // listeners de drag
  taskItem.addEventListener("dragstart", ({ target }) => {
    dragstart(target);
  });
  taskItem.addEventListener("dragend", ({ target }) => {
    dragend(target);
  });

  // cria o button da task
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-btn-delete", "");

  const iconDelete = document.createElement("i");
  iconDelete.classList = "fa-regular fa-trash-can";
  btnDelete.appendChild(iconDelete);
  taskItem.appendChild(btnDelete);

  btnDelete.addEventListener("click", () => {
    handleDelete(taskItem, taskContent);
  });

  // adiciona task a lista de tasks
  taskListContainer.appendChild(taskItem);

  // limpa input após adicionar a task
  inputTaskAdd.value = "";
};

// deletar tarefa
function handleDelete(taskItem, taskContent) {
  const tasks = taskListContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskItem.remove();
    }
  }
}

// completar tarefa
function handleComplete(taskContent) {
  const tasks = taskListContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      task.firstChild.classList.toggle("completed");
    }
  }
}

// listeners para adicionar tarefa
inputTaskAdd.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) handleAdd();
});
btnAdd.addEventListener("click", handleAdd);

/* funções de drag and drop TESTE */

// funções de drag
function dragstart(target) {
  target.classList.add("is-dragging");
}

function dragend(target) {
  target.classList.remove("is-dragging");
}

// funções de drop
function dragover(target) {
  target.classList.add("drag-over");
}

function dragleave(target) {
  target.classList.remove("drag-over");
}

/* event listeners */
taskListContainer.addEventListener("dragover", ({ target }) => {
  dragover(target);
  const taskIsBeingDragged = document.querySelector(".is-dragging");
  taskListContainer.appendChild(taskIsBeingDragged);
});

taskListContainer.addEventListener("dragleave", ({ target }) => {
  dragleave(target);
});

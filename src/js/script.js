const inputTaskAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnDelete = document.querySelectorAll("[data-btn-delete]");
const btnEdit = document.querySelectorAll("[data-btn-edit]");
const taskListContainer = document.querySelector(".task-list-container");

const validateInput = () => inputTaskAdd.value.trim().length > 0;

// adicionar tarefa
const handleAdd = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    alert("vazio");
    return;
  }

  // criar container da task
  const taskItem = document.createElement("div");
  taskItem.classList = "task-item";

  // criar texto da task
  const taskContent = document.createElement("p");
  taskContent.innerHTML = inputTaskAdd.value;
  taskItem.appendChild(taskContent);

  taskItem.addEventListener("click", () => {
    handleComplete(taskContent);
  });

  // criar button da task
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-btn-delete", "");

  const iconDelete = document.createElement("i");
  iconDelete.classList = "fa-regular fa-trash-can";
  btnDelete.appendChild(iconDelete);
  taskItem.appendChild(btnDelete);

  btnDelete.addEventListener("click", () => {
    handleDelete(taskItem, taskContent);
  });

  // adicionar task a lista de tasks
  taskListContainer.appendChild(taskItem);

  // limpar input após adicionar a task
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

inputTaskAdd.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) handleAdd();
});
btnAdd.addEventListener("click", handleAdd);

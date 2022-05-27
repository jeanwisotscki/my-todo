const inputTaskAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnDelete = document.querySelectorAll("[data-btn-delete]");
const btnEdit = document.querySelectorAll("[data-btn-edit]");
const taskListContainer = document.querySelector(".task-list-container");

const validateInput = () => inputTaskAdd.value.trim().length > 0;

// adicionar tarefa
const handleAdd = (e) => {
  e.preventDefault();
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    alert("vazio");
    return;
  }

  const taskItem = document.createElement("div");
  taskItem.classList = "task-item";

  const taskContent = document.createElement("p");
  taskContent.innerHTML = inputTaskAdd.value;
  taskItem.appendChild(taskContent);

  const btnsContainer = document.createElement("div");
  btnsContainer.classList = "btns-container";

  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("data-btn-edit", "");

  const iconEdit = document.createElement("i");
  iconEdit.classList = "fa-regular fa-pen-to-square";
  btnEdit.appendChild(iconEdit);
  btnsContainer.appendChild(btnEdit);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-btn-delete", "");

  const iconDelete = document.createElement("i");
  iconDelete.classList = "fa-regular fa-trash-can";
  btnDelete.appendChild(iconDelete);
  btnsContainer.appendChild(btnDelete);

  taskItem.appendChild(btnsContainer);
  taskListContainer.appendChild(taskItem);

  inputTaskAdd.value = "";
};

btnAdd.addEventListener("click", handleAdd);

// deletar tarefa
function handleDelete() {
  console.log("deletar");
}

// editar tarefa
function handleEdit() {
  console.log("editar");
}

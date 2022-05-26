const inpAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnDelete = document.querySelectorAll("[data-delete]");
const btnEdit = document.querySelectorAll("[data-edit]");
const tasksListElement = document.querySelector("[data-tasks-list]");

// adicionar tarefa
const handleAdd = (e) => {
  e.preventDefault();

  if (!inpAdd.value) {
    alert("teste");
    return;
  }

  const task = document.createElement("div");
  task.classList = "task";

  const inp = document.createElement("input");
  inp.setAttribute("type", "checkbox");
  task.appendChild(inp);

  const p = document.createElement("p");
  p.innerHTML = inpAdd.value;
  task.appendChild(p);

  const btnsContainer = document.createElement("div");
  btnsContainer.classList = "btns-container";

  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("data-edit", "");
  btnEdit.setAttribute("onclick", "handleEdit()");
  const imgEdit = document.createElement("img");
  imgEdit.setAttribute("src", "../src/assets/mode_black_24dp.svg");
  imgEdit.setAttribute("alt", "edit task icon");
  btnEdit.appendChild(imgEdit);
  btnsContainer.appendChild(btnEdit);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-delete", "");
  btnDelete.setAttribute("onclick", "handleDelete()");
  const imgDelete = document.createElement("img");
  imgDelete.setAttribute("src", "../src/assets/delete_black_24dp.svg");
  imgDelete.setAttribute("alt", "delete task icon");
  btnDelete.appendChild(imgDelete);
  btnsContainer.appendChild(btnDelete);

  task.appendChild(btnsContainer);
  tasksListElement.appendChild(task);

  inpAdd.value = "";
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

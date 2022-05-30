const inputTaskAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnDelete = document.querySelectorAll("[data-btn-delete]");
const taskListContainer = document.querySelector(".task-list-container");
const validateInput = () => inputTaskAdd.value.trim().length > 0;

// carrega as tasks que estão no localStorage
refreshTasksUsingLocalStorage();

function removeInputErrorClass() {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    inputTaskAdd.classList.remove("error");
  }
}

/* Funções das tasks (adicionar, deletar, completar)
 *****************************************************/

// adiciona task
function handleAddTask() {
  const inputIsValid = validateInput();

  // verifica o input
  if (!inputIsValid) {
    alert("Preencha o campo antes de adicionar alguma tarefa!");
    inputTaskAdd.classList.add("error");
    return;
  }

  // cria o container da task
  const taskItem = document.createElement("div");
  taskItem.setAttribute("draggable", true);
  taskItem.classList = "task-item";

  // cria o texto da task
  const taskContent = document.createElement("p");
  taskContent.innerText = inputTaskAdd.value;
  taskItem.appendChild(taskContent);

  // cria o button da task
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-btn-delete", "");

  const iconDelete = document.createElement("i");
  iconDelete.classList = "fa-regular fa-trash-can";
  btnDelete.appendChild(iconDelete);
  taskItem.appendChild(btnDelete);

  // adiciona task a lista de tasks
  taskListContainer.appendChild(taskItem);

  // listener de delete
  btnDelete.addEventListener("click", () => {
    handleDeleteTask(taskItem, taskContent);
  });

  // listener de task completa
  taskItem.addEventListener("click", () => {
    handleCompleteTask(taskContent);
  });

  // listeners de drag
  taskItem.addEventListener("dragstart", ({ target }) => {
    dragstart(target);
  });
  taskItem.addEventListener("dragend", ({ target }) => {
    dragend(target);
  });

  // limpa input após adicionar a task
  inputTaskAdd.value = "";

  updateLocalStorage();
}

// deletar task
function handleDeleteTask(taskItem, taskContent) {
  const tasks = taskListContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskItem.remove();
    }
  }

  updateLocalStorage();
}

// completar task
function handleCompleteTask(taskContent) {
  const tasks = taskListContainer.childNodes;

  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
}

/* Funções de localStorage
 **********************************************/
function updateLocalStorage() {
  const tasks = taskListContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return {
      description: content.innerHTML,
      isCompleted,
    };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

function refreshTasksUsingLocalStorage() {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  for (const task of tasksFromLocalStorage) {
    // cria o container da task
    const taskItem = document.createElement("div");
    taskItem.setAttribute("draggable", true);
    taskItem.classList = "task-item";

    // cria o texto da task
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }
    taskItem.appendChild(taskContent);

    // cria o button da task
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("data-btn-delete", "");

    const iconDelete = document.createElement("i");
    iconDelete.classList = "fa-regular fa-trash-can";
    btnDelete.appendChild(iconDelete);
    taskItem.appendChild(btnDelete);

    // adiciona task a lista de tasks
    taskListContainer.appendChild(taskItem);

    // listener de delete
    btnDelete.addEventListener("click", () => {
      handleDeleteTask(taskItem, taskContent);
    });

    // listener de tarefa completa
    taskItem.addEventListener("click", () => {
      handleCompleteTask(taskContent);
    });

    // listeners de drag
    taskItem.addEventListener("dragstart", ({ target }) => {
      dragstart(target);
    });
    taskItem.addEventListener("dragend", ({ target }) => {
      dragend(target);
    });
  }
}

/* Funções de drag and drop
 *************************************************/
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

/* Event listeners
 *******************************************************/
inputTaskAdd.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) handleAddTask();
});
btnAdd.addEventListener("click", handleAddTask);

inputTaskAdd.addEventListener("input", removeInputErrorClass);

taskListContainer.addEventListener("dragover", ({ target }) => {
  dragover(target);
  const taskIsBeingDragged = document.querySelector(".is-dragging");
  taskListContainer.appendChild(taskIsBeingDragged);
});

taskListContainer.addEventListener("dragleave", ({ target }) => {
  dragleave(target);
});

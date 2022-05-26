const btnAdd = document.querySelector("[data-add]");
const btnDelete = document.querySelectorAll("[data-delete]");
const btnEdit = document.querySelectorAll("[data-edit]");

// adicionar
const handleAdd = (e) => {
  e.preventDefault();
  console.log("adicionar");
};

btnAdd.addEventListener("click", handleAdd);

// deletar
const handleDelete = (e) => {
  e.preventDefault();
  console.log("deletar");
};

btnDelete.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});

// editar
const handleEdit = (e) => {
  e.preventDefault();
  console.log("editar");
};

btnEdit.forEach((btn) => {
  btn.addEventListener("click", handleEdit);
});

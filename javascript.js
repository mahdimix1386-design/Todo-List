
const inp = document.querySelector(".inp");
const add = document.querySelector(".add");
const btn = document.querySelector(".btn");
const ul = document.querySelector("ul");
const done = document.querySelector("#done");

function main() {
  btn.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("light");
    btn.classList.toggle("btn-light");
  });

  makeElement(JSON.parse(localStorage.getItem("todos")));

  ul.addEventListener("dragover", (e) => {
    e.preventDefault;
    if (
      e.target.classList.contains("tasks") &&
      !e.target.classList.contains("drag")
    ) {
      const dragback = document.querySelector(".drag");
      const allDiv = [...ul.querySelectorAll(".tasks")];
      const currentPos = allDiv.indexOf(dragback);
      const newPos = allDiv.indexOf(e.target);
      console.log(currentPos, newPos);
      if (currentPos > newPos) {
        ul.insertBefore(dragback, e.target);
      } else {
        ul.insertBefore(dragback, e.target.nextSibling);
      }
      const todosLocal = JSON.parse(localStorage.getItem("todos"));
      const removed = todosLocal.splice(currentPos, 1);
      todosLocal.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todosLocal));
    }
  });

  add.addEventListener("click", () => {
    const item = inp.value.trim();
    if (item) {
      inp.value = "";
      const todosAll = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = {
        item: item,
        completed: false,
      };
      todosAll.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todosAll));
      makeElement([currentTodo]);
    }
  });

  inp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      add.click();
    }
  });
}

function editLocal(i, c) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[i].completed = c;
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function makeElement(array) {
  if (!array) {
    return null;
  }
  array.forEach((todoObj) => {
    const divElement = document.createElement("div");
    const pElement = document.createElement("p");
    const iconElement = document.createElement("div");
    const img1 = document.createElement("img");
    const input = document.createElement("input");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    if (todoObj.completed === true) {
      divElement.classList.add("under");
      input.setAttribute("checked", "checked");
    }

    //add class

    divElement.classList.add("tasks");
    pElement.classList.add("title-task");
    iconElement.classList.add("icon");

    //set attribute

    img1.setAttribute("src", "image/remove-filled-svgrepo-com.svg");
    input.setAttribute("type", "checkbox");
    divElement.setAttribute("draggable", true);
    span1.setAttribute("id", "remove");
    span2.setAttribute("id", "done");

    //add eventlistener

    divElement.addEventListener("dragstart", () => {
      divElement.classList.add("drag");
    });
    divElement.addEventListener("dragend", () => {
      divElement.classList.remove("drag");
    });

    pElement.textContent = todoObj.item;

    span1.appendChild(img1);
    span2.appendChild(input);
    iconElement.appendChild(span1);
    iconElement.appendChild(span2);
    divElement.appendChild(pElement);
    divElement.appendChild(iconElement);

    document.querySelector("ul").appendChild(divElement);

    span2.addEventListener("click", () => {
      divElement.classList.toggle("under");
      const current = span2.parentElement.parentElement;
      const check = input.checked;
      const currentIndex = [
        ...document.querySelectorAll(".task .tasks"),
      ].indexOf(current);
      editLocal(currentIndex, check);
    });

    span1.addEventListener("click", (e) => {
      const current = span1.parentElement.parentElement;
      current.classList.add("fall");
      const currentIndex = [
        ...document.querySelectorAll(".task .tasks"),
      ].indexOf(current);
      removeTodo(currentIndex);
    });
  });
}

document.addEventListener("DOMContentLoaded", main);

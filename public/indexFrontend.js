document.addEventListener("DOMContentLoaded", fetchTodos);
const mainarea = document.getElementById("main");

function getData(data) {
  displayTodos(data);
}

function callback(resp) {
  resp.json().then(getData);
}

function fetchTodos() {
  mainarea.innerHTML = "";
  fetch("http://localhost:3000/todos", {
    method: "GET",
  }).then(callback);
}

function displayTodos(todos) {
  todos.forEach((e) => {
    if (e.title !== "") {
      let childElement = document.createElement("div");
      childElement.innerHTML = e.title;

      let grandChildElement = document.createElement("button");
      grandChildElement.innerHTML = "❌";
      childElement.appendChild(grandChildElement);
      grandChildElement.addEventListener("click", () => deleteTodo(e.id));

      mainarea.appendChild(childElement);
    }
  });
}

//post request

function appearMe() {
  const titleinput = document.getElementById("title");
  const title = document.getElementById("title").value;
  fetch("http://localhost:3000/todos", {
    method: "post",
    body: JSON.stringify({ title: title, description: " " }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(fetchTodos)
    .then(() => {
      titleinput.value = "";
    });
}

//Delete request

function deleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      fetchTodos();
    } else {
      console.error("error");
    }
  });
}

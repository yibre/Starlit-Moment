const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
pendingList = document.querySelector(".pending-list"),
finishedList = document.querySelector(".finished-list");

// this is the key of local storage pending list and finished list
const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pendings = [];
let finisheds = [];

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanPending
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finished.removeChild(li);
}

function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
  }

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = pending.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    pendingList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    savePending();
  }

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo) {
        paintToDo(toDo.text);
      });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }
  
init();
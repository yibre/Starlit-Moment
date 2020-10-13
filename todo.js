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
  const cleanPendings = pendings.filter(function(temp) {
    return temp.id !== parseInt(li.id);
  });
  pendings = cleanPendings;
  savePendings();
  console.log("deletePending function is called");
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finisheds.filter(function(temp) {
    return temp.id !== parseInt(li.id);
  });
  finisheds = cleanFinished;
  saveFinished();
  console.log("deleteFinished function is called");
}


function savePendings() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

//this function will be executed after form is submitted.
function paintPendings(text) {
  console.log("come from paintPendings");
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendings.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "✔️"; // which is finished
  delBtn.addEventListener("click", deletePending); // delete item if X button is pressed.
  finBtn.addEventListener("click", (event) => {   
    deletePending(event);
    paintFinisheds(text);  
  });
  // finBtn.addEventListener("click", addFinished); // add to finished list
  span.innerText = text; // add items on the pending list
  li.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(span);
  li.id = newId; // give tiem id key
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  pendings.push(toDoObj);
  savePendings(); // save the item in the local storage
}

function paintFinisheds(text) {
  console.log("come from paintFinished");
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finisheds.length + 1;
  delBtn.innerText = "❌";
  finBtn.innerText = "✔️"; // which is finished
  delBtn.addEventListener("click", deleteFinished); // delete item if X button is pressed.
  finBtn.addEventListener("click", (event) => {   
    deleteFinished(event);
    paintPendings(text);
  });
  // finBtn.addEventListener("click", addFinished); // add to finished list
  span.innerText = text; // add items on the pending list
  li.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(span);
  li.id = newId; // give tiem id key
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  finisheds.push(toDoObj);
  saveFinished(); // save the item in the local storage
}

//this function will be executed right after toDoForm is filled and the user press enter
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPendings(currentValue);
  toDoInput.value = "";
}

function loadPendings() {
  const loadedPendings = localStorage.getItem(PENDING_LS);
  if (loadedPendings !== null) {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function(toDo) {
      paintPendings(toDo.text);
    });
  }
}

function loadFinisheds() {
  const loadedFinisheds = localStorage.getItem(FINISHED_LS);
  if (loadedFinisheds !== null) {
    const temp = JSON.parse(loadedFinisheds);
    temp.forEach(function(item) {
      paintFinisheds(item.text);
    });
  }
}

function init() {
  loadPendings();
  loadFinisheds();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
let text = document.querySelector(".input");
let btn = document.querySelector(".add");
let container = document.querySelector(".container");
let img = document.querySelector("img");
let tasksDiv = document.querySelector(".tasks");


img.addEventListener("click", () => {
  text.focus();
  text.style.border = "1px solid goldenrod";
});


window.addEventListener("load", function () {

  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasksArray.length > 0) {
    if (!tasksDiv) {
      tasksDiv = document.createElement("div");
      tasksDiv.classList.add("tasks");
      container.appendChild(tasksDiv);
    }

    tasksArray.forEach(taskText => {
      createElement(taskText);
    });
  }
  checkAndRemoveTasksDiv();
});


function createElement(taskText,completed =false) {
  let main = document.createElement("div");
  main.classList.add("main");
  let checkBox = document.createElement("div");
  checkBox.classList.add("checkBox")

  let addedText = document.createElement("div");
  

  addedText.textContent = taskText;
  addedText.classList.add("modify")
  addedText.style.width = "90%";
  addedText.style.height = "auto";
  addedText.style.position = "relative";
  addedText.style.display = "flex";
  addedText.style.flexWrap = "wrap";
  addedText.style.alignItems = "center";
  addedText.style.fontWeight = "bolder";
  addedText.style.fontSize = "20px";
  addedText.style.fontStyle = "'Helvetica', sans-serif";
  addedText.style.borderRadius = "10px";
  addedText.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  addedText.style.background = "#ddfae2"; 
  addedText.style.overflow = "hidden"; 
  addedText.style.whiteSpace = "normal"; 
  addedText.style.wordBreak = "break-word";
  addedText.style.paddingBlock = "20px"

  let deleteButton = document.createElement("button");
  
  deleteButton.style.color = "white";
  deleteButton.style.fontWeight = "bold";
  deleteButton.style.border = "none";
  deleteButton.style.position = "absolute";
  deleteButton.classList.add("delete-button");

     
  deleteButton.style.right = "0px";
  deleteButton.style.top = "0px";
  deleteButton.textContent = "X"
  deleteButton.style.width = "20px";
  deleteButton.style.height = "20px";
  deleteButton.style.display = "flex";
  deleteButton.style.justifyContent = "center";
  deleteButton.style.alignItems = "center";
  
  
  checkBox.addEventListener("click",() => {
    if(checkBox.classList.contains("checkBox")){
      addedText.style.textDecoration = "line-through";
      addedText.style.color = "#218838";
      checkBox.classList.remove("checkBox");
      checkBox.classList.add("checkBoxModify");
      checkBox.innerHTML = ` <img src="img/check_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.png" alt="Delete" style="width: 100%; height: 100%;">`;
      updateTaskInLocalStorage(taskText, true);
    } else {
        addedText.style.textDecoration = "none";
        addedText.style.color = "black";
        checkBox.classList.remove("checkBoxModify");
        checkBox.classList.add("checkBox");
        checkBox.innerHTML = "";
        updateTaskInLocalStorage(taskText, false);
    }  
  })
    
  checkBox.addEventListener("click",() => {
 
  })

  deleteButton.addEventListener("click", function () {
    main.remove();
    removeTaskFromLocalStorage(taskText);
    checkAndRemoveTasksDiv();
  });

  if (!tasksDiv) {
    tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks");
    container.appendChild(tasksDiv);
  }

  addedText.appendChild(deleteButton);
  main.appendChild(checkBox);
  main.appendChild(addedText);
  tasksDiv.appendChild(main);
}


function addTaskToLocalStorage(taskText) {
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function updateTaskInLocalStorage(taskText, completed) {
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskIndex = tasksArray.findIndex(task => task.text === taskText);
  if (taskIndex !== -1) {
    tasksArray[taskIndex].completed = completed;
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function removeTaskFromLocalStorage(taskText) {
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray = tasksArray.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}


function checkAndRemoveTasksDiv() {
  if (tasksDiv && tasksDiv.children.length === 0) {
    tasksDiv.remove();
    tasksDiv = null;
  }
}


btn.addEventListener("click", function () {
  if (text.value !== "") {
    createElement(text.value);
    addTaskToLocalStorage(text.value);
    text.value = "";
  }
});

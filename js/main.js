class ToDo {
    constructor(name, check, complete) {
        this.name = name;
        this.check = check;
        this.complete = complete;
    }
}

let toDoList = [];

window.onload = function() {
    
    let toDo = new ToDo('Wash', false, false);
    let toDo2 = new ToDo('Clean', false, false);
    let toDo3 = new ToDo('Cook', false, false);

    toDoList.push(toDo);
    toDoList.push(toDo2);
    toDoList.push(toDo3);
    
    document.getElementById("addBtn").addEventListener('click', createTodo);

    generateToDoList();
}

function createTodo() {

    let newToDo = document.getElementById("myInput").value;

    let toDo = new ToDo(newToDo, false, false);

    toDoList.push(toDo);

    generateToDoList();
    console.log(toDoList);
}

function generateToDoList() {

    let container = document.getElementById("activeContainer");
    container.innerHTML = " ";

    let ulElement = document.createElement("ul");
    ulElement.className = "defaultToDoList";
    container.appendChild(ulElement);

    for (let i = 0; i < toDoList.length; i++) {

        if ((toDoList[i].complete) == false) {
        
            let liElement = document.createElement("li");

            if ((toDoList[i].check) == true) {
                
                liElement.className = "checked";
            }

            let toDoTask = document.createElement("span");
            toDoTask.className = "toDoSpan";
            toDoTask.innerHTML = toDoList[i].name;
            toDoTask.addEventListener('click', () => { checkToDo(toDoList[i]) });
            
            let checkBtn = document.createElement("button");
            checkBtn.type = "button";
            checkBtn.className = "toDoButtons";
            checkBtn.innerHTML = "<i class='fas fa-check'></i>";
            checkBtn.addEventListener('click', () => { checkToDo(toDoList[i]) });

            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "toDoButtons";
            deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
            deleteBtn.addEventListener('click', () => { deleteToDo(toDoList[i]) });

            let orgBtn = document.createElement("button");
            orgBtn.type = "button";
            orgBtn.className = "toDoButtons"
            orgBtn.innerHTML = "<i class='fas fa-arrow-circle-up'></i>";
            orgBtn.addEventListener('click', () => { organizeToDo(toDoList[i]) });
            
            liElement.appendChild(checkBtn);
            liElement.appendChild(toDoTask);
            liElement.appendChild(orgBtn);
            liElement.appendChild(deleteBtn);
            ulElement.appendChild(liElement);
        }
    }
    //console.log(toDoList);
}

function checkedToDoList() {

    let container = document.getElementById("trashContainer");
    container.innerHTML = " ";

    let ulElement = document.createElement("ul");
    ulElement.className = "checkedToDoList";
    container.appendChild(ulElement);

    for (let i = 0; i < toDoList.length; i++) {

        if ((toDoList[i].complete) == true) {

            let liElement = document.createElement("li");
            liElement.innerHTML = toDoList[i].name + " ";

            let recycleBtn = document.createElement("button");
            recycleBtn.type = "button";
            recycleBtn.className = "toDoButtons";
            recycleBtn.innerHTML = "<i class='fas fa-recycle'></i>";
            recycleBtn.addEventListener('click', () => { deleteToDo(toDoList[i]) });

            liElement.appendChild(recycleBtn);
            ulElement.appendChild(liElement);
        }
    }
}

function deleteToDo(toDo) {

    if (toDo.complete == false) { 

    toDo.complete = true;

    } else {

        toDo.complete = false;
    }
    //Experiment: lägg till recycled Task sist i array
    if (toDo.complete == false) {
        for(let i = 0; i < toDoList.length; i++) {

            if (toDoList[i] == toDo) {
            toDoList.splice(i, 1,);
            toDoList.push(toDo);
            } 
        }
        
    }
    console.log(toDoList);
    generateToDoList();
    checkedToDoList();
}

function recycleToDo(toDo) {
    
}

function organizeToDo(toDo) {

    for(let i = 0; i < toDoList.length; i++) {

        if (toDoList[i] == toDo) {
        toDoList.splice(i, 1,);
        toDoList.splice(0, 0, toDo);
        } 
    }   

    generateToDoList();
}

function checkToDo(toDo) {

    if (toDo.check == false) {

        toDo.check = true;
    } else {
        toDo.check = false;
    }

    generateToDoList();
}
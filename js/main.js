class ToDo {
    constructor(name, check, complete) {
        this.name = name;
        this.check = check;
        this.complete = complete;
    }
}

let toDoList = [];
let trashList = [];

window.onload = function() {
    
    let toDo = new ToDo('Wash', false, false);
    let toDo2 = new ToDo('Clean', false, false);
    let toDo3 = new ToDo('Cook', false, false);

    toDoList.push(toDo);
    toDoList.push(toDo2);
    toDoList.push(toDo3);
    
    document.getElementById("addBtn").addEventListener('click', createTodo);

    document.getElementById("myInput").addEventListener("keydown", function(e) {

        if (e.key === 'Enter') {

            e.preventDefault();

            document.getElementById("addBtn").click();
        }
    });

    document.getElementById("emptyBin");
    let emptyTrashBtn = document.createElement("button");
    emptyTrashBtn.type = "button";
    emptyTrashBtn.id = "deleteTrashBtn";
    emptyTrashBtn.innerHTML = "Empty Trashbin <i class='fas fa-trash'></i>";
    emptyTrashBtn.addEventListener('click', deleteTrashList);
    emptyBin.appendChild(emptyTrashBtn);

    generateToDoList();
    generateTrashList();
}

function createTodo() {

    let input = document.getElementById("myInput");

    let userInput = input.value;

    let newToDo = new ToDo(userInput, false, false);

    if (input.value == " ") {
        alert("You must enter a Task!");
        return false;
    };

    toDoList.push(newToDo);

    generateToDoList();
}

function generateToDoList() {

    document.getElementById("myInput").value = " ";

    let container = document.getElementById("activeContainer");
    container.innerHTML = " ";

    let heading = document.createElement("h4");
    heading.innerHTML = "To do List";
    heading.className = "containerHeadings";
    container.appendChild(heading);

    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);

    for (let i = 0; i < toDoList.length; i++) {

        if ((toDoList[i].complete) == false) {
        
            let liElement = document.createElement("li");

            if ((toDoList[i].check) == true) {
                
                liElement.className = "checked";
            }

            let toDoName = document.createElement("span");
            toDoName.className = "toDoSpan";
            toDoName.innerHTML = toDoList[i].name;
            toDoName.addEventListener('click', () => { checkToDo(toDoList[i]) });
            
            // let checkBtn = document.createElement("button");
            // checkBtn.type = "button";
            // checkBtn.className = "toDoButtons";
            // checkBtn.innerHTML = "<i class='fas fa-check'></i>";
            // checkBtn.addEventListener('click', () => { checkToDo(toDoList[i]) });

            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "toDoButtons";
            deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
            deleteBtn.addEventListener('click', () => { deleteTodo(toDoList[i]) });

            let orgBtn = document.createElement("button");
            orgBtn.type = "button";
            orgBtn.className = "toDoButtons"
            orgBtn.innerHTML = "<i class='fas fa-arrow-circle-up'></i>";
            orgBtn.addEventListener('click', () => { organizeToDo(toDoList[i]) });
            
            //liElement.appendChild(checkBtn);
            liElement.appendChild(toDoName);
            liElement.appendChild(orgBtn);
            liElement.appendChild(deleteBtn);
            ulElement.appendChild(liElement);
        }
    }
}

function generateTrashList() {

    let container = document.getElementById("trashContainer");
    container.innerHTML = " ";

    let heading = document.createElement("h4");
    heading.innerHTML = "Deleted Tasks"
    heading.className = "containerHeadings";
    container.appendChild(heading);

    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);

    for (let i = 0; i < trashList.length; i++) {

        if ((trashList[i].complete) == true) {

            let liElement = document.createElement("li");

            let toDoName = document.createElement("span");
            toDoName.className = "toDoSpan";
            toDoName.innerHTML = trashList[i].name;
            toDoName.addEventListener('click', () => { deleteTodo(trashList[i]) });

            let recycleBtn = document.createElement("button");
            recycleBtn.type = "button";
            recycleBtn.className = "toDoButtons";
            recycleBtn.innerHTML = "<i class='fas fa-recycle'></i>";
            recycleBtn.addEventListener('click', () => { deleteTodo(trashList[i]) });

            liElement.appendChild(toDoName);
            liElement.appendChild(recycleBtn);
            ulElement.appendChild(liElement);
        }
    }
}

function deleteTodo(toDo) {

    if (toDo.complete == false) { 

    toDo.complete = true;

        if (toDo.complete == true)
            for(let i = 0; i < toDoList.length; i++) {

                if (toDoList[i] == toDo) {
                toDoList.splice(i, 1,);
                trashList.push(toDo);
                } 
            }
    
    } else {

        toDo.complete = false;

        if (toDo.complete == false)
            for(let i = 0; i < trashList.length; i++) {

                if (trashList[i] == toDo) {
                trashList.splice(i, 1,);
                toDoList.push(toDo);
                } 
            }
    }

    console.log(toDoList);
    generateToDoList();
    generateTrashList();
}

function organizeToDo(toDo) {

    for(let i = 0; i < toDoList.length; i++) {

        if (toDoList[i] == toDo) {
        toDoList.splice(i, 1);
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

function deleteTrashList() {
   
    for(let i = 0; i <= trashList.length; i++) {

        if (trashList == 0){
            alert('You have nothing in trash');
            return false;
        }

        if (trashList[i].complete == true) {
            trashList.splice(trashList[i], trashList.length);
        }
    }

    generateTrashList();
}
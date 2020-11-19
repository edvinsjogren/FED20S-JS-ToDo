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

    renderHTMLContent();
    getFromLocalStorage();
    
    if (toDoList.length === 0 && trashList.length === 0) {
        let toDo1 = new ToDo('Example 1', false, false);
        let toDo2 = new ToDo('Example 2', false, false);
        let toDo3 = new ToDo('Example 3', false, false);
    
        toDoList.push(toDo1);
        toDoList.push(toDo2);
        toDoList.push(toDo3);
        renderToDoList();
    }
}

function renderHTMLContent() {

    let headerSection = document.createElement("section");
    headerSection.id = "headerSection";

    let mainHeading = document.createElement("h1");
    mainHeading.innerHTML = 'Eddies Tidy "To Do List" Generator';

    let subHeading = document.createElement("h3");
    subHeading.innerHTML = '- Your own personal organizer -';

    let myForm = document.createElement("form");
    myForm.id = "myForm"

    let myInput = document.createElement("input");
    myInput.type = "text";
    myInput.id = "myInput";
    myInput.name = "User Input";
    myInput.maxLength = 50;
    myInput.addEventListener("keydown", function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById("addBtn").click();
        }
    });

    let addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.id = "addBtn";
    addBtn.innerHTML = "Add Task";
    addBtn.addEventListener('click', createTodo);

    document.body.appendChild(headerSection);
    headerSection.appendChild(mainHeading);
    headerSection.appendChild(subHeading);
    headerSection.appendChild(myForm);
    myForm.appendChild(myInput);
    myForm.appendChild(addBtn);

    let displaySection = document.createElement("section");
    displaySection.id = "displaySection";

    let activeContainer = document.createElement("div");
    activeContainer.id = "activeContainer";

    let trashContainer = document.createElement("div");
    trashContainer.id = "trashContainer";

    
    
    document.body.appendChild(displaySection);
    displaySection.appendChild(activeContainer);
    displaySection.appendChild(trashContainer);
    // displaySection.appendChild(emptyBinContainer);
    // emptyBinContainer.appendChild(emptyTrashBtn);
}

function getFromLocalStorage() {

    let toDoListFromLS = localStorage.getItem("toDoList");
    
    if (toDoListFromLS) { 

        let getToDoList = JSON.parse(toDoListFromLS);
        
        for (let i = 0; i < getToDoList.length; i++) {

            let todo = new ToDo(getToDoList[i].name, getToDoList[i].check, getToDoList[i].complete);
            
            toDoList.push(todo)
        }
    }

    let trashListFromLS = localStorage.getItem("trashList");

    if (trashListFromLS) {

        let getTrashList = JSON.parse(trashListFromLS);
            
            for (let i = 0; i < getTrashList.length; i++) {

                let todo = new ToDo(getTrashList[i].name, getTrashList[i].check, getTrashList[i].complete);
                
                trashList.push(todo)
            }
    }

    renderToDoList();
    renderTrashList();
}

function addToDoListToLocalStorage() {

    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    renderToDoList();
}

function addTrashListToLocalStorage(){

    localStorage.setItem("trashList", JSON.stringify(trashList));
    renderTrashList();
}

function renderToDoList() {

    document.getElementById("myInput").value = " ";

    let container = document.getElementById("activeContainer");
    container.innerHTML = " ";

    let heading = document.createElement("h4");
    heading.innerHTML = "Your Todo List";
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

            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "toDoButtons";
            deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
            deleteBtn.addEventListener('click', () => { deleteTodo(toDoList[i]) });

            let moveUpBtn = document.createElement("button");
            moveUpBtn.type = "button";
            moveUpBtn.className = "toDoButtons"
            moveUpBtn.innerHTML = "<i class='fas fa-arrow-circle-up'></i>";
            moveUpBtn.addEventListener('click', () => { organizeToDoUpwards(toDoList[i]) });

            let moveDownBtn = document.createElement("button");
            moveDownBtn.type = "button";
            moveDownBtn.className = "toDoButtons"
            moveDownBtn.innerHTML = "<i class='fas fa-arrow-circle-down'></i>";
            moveDownBtn.addEventListener('click', () => { organizeToDoDownwards(toDoList[i]) });
            
            liElement.appendChild(toDoName);
            liElement.appendChild(moveUpBtn);
            liElement.appendChild(moveDownBtn);
            liElement.appendChild(deleteBtn);
            ulElement.appendChild(liElement);
        }
    }
}

function renderTrashList() {

    let container = document.getElementById("trashContainer");
    container.innerHTML = " ";

    let heading = document.createElement("h4");
    heading.innerHTML = "Deleted Tasks"
    heading.className = "containerHeadings";
    container.appendChild(heading);

    let emptyTrashBtnContainer = document.createElement("div");
    emptyTrashBtnContainer.id = "emptyBin"

    let emptyTrashBtn = document.createElement("button");
    emptyTrashBtn.type = "button";
    emptyTrashBtn.id = "deleteTrashBtn";
    emptyTrashBtn.innerHTML = "Empty Trashbin";
    emptyTrashBtn.addEventListener('click', deleteTrashList);

    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);

    for (let i = 0; i < trashList.length; i++) {

        if ((trashList[i].complete) == true) {

            let liElement = document.createElement("li");

            if ((trashList[i].check) == true) {
                
                liElement.className = "checked";
            }

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
            container.appendChild(emptyTrashBtnContainer);
            emptyTrashBtnContainer.appendChild(emptyTrashBtn);
        }
    }
}

function createTodo() {

    let input = document.getElementById("myInput");

    let userInput = input.value;

    let toDo = new ToDo(userInput, false, false);

    if (input.value == " ") {
        alert("You must enter a Task!");
        return false;
    };

    toDoList.push(toDo);

    addToDoListToLocalStorage(toDoList);
}

function checkToDo(toDo) {

    if (toDo.check == false) {

        toDo.check = true;
    } else {
        toDo.check = false;
    }

    addToDoListToLocalStorage();
}

function organizeToDoUpwards(toDo) {

    for(let i = 1; i <= toDoList.length; i++) {

        if (toDoList[i] == toDo) {
        toDoList.splice(i, 1);
        toDoList.splice(i - 1, 0, toDo);
        }
    }

    addToDoListToLocalStorage();
}

function organizeToDoDownwards(toDo) {

    for (let i = toDoList.length - 1; i >= 0; i--) {

        if (toDoList[i] == toDo) {
        toDoList.splice(i, 1);
        toDoList.splice(i + 1, 0, toDo);
        } 
    }   

    addToDoListToLocalStorage();
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

    addToDoListToLocalStorage();
    addTrashListToLocalStorage();
}

function deleteTrashList() {
   
    for(let i = 0; i <= trashList.length; i++) {

        if (trashList == 0){
            alert('Your trashbin is empty!');
            return false;
        }

        if (trashList[i].complete == true) {
            trashList.splice(trashList[i], trashList.length);
        }
    }

    addTrashListToLocalStorage();
}
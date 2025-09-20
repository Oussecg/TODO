let array = [];
if (!localStorage){
    localStorage.setItem("todo", JSON.stringify(array));
} else{
    array = JSON.parse(localStorage.getItem("todo"));
}

document.querySelector(".add-button").addEventListener("click", () => {
    const name = document.querySelector(".todo-input").value;
    const date = document.querySelector(".date-input").value;
    array.push(
        {name: name, date: date}
    );
    localStorage.setItem("todo", JSON.stringify(array));
    renderHTML();
});

function removeTask(i){
    array.splice(i, 1);
    localStorage.setItem("todo", JSON.stringify(array));
    renderHTML();
}

function renderHTML() {
    document.querySelector("#todo-list").innerHTML = "";
    array.forEach((element, i) => {
        document.querySelector("#todo-list").innerHTML +=
            `<div class="grid-container">
                <label class="task-name">${element.name}</label>
                <label class="task-date">${element.date}</label>
                <button class="delete-button" onclick="removeTask(${i})">Delete</button>
            </div>`
    });
}
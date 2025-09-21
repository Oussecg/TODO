class Operations {
    constructor() {
        this.array = [];
        this.save_data = this.save_data.bind(this);
        this.load_data = this.load_data.bind(this);
        this.createTask = this.createTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.renderHTML = this.renderHTML.bind(this);
    }

    save_data() {
        $.ajax({
            url: "",
            type: "post",
            data: "",
            success: (data) => {
                if (data.indexOf("failed") === -1) {
                }
            },
        });
    }

    load_data() {
        $.ajax({
            url: "",
            type: "post",
            data: "",
            success: (data) => {
                if (data.indexOf("failed") === -1) {
                }
            },
        });
    }

    createTask() {
        const name = $(".todo-input").val();
        const date = $(".date-input").val();
        this.array.push({ name: name, date: date });
        this.save_data();
        this.renderHTML();
    }

    removeTask(i) {
        this.array.splice(i, 1);
        this.save_data()
        this.renderHTML();
    }

    renderHTML() {
        let taskHtml = "";
        $("#todo-list").html(taskHtml);
        this.array.forEach((element, i) => {
            taskHtml +=
                `<div class="grid-container">
                    <label class="task-name">${element.name}</label>
                    <label class="task-date">${element.date}</label>
                    <button class="delete-button" onclick="removeTask(${i})">Delete</button>
                </div>`
        });
        $("#todo-list").html(taskHtml);
    }
}

class Operations {
    constructor() {
        this.array = [];
        this.save_data = this.save_data.bind(this);
        this.load_data = this.load_data.bind(this);
        this.createTask = this.createTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.renderHTML = this.renderHTML.bind(this);
        this.setButton = this.setButton.bind(this);
        this.setButtonDelete = this.setButtonDelete.bind(this);
    }

    save_data(name, date) {
        $.ajax({
            url: "http://localhost/projects/TODO/php/index/save_data.php",
            type: "post",
            data: `task_name=${name}&task_date=${date}`,
            success: (data) => {
                console.log(data);
                if (data.indexOf("success") !== -1) {
                    $("#result")
                        .html("Operation has completed successfully !")
                        .addClass("onSuccess")
                        .fadeIn(1000);
                } else {
                    $("#result").html(data).addClass("onFailed").fadeIn(1000);
                }
            },
        });
    }

    delete_data(index) {
        let task = this.array.find((task) => {
            if (task.task_id === index) {
                return task.task_name;
            }
        });
        // todo: delete the task from data base
        $.ajax({
            type: "post",
            url: "http://localhost/projects/TODO/php/index/delete_task.php",
            data: `index=${index}`,
            success: (data) => {
                if (data.indexOf("success") !== -1) {
                    $("#result")
                        .html("The operation is successful !")
                        .addClass("onSuccess")
                        .fadeIn(1000);
                } else {
                    $("#result").html(data).addClass("onFailed").fadeIn(1000);
                }
            },
        });
    }

    load_data() {
        $.ajax({
            url: "http://localhost/projects/TODO/php/index/load_data.php",
            type: "post",
            data: "loadData=true",
            success: (data) => {
                if (data.indexOf("failed") === -1) {
                    this.array = JSON.parse(data);
                    this.renderHTML();
                } else {
                    $("#result").html(data).addClass("onFailed").fadeIn(1000);
                }
            },
        });
    }

    createTask() {
        const name = $(".todo-input").val();
        const date = $(".date-input").val();
        this.array.push({
            task_id: this.array.length,
            task_name: name,
            task_date: date,
        });
        console.log(this.array);
        this.save_data(name, date);
        this.renderHTML();
        $("#result").removeClass("onSuccess").removeClass("onFailed").html("");
    }

    removeTask(id) {
        const index = this.array.findIndex((task) => task.task_id === id);
        if (index !== -1) {
            this.array.splice(index, 1);
            this.delete_data(id);
            this.renderHTML();
        }
    }

    renderHTML() {
        $("#todo-list").html("");
        let taskHtml = "";
        this.array.forEach((element) => {
            taskHtml += `<div class="grid-container">
                    <label class="task_create_in">${element.create_in}</label>
                    <label class="task-name">${element.task_name}</label>
                    <label class="task-date">${element.task_date}</label>
                    <button class="delete-button" id='delete-button${element.task_id}' data-id="${element.task_id}">Delete</button>
                </div>`;
        });
        $("#todo-list").html(taskHtml);
        this.setButtonDelete();
    }

    setButton() {
        $(".add-button").on("click", this.createTask);
    }

    setButtonDelete() {
        $(".delete-button").each(function () {
            $(this).on("click", function () {
                const id = $(this).data("id");
                operations.removeTask(id);
            });
        });
    }
}

const operations = new Operations();
operations.setButton();
operations.load_data();

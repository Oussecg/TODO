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
        let name = this.array.find((task) => { if (task.id === index) { return task.name } });
        console.log(name);
    }

    load_data() {
        $.ajax({
            url: "http://localhost/projects/TODO/php/index/load_data.php",
            type: "post",
            data: "",
            success: (data) => {
                if (data.indexOf("failed") === -1) {
                    console.log(data);
                } else {
                    console.log(data);
                }
            },
        });
    }

    createTask() {
        const name = $(".todo-input").val();
        const date = $(".date-input").val();
        this.array.push({ id: this.array.length, name: name, date: date });
        console.log(this.array);
        this.save_data(name, date);
        this.renderHTML();
        $("#result").removeClass("onSuccess").removeClass("onFailed").html("");
    }

    removeTask(i) {
        this.array.splice(i, 1);
        this.delete_data(i);
        this.renderHTML();
    }

    renderHTML() {
        $("#todo-list").html("");
        let taskHtml = "";
        this.array.forEach((element) => {
            taskHtml += `<div class="grid-container">
                    <label class="task-name">${element.name}</label>
                    <label class="task-date">${element.date}</label>
                    <button class="delete-button" id='delete-button${element.id}' data-id="${element.id}">Delete</button>
                </div>`;
        });
        $("#todo-list").html(taskHtml);
        this.setButtonDelete();
    }

    setButton() {
        $(".add-button").on("click", this.createTask);
    }

    setButtonDelete() {
        $(".delete-button").each(function() {
            $(this).on("click", function() {
                const id = $(this).data("id");
                operations.removeTask(id);
            });
        });
    }
}


const operations = new Operations();
operations.setButton();
operations.load_data();

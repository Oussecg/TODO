class Operations {
    constructor() {
        this.can_add = false;
        this.array = [];
        this.save_data = this.save_data.bind(this);
        this.load_data = this.load_data.bind(this);
        this.createTask = this.createTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.renderHTML = this.renderHTML.bind(this);
        this.setButton = this.setButton.bind(this);
        this.setButtonDelete = this.setButtonDelete.bind(this);
        this.getMySQLDateTime = this.getMySQLDateTime.bind(this);
        this.set_button_theme = this.set_button_theme.bind(this);
        this.switch_theme = this.switch_theme.bind(this);
    }

    switch_theme() {
        if (localStorage.getItem("current_theme")) {
            const current_theme = localStorage.getItem("current_theme");
            this.switching_process(current_theme)
        } else {
            const current_theme = $(document.documentElement).attr("data-theme");
            this.switching_process(current_theme)
        }
    }

    switching_process(current_theme) {
        let theme = "";
        if (current_theme === "dark") {
            theme = "light";
            $(".switch-theme").html(
                '<img src="http://localhost/projects/TODO/images/switch-theme/toggle_off.svg" class="switch-image">'
            );
        } else {
            theme = "dark";
            $(".switch-theme").html(
                '<img src="http://localhost/projects/TODO/images/switch-theme/toggle_on.svg" class="switch-image">'
            );
        }
        $(document.documentElement).attr("data-theme", theme);
        localStorage.setItem("current_theme", theme);
    }

    set_button_theme() {
        $(".switch-theme").on("click", this.switch_theme);
    }

    checkInputs(name, date) {
        if (date === "" || name === "") {
            return false;
        }
        return true;
    }

    getMySQLDateTime() {
        const now = new Date();
        const pad = (n) => (n < 10 ? "0" + n : n);
        return (
            now.getFullYear() +
            "-" +
            pad(now.getMonth() + 1) +
            "-" +
            pad(now.getDate()) +
            " " +
            pad(now.getHours()) +
            ":" +
            pad(now.getMinutes()) +
            ":" +
            pad(now.getSeconds())
        );
    }

    save_data(name, date) {
        $.ajax({
            url: "http://localhost/projects/TODO/php/index/save_data.php",
            type: "post",
            data: `task_name=${name}&task_date=${date}`,
            success: (data) => {
                if (data.indexOf("success") !== -1) {
                    const createTime = this.getMySQLDateTime();
                    this.array.push({
                        task_id: this.array.length,
                        task_name: name,
                        task_date: date,
                        create_in: createTime,
                    });
                    this.renderHTML();
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
        if (this.checkInputs(name, date)) {
            this.save_data(name, date);
            $("#result")
                .removeClass("onSuccess")
                .removeClass("onFailed")
                .html("");
        } else {
            $("#result")
                .removeClass("onSuccess")
                .addClass("onFailed")
                .html("Please Fill the two inputs !")
                .fadeIn(1000);
        }
    }

    removeTask(id) {
        if (confirm("You want to delete this task ?")) {
            const index = this.array.findIndex((task) => task.task_id === id);
            if (index !== -1) {
                this.array.splice(index, 1);
                this.delete_data(id);
                this.renderHTML();
            }
        }
    }

    renderHTML() {
        $("#todo-list").html("")
        this.array.forEach((element, id) => {
            let taskHtml =`<div class="grid-container" id="task${id}">
                    <span class="task_create_in">${element.create_in}</span>
                    <span class="task-name">${element.task_name}</span>
                    <span class="task-date">${element.task_date}</span>
                    <button class="delete-button" id='delete-button${element.task_id}' data-id="${element.task_id}">Delete</button>
                </div>`;
            $("#todo-list").append(taskHtml);
        });
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
operations.set_button_theme();

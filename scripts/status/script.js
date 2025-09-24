class Operations {
    constructor() {
        this.switch_theme = this.switch_theme.bind(this);
        this.set_button_theme = this.set_button_theme.bind(this);
    }

    switch_theme() {
        const current_theme = $(document.documentElement).attr("data-theme");
        let theme = "";
        if (current_theme === "dark") {
            theme = "light";
            $(".switch-theme").html(
                '<img src="http://localhost/projects/TODO/images/switch-theme/switch-dark.png" class="switch-image">'
            );
        } else {
            theme = "dark";
            $(".switch-theme").html(
                '<img src="http://localhost/projects/TODO/images/switch-theme/switch-light.png" class="switch-image">'
            );
        }
        $(document.documentElement).attr("data-theme", theme);
    }

    set_button_theme() {
        $(".switch-theme").on("click", this.switch_theme);
    }
}

const operations = new Operations;
operations.set_button_theme();

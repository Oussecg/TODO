class Operations {
    constructor() {
        this.switch_theme = this.switch_theme.bind(this);
        this.set_button_theme = this.set_button_theme.bind(this);
    }

    switch_theme() {
        $(".date-input")
            .removeClass("light-calendered")
            .removeClass("dark-calendered");
        console.log(
            localStorage.getItem("current_theme"),
            localStorage.getItem("current_theme")
        );
        if (localStorage.getItem("current_theme")) {
            console.log("1");
            const current_theme = localStorage.getItem("current_theme");
            this.switching_process(current_theme);
        } else {
            console.log("2");
            const current_theme = $(document.documentElement).attr(
                "data-theme"
            );
            this.switching_process(current_theme);
        }
    }

    switching_process(current_theme) {
        let theme = "";
        if (current_theme === "dark") {
            theme = "light";
            $(".switch-theme").html(`
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="sun">
                <path id="Vector" d="M12.5 16.6667C14.8012 16.6667 16.6667 14.8012 16.6667 12.5C16.6667 10.1988 14.8012 8.33333 12.5 8.33333C10.1988 8.33333 8.33333 10.1988 8.33333 12.5C8.33333 14.8012 10.1988 16.6667 12.5 16.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M12.5 2.08333V4.16667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_3" d="M12.5 20.8333V22.9167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_4" d="M5.13542 5.13542L6.60417 6.60417" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_5" d="M18.3958 18.3958L19.8646 19.8646" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_6" d="M2.08333 12.5H4.16666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_7" d="M20.8333 12.5H22.9167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_8" d="M6.60417 18.3958L5.13542 19.8646" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_9" d="M19.8646 5.13542L18.3958 6.60417" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
                `);
            $(".date-input").addClass("dark-calendered");
        } else {
            theme = "dark";
            $(".switch-theme").html(`
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="sun">
                    <path id="Vector" d="M12.5 16.6667C14.8012 16.6667 16.6667 14.8012 16.6667 12.5C16.6667 10.1988 14.8012 8.33333 12.5 8.33333C10.1988 8.33333 8.33333 10.1988 8.33333 12.5C8.33333 14.8012 10.1988 16.6667 12.5 16.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M12.5 2.08333V4.16667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_3" d="M12.5 20.8333V22.9167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_4" d="M5.13542 5.13542L6.60417 6.60417" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_5" d="M18.3958 18.3958L19.8646 19.8646" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_6" d="M2.08333 12.5H4.16666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_7" d="M20.8333 12.5H22.9167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_8" d="M6.60417 18.3958L5.13542 19.8646" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_9" d="M19.8646 5.13542L18.3958 6.60417" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    </svg>
            `);
            $(".date-input").addClass("light-calendered");
        }
        $(document.documentElement).attr("data-theme", theme);
        localStorage.setItem("current_theme", theme);
    }

    set_button_theme() {
        $(".switch-theme").on("click", this.switch_theme);
        if (localStorage.getItem("current_theme")) {
            $(document.documentElement).attr(
                "data-theme",
                localStorage.getItem("current_theme")
            );
            if (localStorage.getItem("current_theme") == "light") {
                $(".switch-theme").html(
                    '<img src="http://localhost/projects/TODO/images/switch-theme/toggle_off.svg" class="switch-image">'
                );
                $(".date-input").addClass("dark-calendered");
            } else {
                $(".switch-theme").html(
                    '<img src="http://localhost/projects/TODO/images/switch-theme/toggle_on.svg" class="switch-image">'
                );
                $(".date-input").addClass("light-calendered");
            }
        }
    }
}

const operations = new Operations();
operations.set_button_theme();

<?php

include_once "./../classes/cnc.php";
$cn = new Cnc;
$cnc = $cn->connect();

if (isset($cnc)){
    if ($_SERVER["REQUEST_METHOD"] === "POST"){
        if (isset($_POST["task_name"]) && isset($_POST["task_date"])){
            $task_name = filter_input(INPUT_POST, "task_name", FILTER_SANITIZE_SPECIAL_CHARS);
            $task_date = filter_input(INPUT_POST, "task_date", FILTER_SANITIZE_SPECIAL_CHARS);
            $query = "INSERT INTO tasks(task_name, task_date) VALUES('$task_name', '$task_date');";
            try {
                $cnc->query($query);
                echo "success";
            } catch (\PDOException $e) {
                echo $e->getMessage();
            }
        } else{
            echo "Please fill inputs fields";
        }
    }
} else{
    echo $cnc;
}
$cn->close();

?>

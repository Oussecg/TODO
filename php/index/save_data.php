<?php

include_once "./../classes/cnc.php";
$cn = new Cnc;
$cnc = $cnc->connect();
if (isset($cnc)){
    if ($_SERVER["REQUEST_METHOD"] === "POST"){
        if (isset($_POST["task_name"]) && isset($_POST["task_date"])){
            $task_name = filter_input(INPUT_POST, "task_name", FILTER_SANITIZE_SPECIAL_CHARS);
            $task_date = filter_input(INPUT_POST, "task_date", FILTER_SANITIZE_SPECIAL_CHARS);
            $query = "INSERT INTO tasks(task_name, task_date) VALUES($task_name, $task_date);";
            try {
                $cnc->query($query);
            } catch (\PDOException $e) {
                echo $e->getMessage();
            }
            $cn->close();
        }
    }
} else{
    echo $cnc;
    $cn->close();
}

?>

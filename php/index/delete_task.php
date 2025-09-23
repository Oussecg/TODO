<?php

include_once "./../classes/cnc.php";
$cn = new Cnc;
$cnc = $cn->connect();

if (isset($cnc)){
    if ($_SERVER["REQUEST_METHOD"] === "POST"){
        if (isset($_POST["index"])){
            $index = filter_input(INPUT_POST, "index", FILTER_DEFAULT);
            $query = "DELETE FROM tasks WHERE task_id = $index";
            try {
                $cnc->query($query);
                echo "success";
            } catch (\PDOException $th) {
                echo $th->getMessage();
            }
        }
    }
}
$cn->close();

?>

<?php

include_once "./../classes/cnc.php";
$cn = new Cnc;
$cnc = $cn->connect();
if (isset($cnc)){
    if ($_SERVER["REQUEST_METHOD"] === "POST"){
        if (isset($_POST["loadData"])){
            $tasks = [];
            $query = "SELECT * FROM tasks";
            try {
                $data = $cnc->query($query);
                while ($task = $data->fetch(PDO::FETCH_ASSOC)){
                    array_push($tasks, $task);
                }
                echo json_encode($tasks);
            } catch (\PDOException $th) {
                echo "failed due to this error: " . $th->getMessage();
            }
        }
    }
} else{
    echo "failed";
}
$cn->close();

?>


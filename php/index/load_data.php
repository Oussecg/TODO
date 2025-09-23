<?php

include_once "./../classes/cnc.php";
$cn = new Cnc;
$cnc = $cn->connect();
if (isset($cnc)){
    $tasks = [];
    $query = "SELECT * FROM tasks";
    try {
        $data = $cnc->query($query);
        while ($task = $data->fetch(PDO::FETCH_ASSOC)){
            array_push($tasks, $task);
        }
        echo $tasks;
    } catch (\PDOException $th) {
        echo "failed due to this error: " . $th->getMessage();
    }
}
else{
    echo "failed";
}

?>


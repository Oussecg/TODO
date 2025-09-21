<?php

class Cnc{
    private $server = "mysql";
    private $host = "localhost";
    private $dbname = "todo";
    private $username = "root";
    private $password = "";
    private $cnc;

    public function connect(){
        $dns = $this->server . ":host=" . $this->host . ";dbname=" . $this->dbname;
        try {
            $this->cnc = new PDO($dns, $this->username, $this->password);
            return $this->cnc;
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function close(){
        $this->cnc = null;
    }
}
?>

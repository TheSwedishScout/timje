<?php
/*
* hämta rader i från db bilder med sortering av upplägningstid
* json object likt {upplägningstid, rubrik, bildtext, media{ stor, thumb }}

*/





function listImages( $page = 0){
    $conn = mysqli_connect("localhost","root","","timje_se");

    // Check connection
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }else{
        $sql = "SELECT * FROM `bilder` ORDER by `UPLOAD_TIME` LIMIT 50 OFFSET 0"; // get latest
        //var_dump($sql, $options);
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
        $data = [];
            while($row = $result->fetch_assoc()) {

                $data[] = $row;

            }
        return $data;

        } else {
            echo "0 results";
        }
        $conn->close();
    }
}

if(array_key_exists('page', $_GET)){
    $page = $_GET['page'];//test_input()
    $startpage = ($page - 1) *50;
    $data = listImages($startpage);
}else{

    $data = listImages();
}


$json = json_encode($data);
if(array_key_exists('callback', $_GET)){

    header('Content-Type: text/javascript; charset=utf8');
    header('Access-Control-Allow-Origin: http://www.timje.se/');
    header('Access-Control-Max-Age: 0');
    header('Access-Control-Allow-Methods: GET');

    $callback = $_GET['callback'];//test_input()
    echo $callback.'('.$json.');';

}else{
    // normal JSON string
    header('Content-Type: application/json; charset=utf8');

    print $json;
}

?>
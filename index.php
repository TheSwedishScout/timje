<?php
function latest(){ //hämtar senaste bilden
	$data = scandir("Webcam");
	$amount = count($data)-1;
	return $data[$amount];
}
function previus($time){ // hemtar bilden före den man tittar på.
	$data = scandir("Webcam");
	$amount = count($data)-1;
	for($x=2; $x <= $amount; $x++){
		if($time > $data[$x]){
			$out = $data[$x];
		}
	}
	if (empty($out)){ // kollar så att loppen har fått ett resultat annars är det ett stop
	$out = $time;	
	}
	return $out;
}
function nesta($time){ // hämtar bilden efter den man tittar på
	$data = scandir("Webcam");
	$amount = count($data)-1;
	for($x=2; $x <= $amount; $x++){
		if($time < $data[$x]){
			$out = $data[$x];
			break;
		} else {
			$out= $time; //stop på sista bilden så att man inte ramlar över kanten
		}	
	}
	return $out;
}
function getClosestTo($search, $arr) {
   $closest = null;
   foreach($arr as $item) {
      if($closest == null || abs($search - $closest) > abs($item - $search)) {
         $closest = $item;
      }
   }
   return $closest;
}

function getClosest($search, $timeshift) { // testa!!! godnatt
$data = scandir("Webcam");
//var_dump($data);
$time = $search;
$search = explode ("-",$search);
$search = $search[0].$search[1].$search[2].$search[3].$search[4].$search[5];
$search = strtotime($search);
$search = strtotime($timeshift,$search); 
foreach ($data as $name){
	if ($name == "." or $name == ".."){
	}else {
		$name = explode ("-",$name);
		$name = $name[0].$name[1].$name[2].$name[3].$name[4].$name[5];
		$names[] = strtotime($name);
		}
}
$clos = getClosestTo($search,$names);
$closes = date("Y-m-d-H-i-s", $clos); // gmdate
return $closes;
}

if (isset($_GET['date'])){ //kolla om man har sett ett ny start tid i $_GET['date']
	
	$bild = $_GET['date'];
}
else{
	//hämta senaste bild och skriv ut
	$latest = latest();
	$bild = $latest;
}

$exBild = explode ("-",$bild);
/* $exBild
[0]=year
[1]=month
[2]=day
[3]=houer
[4]=min
[5]=second
[6]=Timje.se
*/
//var_dump($exBild);
$tid = "$exBild[0]-$exBild[1]-$exBild[2] $exBild[3]:$exBild[4]:$exBild[5]";
$tid2 = strtotime($tid);
$titletid = date("Y-m-d", $tid2); // gmdate
$tid = date("l Y-m-d H:i", $tid2); // gmdate

$pre = previus($bild);//hemta namn på bilden innan
$next = nesta($bild);//hemta namn på nästa bild
//dag
$dayPlus = getClosest($bild,'+1 day')."-Timje.jpg";
$dayMinus = getClosest($bild,'-1 day')."-Timje.jpg";
if ($dayMinus == $bild){
	$dayMinus = $pre;
}
if ($dayPlus == $bild){
	$dayPlus = $next;
}
//week
$weekPlus = getClosest($bild,'+1 week')."-Timje.jpg";
$weekMinus = getClosest($bild,'-1 week')."-Timje.jpg";
if ($weekMinus == $bild){
	$weekMinus = $pre;
}
if ($weekPlus == $bild){
	$weekPlus = $next;
}
//månad
$monthPlus = getClosest($bild,'+1 month')."-Timje.jpg";
$monthMinus = getClosest($bild,'-1 month')."-Timje.jpg";
if ($monthMinus == $bild){
	$monthMinus = $pre;
}
if ($monthPlus == $bild){
	$monthPlus = $next;
}
//år
$yearPlus = getClosest($bild,'+1 year')."-Timje.jpg";
$yearMinus = getClosest($bild,'-1 year')."-Timje.jpg";

if (isset($_GET['date'])){
	$title = "Weather ". $titletid;
}else{
	$title = "Weather";
}



$datum = date ('Ymd',$tid2); //gmdate
$tiden = strtotime($datum.'215959');
//gmdate


?>
<script>
var tiden = "<?php echo $tiden;?>";
</script>

<?php

$options = [
	'graph' => true, 'weather' => true
];
include 'php/header.php';
//include ("php/bildnamnskoriskeringsavweather.php");
//include ("php/delete.php"); // AV REMMA
?>
	<h1>Weather</h1>
	<div class="container-float">
		<div class="left-float">
			<nav>
		        <div class="navigationButtons">
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $yearMinus; ?>"><button>Year</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $monthMinus; ?>"><button>Month</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $weekMinus; ?>"><button>Week</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $dayMinus; ?>"><button>Day</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $pre; ?>"><button>Previus</button></a>
		        </div>
		        <div id="timeShow">
		            <h2><?php echo $tid; ?>&nbsp;&nbsp;</h2><a href="<?php echo basename(__FILE__, '.php');?>"><button>Latest</button></a>
		        </div>
		        
		        <div class="navigationButtons">
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $yearPlus; ?>"><button>Year</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $monthPlus; ?>"><button>Month</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $weekPlus; ?>"><button>Week</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $dayPlus; ?>"><button>Day</button></a>
		            <a href="<?php echo basename(__FILE__, '.php'); ; ?>?date=<?php echo $next; ?>"><button>Next</button></a>
		        </div>
		    </nav>
		    
		    
		    <div id="webweather"> <!--image & weather data style="width:100%" -->
		        <img id="webcam" alt="<?php echo $tid; ?>" src="Webcam/<?php echo $bild; ?>"/>
		    </div>

		    

			<div id="grapharia">
				<div id="more-weather"></div>
			</div>
		</div>
		<div class="right-float">
			<div id="weatherdata"></div>
		</div>
	</div>
<?php
include 'php/footer.php';
?>
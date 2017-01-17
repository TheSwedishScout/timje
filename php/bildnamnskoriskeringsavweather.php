<?php
function sommartid($unixtid){
	$år = gmdate("Y",$unixtid);
	//sommar
	 $sommarStart = strtotime($år."-03-31");
	 $startDay = date("w", $sommarStart);
	 $startDate = 31 - $startDay;
	//vinter
	 $sommarEnd = strtotime($år."-10-31");
	 $endDay = date("w", $sommarEnd);
	 $endDate = 31 - $endDay;
	
	$startUnix = strtotime($år."-03-".$startDate); // unix endday
	$endUnix = strtotime($år."-10-".$endDay); // unix endday
	if($unixtid >= $startUnix && $unixtid < $endUnix){
		return "1";
	}else{
		return "0";
	}
}

function weatherrename($file){ // få namnkonvertionen för en fil i Y-m-d-H-i-s
		$file = explode("_",$file);
		if ($file[0] == "." or $file[0] == ".."){
		}else{
			$time = strtotime($file[8]);
						/*sommar tid koreskering*/
			$sommar =sommartid($time);
			if ( $sommar == 1){
				$time = strtotime('+1 hour',$time);//Lägger på en timme om det är sommartid
			}

		return gmdate("Y-m-d-H-i-s",$time);
	}
}
function renames($oldDir, $oldName, $newmame){
	$oldName = __DIR__."/../".$oldDir."/".$oldName;
	//echo "<br>";
	$newmame = __DIR__."/../Webcam/".$newmame."-Timje.jpg";
	//echo "<br>";
	//echo __DIR__;
	rename($oldName, $newmame); // ändra till /Webcam 
}
function fileserch($dir){
	$files = scandir($dir);
	
	//print_r($files);
	//output start
	foreach ($files as $file){
		
		if ($file[0] == "." or $file[0] == ".."){
		}else{
			$newname = weatherrename($file);
			//echo $file = $dir."/".$file;
			//echo "<br>";
			//echo $newname;
			//echo "<br>";
			renames($dir,$file,$newname);
			//echo "<br>";
		}
	}
}
function removeolddir($dir){
	$date = date("Ymd");
	//$date = "/".$date;
	if ($dir !== $date){
		rmdir($dir);
		//echo $dir;
		//echo $date;
	}
}
/* 
loppa igenom root efter bibliotek som finns i array med datum upp till så många saker det finns i root dagar tidigare,
om hittad gå igenom och döp om filerna, om bibliotek med datum inte finns avsluta loopen. 
*/
function start(){
	$inthis = scandir(".");
	//var_dump($inthis);
	for ($x=0; $x <= count($inthis)-1; $x++){ 
		$date = date("U"); 
		$date = strtotime("-$x day" ,$date); 
		$dir = gmdate("Ymd",$date);
		//echo $dir;
		if (in_array($dir,$inthis)){
			$dir = $dir; // sök efter datum ymd i root
			fileserch($dir);
			removeolddir($dir);
		}
	}
}

start();

?>
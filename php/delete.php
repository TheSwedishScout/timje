<?php
function delete(){
//$nu=date(" Y-m-d-H-i-s ", mktime(date("H")+2  ,date("i")  ,date("s")  ,date("m")  , date("d"), date("Y") ));
$nudag = date("d", mktime(date("H")+2  ,date("i")  ,date("s")  ,date("m")  , date("d"), date("Y") )); // $nudag = dagens nr för denna manaden, t.ex. 19;
$gammalt = date("Y-m-d", mktime(date("H")+2  ,date("i")  ,date("s")  ,date("m")  , date("d")-3, date("Y") )); // $gammalt = datumet för 14 dagar sedan, t.ex. 2011-09-05;
$borttagna=0; // $borttagna = räknare som räknar hur manga filer som raderats;

// tilldelar $dir värdet images/ 
$dir = "Webcam"; // $dir = variabel för att hjälpa till med att styra till rätt bibliotek;

// läser alla bild filer i underbibloteket "$dir" och lägger de i arrayn $foto med senaste bilden som [0]
$foto = scandir($dir);
//var_dump($foto);
$result = count($foto); // ger storleken pa arian $foto; till $result;
// echo "Number of origin files: ".$result;
// echo "</br>";
for ($i= $result-3; $i >= 0;$i-- )
	{
	$fotonamnsdel = explode("-",$foto[$i]); 
	// $fotonamnsdel[0]= Ar, $fotonamnsdel[1]= Manad, $fotonamnsdel[2]= Dag, $fotonamnsdel[3]= Timme, $fotonamnsdel[4]= Minut, $fotonamnsdel[5]= Sekund, $fotonamnsdel[6]= Timje.jpg;

	// nästa bild;
	$nastafotonamnsdel = explode("-",$foto[$i-1]);
		if ($fotonamnsdel[2] == $nudag)
			{
			}
			else
			{
			if ($nastafotonamnsdel[2]."-".$nastafotonamnsdel[3] == $fotonamnsdel[2]."-".$fotonamnsdel[3])
				{
				// echo " --- deleted = ".$foto[$i-1];
				$borttagna = $borttagna +1;
				// echo "deleted file = ".$foto[$i-1];
				unlink($dir."/".$foto[$i-1]);
				}
			}
		if ($gammalt > $fotonamnsdel[0]."-".$fotonamnsdel[1]."-".$fotonamnsdel[2])
			{
				if ($fotonamnsdel[3] == 12)
				{
				 //echo "Saved = ".$foto[$i]."</br>";
				}
				else
				{
				$borttagna = $borttagna +1;

				// echo "deleted file = ".$foto[$i];
				// echo "Deleted = ".$foto[$i]."</br>";
				unlink($dir."/".$foto[$i]);
				}
			}
	}
//echo "Files deleted: ".$borttagna;
// echo "</br>";
//$filename = "2011-08-25-00-51-00-Timje.jpg";
//echo " "."</br>";
//unlink($dir."/".$filename);
}
delete();
?>

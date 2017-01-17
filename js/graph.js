function init2(){

	//JSONPRequest("http://192.168.0.110/json-graph2.php?start_date=1459365401&end_date=1454371199&callback=graph"); //get data from dates in betwen dates
	//JSONPRequest("http://192.168.0.110/json-graph2.php?start_date=1463314489&callback=graph"); // will get 30 days before set time
	//JSONPRequest("http://192.168.0.110/json-graph2.php?callback=graph"); // gets latet 24 h
	//JSONPRequest("http://192.168.0.110/json-graph2.php?callback=graph"); // gets latet 24 h
	setup();
	

}
var firstdate, lastdate, WIDTH, HEIGHT, move, times;
var checkOutTemp, checkRain, checkWind, checkHum, checkPressure;

function JSONPRequest(url) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}

function calcTimeing(unix_timestamp){
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(unix_timestamp*1000);
	// Hours part from the timestamp
	var hours = "0"+ date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
	return formattedTime;
}
function timmen(unix_timestamp){
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(unix_timestamp*1000);
	// Hours part from the timestamp
	var hours = "0"+ date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours.substr(-2);
	return formattedTime;
}
function dagensNummer(unix_timestamp){
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(unix_timestamp*1000);
	
	var day = date.getDate();

	return day;
}
function manadsNamn(unix_timestamp){
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = new Date(unix_timestamp*1000);
    var manadsNamn = monthNames[date.getMonth()];
    return manadsNamn;
}

function daydiff(first, second) {
    return Math.round((first - second)/(60*60*24));
}

function calculate_size(){
    if(document.getElementById("webcam")){
        var webcam = document.getElementById("webcam")
        WIDTH = webcam.width;
        HEIGHT = webcam.width*0.75;
        //debugger
    }else{
        WIDTH = 640;
        HEIGHT = 480;
        //debugger
    }
}
function setup(){
    calculate_size();
    
    //window.addEventListener("resize", calculate_size);

    move = HEIGHT/2;
    times = 0;
	var graphDiv = document.getElementById("grapharia");
	//create buttons whith selection on what to show in the graph
	var selectors = document.createElement("div");
	
	checkOutTemp= document.createElement("input");
	checkOutTemp.type = "checkbox";
	checkOutTemp.checked = true;
	selectors.appendChild(checkOutTemp);
	var checkOutTemplable= document.createElement("lable");
	checkOutTemplable.innerHTML = "Out temp";
	selectors.appendChild(checkOutTemplable);
    
    checkRain = document.createElement("input");
    checkRain.type = "checkbox";
    checkRain.checked = true;
    selectors.appendChild(checkRain);
    var checkRainTemplable= document.createElement("lable");
	checkRainTemplable.innerHTML = "Rain";
	selectors.appendChild(checkRainTemplable);
	
    checkWind= document.createElement("input");
    checkWind.type = "checkbox";
    //checkWind.checked = true;
    selectors.appendChild(checkWind);
    var checkWindlable= document.createElement("lable");
	checkWindlable.innerHTML = "Wind (beta)";
	selectors.appendChild(checkWindlable);
	
    checkHum= document.createElement("input");
    checkHum.type = "checkbox";
    //checkHum.checked = true;
    selectors.appendChild(checkHum);
    var checkHumlable= document.createElement("lable");
	checkHumlable.innerHTML = "Humidity (beta)";
	selectors.appendChild(checkHumlable);
	
	checkPressure= document.createElement("input");
	checkPressure.type = "checkbox";
	checkPressure.checked = true;
	selectors.appendChild(checkPressure);
	var checkPressurelable= document.createElement("lable");
	checkPressurelable.innerHTML = "Air pressure";
	selectors.appendChild(checkPressurelable);
	
	
	
	
	
	//create canvas
	var graph = document.createElement("canvas");
	graph.id = "graph";
	graphDiv.appendChild(graph);
	graphDiv.appendChild(selectors);
	
	var inputaria ,startTime, endTime, button, lableFrom, lableTo;

	inputaria = document.createElement("div");

	lableFrom = document.createElement("lable");
	lableFrom.innerHTML = "From ";
	inputaria.appendChild(lableFrom);

	endTime = document.createElement("input");
	try {
        endTime.type = "date";
    
        if (endTime.type === "date") {
            //console.log("supported");
        } else {
            console.log("not supported");
        }
    } catch(e) {
        console.log("not supported out");
        endTime.placeholder = "yyyy-mm-dd"
    }
	endTime.min = "2015-03-25";
	inputaria.appendChild(endTime);

	lableTo = document.createElement("lable");
	lableTo.innerHTML = " to ";
	inputaria.appendChild(lableTo);
	
	startTime = document.createElement("input");
	//startTime.type = "date";
	try {
        startTime.type = "date";
    
        if (startTime.type === "date") {
            //console.log("supported");
        } else {
            console.log("not supported");
        }
    } catch(e) {
        console.log("not supported out");
        startTime.placeholder = "yyyy-mm-dd"
    }
	
	
	startTime.min = "2015-03-25";
	inputaria.appendChild(startTime);

	button = document.createElement("button");
	button.id = "btnGetWeather";
	button.innerHTML = "Get";
	button.addEventListener("click", getNewData);
	inputaria.appendChild(button);

	grapharia.appendChild(inputaria);

	function getNewData(){
	    //hemta vilka värden som vill hämtas
	    var options = "";
	    if (checkOutTemp.checked == true){
	        options = options+"&outTemp";
	    }
	    if (checkRain.checked == true){
	        options = options+"&rain";
	    }
	    if (checkWind.checked == true){
	        options = options+"&windGust";
	    }
	    if (checkHum.checked == true){
	        options = options+"&outHumidity";
	    }
	    if (checkPressure.checked == true){
	        options = options+"&barometer";
	    }
	    
	    
	    
		if (startTime.value){
			if(endTime.value){
				if(startTime.value < endTime.value){
					//debugger;
					return false;
				}else{
					//debugger;
					JSONPRequest("http://"+ip+"/json-graph2.php?start_date="+startTime.value+"&end_date="+endTime.value+options+"&callback=graph");
					// FEL gör om gör rätt datumen stämmer inte överens
				}

			}else{
			//endast start tid (låt servern beräkna slut tid)
			
			JSONPRequest("http://"+ip+"/json-graph2.php?start_date="+startTime.value+options+"&callback=graph");
			//debugger;
			}
		}else{
			JSONPRequest("http://"+ip+"/json-graph2.php?callback=graph"+options);
			//ingen tid angiven updatera senaste dyngnet
		}

		
	}
	if(weatherDate){
	    JSONPRequest("http://"+ip+"/json-graph2.php?start_date="+weatherDate+"&callback=graph");
	    //debugger
	}else{
	    JSONPRequest("http://"+ip+"/json-graph2.php?callback=graph");
	    //debugger
	}
}

function graph(data){
	//om resize på fönstret
	//ställer om alla värden till nummer istellet för en sträng med nummer
	function recalcValues(data){
	for(var i = 0; i < data.length-1; i++){
	    data[i].barometer = Number(data[i].barometer)
	    data[i].dateTime = Number(data[i].dateTime)
	    data[i].outHumidity = Number(data[i].outHumidity)
	    data[i].outTemp = Number(data[i].outTemp)
	    data[i].rain = Number(data[i].rain)
	    data[i].windDir = Number(data[i].windDir)
	    data[i].windGust = Number(data[i].windGust)
	    data[i].windSpeed = Number(data[i].windSpeed)
	}
	return data;
	}
	data = recalcValues(data)
	
	
	var canvas = document.getElementById("graph");
	canvas.width = WIDTH;
	canvas.height = HEIGHT+20;//lägger till 20 px för få tiden utanför graferna
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	if (times == 0){
		lastdate = data[0].dateTime;
		var points = data.length;
		firstdate = data[points-1].dateTime;
	//debugger;
	}
    
	var first = data[0].dateTime;
	var last = data[data.length-1].dateTime;
	var calcValue = (WIDTH/(first-last));

	function draw_outTemp(){
		//Start draw line
		var highestTemp = {};
		highestTemp.temp = -2000;
		var lowestTemp = {}
		lowestTemp.temp = 1000;
		ctx.beginPath();
		ctx.strokeStyle="#FF0000";
		ctx.fillStyle = '#FF0000';
		ctx.font = "14px Tahoma";
		ctx.textAlign = "right";
		for(var i = data.length-1; i > 1; i--){
			data[i].outTemp = Number(data[i].outTemp);
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			data[i].outTemp = Number(data[i].outTemp);
			if(data[i].outTemp > highestTemp.temp){
				highestTemp.temp = data[i].outTemp;
				highestTemp.x = x;
				highestTemp.time = data[i].dateTime;
				highestTemp.realtime = calcTimeing(highestTemp.time);

				
			}
			if(data[i].outTemp < lowestTemp.temp){
				lowestTemp.temp = data[i].outTemp;
				lowestTemp.x = x;
				lowestTemp.time = data[i].dateTime;
				lowestTemp.realtime = calcTimeing(lowestTemp.time);
				
			}
		}
		highestTemp.avrundat = Math.ceil(highestTemp.temp);
		lowestTemp.avrundat = Math.floor(lowestTemp.temp);
		/*
		if(lowestTemp.avrundat < 0){
			lowestTemp.avrundat = Math.floor(lowestTemp.avrundat*1.1);
		}else{
			lowestTemp.avrundat = Math.ceil(lowestTemp.avrundat*0.9);
		}
		if(highestTemp.avrundat > 0){
			highestTemp.avrundat = Math.floor(highestTemp.avrundat*1.1);
		}else{
			highestTemp.avrundat = Math.ceil(highestTemp.avrundat*0.9);
		}*/
		var deltaTemp = highestTemp.avrundat - lowestTemp.avrundat;
		var skalfaktor = HEIGHT/deltaTemp;
		ctx.moveTo(0, HEIGHT - data[data.length-1].outTemp*skalfaktor + lowestTemp.avrundat*skalfaktor);
		
		
		for(var i = data.length-1; i > 1; i--){
			data[i].outTemp = Number(data[i].outTemp);
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			var y = HEIGHT - data[i].outTemp*skalfaktor + lowestTemp.avrundat*skalfaktor;
			ctx.lineTo(x, y);
		}
		ctx.stroke();
		//Line compleated
		//display highest temp
		//Ritar 0 sträcket
		
		/*
		##Tar reda på med vilket temperatur skilnad ett nytt sträck kommer
		##skilnad på under 10 grader sträck vid var grad
		##skilnad på mellan 10 och 20 grader sträck vid var annan grad
		##skilnad på mer än 20 grader sträck vid var 5 grad
		*/
		draw_Line(HEIGHT + lowestTemp.avrundat * skalfaktor);
		var delning = 5;
		if (deltaTemp <= 20 && deltaTemp > 10){
			//delning med 2 grader c
			delning = 2;
		}else if(deltaTemp <= 10){
			//delnig med 1 grad
			delning = 1;
		}else{
			//delning 5 grader
			delning = 5;
		}
		
		//skapar sträck ovanför 0 med delning som bestäms ovanför, om högsta temp är över 0 
		lineTemp = 0;
		if (highestTemp.avrundat > 0) {
			while(lineTemp < highestTemp.avrundat){
				draw_dottedLine(HEIGHT-(lineTemp- lowestTemp.avrundat) *skalfaktor);
				ctx.fillText(lineTemp + "\xBAC",WIDTH,HEIGHT-(lineTemp- lowestTemp.avrundat) *skalfaktor);	
				
				
				lineTemp = lineTemp+ delning

			}
		}
		//skapar sträck under 0 med delning som bestäms ovanför, om lägsta temp är under 0
		lineTemp = 0;
		if(lowestTemp.avrundat < 0 ){
			while(lineTemp > lowestTemp.avrundat){
				draw_dottedLine(HEIGHT-(lineTemp- lowestTemp.avrundat) *skalfaktor);
				ctx.fillText(lineTemp + "\xBAC",WIDTH,HEIGHT-(lineTemp- lowestTemp.avrundat) *skalfaktor);
				
				
				lineTemp = lineTemp - delning

			}
		}

		
		ctx.font = "14px Tahoma";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000";
		//ctx.fillText(parseFloat(highestTemp.temp.toFixed(2))  +"\xBAC",highestTemp.x,(HEIGHT - highestTemp.temp*skalfaktor  + lowestTemp.avrundat*skalfaktor)-16);
		//ctx.fillText(highestTemp.realtime,highestTemp.x,(HEIGHT - highestTemp.temp*skalfaktor  + lowestTemp.avrundat*skalfaktor) );'
		   var offset 
		if (highestTemp.x < 30){
		    offset = 30;
		}else{
		    offset = -30;
		}
	    ctx.fillText(parseFloat(highestTemp.temp.toFixed(2))   +"\xBAC "/* + highestTemp.realtime*/,highestTemp.x+offset,(HEIGHT - highestTemp.temp*skalfaktor  + lowestTemp.avrundat*skalfaktor)+7);
		

		//ctx.fillText(parseFloat(lowestTemp.temp.toFixed(2)) +"\xBAC",lowestTemp.x,HEIGHT - lowestTemp.temp*skalfaktor + lowestTemp.avrundat*skalfaktor);
		//ctx.fillText(lowestTemp.realtime,lowestTemp.x,(HEIGHT - lowestTemp.temp*skalfaktor + lowestTemp.avrundat*skalfaktor) + 16);
		var offset2
		if(lowestTemp.x < 30){
		  lowestTemp.x = lowestTemp.x+30;
		    //debugger
		}else{
		    lowestTemp.x = lowestTemp.x-30
		    offset2 = -30;
		    
		}
		ctx.fillText(parseFloat(lowestTemp.temp.toFixed(2)) +"\xBAC "/* + lowestTemp.realtime*/,lowestTemp.x,(HEIGHT - lowestTemp.temp*skalfaktor + lowestTemp.avrundat*skalfaktor)-2);
		
		var me = highestTemp.x
		    WIDTH
	    
		

	}
	function draw_rain(){
		//Start draw line
		var dayRain = 0;
		ctx.beginPath();
		ctx.strokeStyle="#0000FF";
		ctx.fillStyle = 'blue';
		ctx.moveTo(0, HEIGHT - data[data.length-1].rain*1000);

		for(var i = data.length-1; i > 1; i--){
			//debugger
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			//check if over day cykel
			if(i < data.length-1){
				var tid= calcTimeing(data[i].dateTime);
				var tidForra= calcTimeing(data[i-1].dateTime);
				if (tid > tidForra   ){
					ctx.font = "14px Tahoma";
            		ctx.textAlign = "right";
            		ctx.fillText(parseFloat( dayRain.toFixed(2))+ "mm",x,HEIGHT -dayRain*10 - 5);
					dayRain = 0
				}
			}
			dayRain += Number((data[i].rain*10).toFixed(2));
			var y = (HEIGHT-dayRain*10);
			ctx.lineTo(x, y);
			//debugger;
			}
		ctx.stroke();
		//Line compleated
		ctx.font = "14px Tahoma";
		ctx.textAlign = "right";
		ctx.fillText(parseFloat( dayRain.toFixed(2))+ "mm",WIDTH-35,HEIGHT -dayRain*10 - 5);
		//ctx.fillText(Math.round(dayRain),100,100);
		//debugger
	}
	function draw_windSpeed(){
		//Start draw line
		ctx.beginPath();
		ctx.strokeStyle="#777";
		ctx.moveTo(data[0].dateTime, HEIGHT - data[0].windGust * HEIGHT/100);
		for(var i = 1; i < data.length; i++){
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			var y = HEIGHT - data[i].windGust * HEIGHT/100;
			ctx.lineTo(x, y);
			}
		ctx.stroke();
		//Line compleated

	}
	function draw_windDir(){
		//Start draw line
		ctx.beginPath();
		ctx.strokeStyle="#CDC5B4";
		ctx.moveTo(data[0].dateTime, HEIGHT - data[0].windDir - move + 200);
		for(var i = 1; i < data.length; i++){
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			var y = HEIGHT - data[i].windDir - move + 200;
			ctx.lineTo(x, y);
			}
		ctx.stroke();
		//Line compleated
		ctx.font = "25px Tahoma";
		ctx.textAlign = "right";
		ctx.fillText("N",WIDTH,HEIGHT-360 - move + 200);
		ctx.fillText("N",WIDTH,HEIGHT-0 - move + 200);
		ctx.fillText("S",WIDTH,HEIGHT-180 - move + 200);
		ctx.fillText("E",WIDTH,HEIGHT-90 - move + 200);
		ctx.fillText("W",WIDTH,HEIGHT-270 - move + 200);
	}
	function draw_humidity(){
		//Start draw line
		ctx.beginPath();
		ctx.strokeStyle="#ADD3FF";
		ctx.moveTo(data[0].dateTime, HEIGHT - data[0].outHumidity * (HEIGHT/100) );
		for(var i = 1; i < data.length; i++){
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			var y = HEIGHT - data[i].outHumidity  * (HEIGHT/100) ;
			ctx.lineTo(x, y);
			}
		ctx.stroke();
		//Line compleated
	}
	function draw_pressure(){
	    
		//Start draw line
		ctx.beginPath();
		ctx.strokeStyle="#00A1A1";
		ctx.moveTo(data[0].dateTime, HEIGHT - data[0].barometer/2);
		
		var lovestValue = 3333333;// set an imposebale number 
		for(var i = 0; i < data.length-1; i++){
		    if (data[i].barometer < lovestValue){
		        lovestValue = data[i].barometer;
		    }
		    
		}
		

		// standard gög och låg tryck
		var barMax = 1050;
		var barMin = 950;
        
		for(var i = 0; i < data.length-1; i++){
		    var varde = (data[i].barometer-barMin)/(barMax-barMin)*HEIGHT
			var time = data[i].dateTime;
			var x = ((time-last)*calcValue);
			var y = HEIGHT - varde;
			ctx.lineTo(x, y);
			if(i == data.length-2){
		        //Skriv tids slag
		        //färg på texten #004040
		        
                LäsTid = Math.round(data[i].barometer)+" hPa";
                ctx.textAlign = "left";
                ctx.font = "14px Arial";
                ctx.fillStyle = '#00A1A1';
                ctx.fillText(LäsTid,x,y-4);
			}
			
		}
		
		
		ctx.stroke();
		//Line compleated
		
	}
	function draw_dottedLine(height){
		ctx.setLineDash([1,6]);
		ctx.beginPath();
		ctx.moveTo(0,height);
		ctx.lineTo(WIDTH, height);
		ctx.stroke();
	}
	function draw_Line(height){
		ctx.beginPath();
		ctx.moveTo(0,height);
		ctx.lineTo(WIDTH, height);
		ctx.stroke();
	}
	
	
	/*--------------------draw time lines--------------------------*/
	function draw_time_lines(){
	    var day1 = data[0].dateTime;// senaste tiden (närmast nu)
	    var day2 = data[data.length-1].dateTime;// tidigast tiden (älst tid)
	    var skilnad = daydiff(day1, day2);
	    if(skilnad <= 2){
	        //Rita sträck för timmar
	        var timeAdd = 86400*(skilnad);
        		day1 = Number(day1);
        		var date = new Date((day1-timeAdd)*1000); // date = tiden som är 00:00 dagen på dagen som är mest i då tid
        		
        		var tiden = roundToDays(date)/1000;
        		var LäsTid = calcTimeing(tiden);
        		var höjd = 0;
        		
        		while (tiden < day1) {
                    
                    var x = ((tiden-last)*calcValue);
                    ctx.setLineDash([1,6]);
            		ctx.beginPath();
            		ctx.moveTo(x,0);
            		ctx.lineTo(x, HEIGHT+10);
            		ctx.stroke();
                    
                    //Skriv tids slag
                    LäsTid = timmen(tiden);
                    ctx.textAlign = "center";
                    ctx.font = "14px Arial";
                    ctx.fillText(LäsTid,x,HEIGHT+18);
                    
                    
                    
                    tiden+=3600;
                }
                ctx.setLineDash([])
	    }
	    if(skilnad <= 7 && skilnad >= 2){
	        //Rita sträck för timmar
	        var timeAdd = 86400*(skilnad);
        		day1 = Number(day1);
        		var date = new Date((day1-timeAdd)*1000); // date = tiden som är 00:00 dagen på dagen som är mest i då tid
        		
        		tiden = roundToDays(date)/1000;
        		var LäsTid = calcTimeing(tiden);
        		
        		while (tiden < day1) {
                    //console.log(tiden);
                    var x = ((tiden-last)*calcValue);
                    ctx.setLineDash([1,6]);
            		ctx.beginPath();
            		ctx.moveTo(x,0);
            		ctx.lineTo(x, HEIGHT);
            		ctx.stroke();
                    
                    //Skriv tids slag
                    LäsTid = timmen(tiden);
                    ctx.textAlign = "center";
                    ctx.font = "14px Arial";
                    ctx.fillText(LäsTid,x,HEIGHT+18);
                    
                    
                    
                    tiden+=21600;
                }
                ctx.setLineDash([])
	    }

	    if (skilnad <= 31){
    	    for (i = 0; i < skilnad; i++){ 
        		//make line for days
        		var timeAdd = 86400*i;
        		day1 = Number(day1);
        		var date = new Date((day1-timeAdd)*1000); // 4:55
        		var time = roundToDays(date)/1000;
        		var LäsTid = calcTimeing(time);
        		
        		var x = ((time-last)*calcValue);
        		
        		ctx.beginPath();
        		ctx.moveTo(x,0);
        		ctx.lineTo(x, HEIGHT);
        		ctx.stroke();
        		
        		//Skriv tids slag
        		if(skilnad > 7){
        		    var skrivHöjdDag = HEIGHT+18;
        		    var skrivHöjdMåndad = 18;
        		}else{
        		    var skrivHöjdDag = 18;
        		    var skrivHöjdMåndad = 32;
        		}
        		
                LäsTid = dagensNummer(time);
                ctx.textAlign = "left";
                ctx.font = "14px Arial";
                if(LäsTid == 1){
                    
                    månadsdag = manadsNamn(time);
                    ctx.fillText(månadsdag,x+2,skrivHöjdMåndad);
                }
                ctx.fillText(LäsTid,x+2,skrivHöjdDag);
                
                
                
                
                
    	    }
	    }
	    if (skilnad > 31){
    	    for (i = 0; i < skilnad; i++){ 
        		//make line for days
        		var timeAdd = 86400*i;
        		day1 = Number(day1);
        		var date = new Date((day1-timeAdd)*1000); // 4:55
        		var time = roundToDays(date)/1000;
        		var LäsTid = dagensNummer(time);
        		
        		if(LäsTid == 1){
        		    
            		var x = ((time-last)*calcValue);
            		
            		ctx.beginPath();
            		ctx.moveTo(x,0);
            		ctx.lineTo(x, HEIGHT);
            		ctx.stroke();
            		
            		//Skriv tids slag
            		if(skilnad > 7){
            		    var skrivHöjdDag = HEIGHT+18;
            		    var skrivHöjdMåndad = 18;
            		}else{
            		    var skrivHöjdDag = 18;
            		    var skrivHöjdMåndad = 32;
            		}
            		
                    LäsTid = dagensNummer(time);
                    ctx.textAlign = "left";
                    ctx.font = "14px Arial";
                
                    
                    månadsdag = manadsNamn(time);
                    ctx.fillText(månadsdag,x+2,skrivHöjdMåndad);
                    //ctx.fillText(LäsTid,x+2,skrivHöjdDag);
                }

    	    }
	    }
	    
		
			
    				
    			
    		
        function roundToDays(date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            return date;
        }
	}
	
	/*----------------end time lines------------------------------------------*/
	
	function roundMinutes(date) {
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }
	
	//ctx.fillRect();
	//draw_windDir();
	
	//draw_dayLine2()
	//draw_dayLine()
	//draw_houerLine();
	draw_time_lines();
	if(checkPressure.checked){
	    draw_pressure();
	}
	if(checkHum.checked){
	    draw_humidity()
	    
	};
	if(checkWind.checked){
	    draw_windSpeed();
	}
	if(checkRain.checked == true){
	    draw_rain();
	}
	if(checkOutTemp.checked == true){
	    draw_outTemp();
	}
	/*
	ctx.beginPath();
	ctx.strokeStyle="#AAA";
	ctx.moveTo(0, HEIGHT- move);
	ctx.lineTo(WIDTH, HEIGHT-move);
	ctx.lineWidth=1;
	ctx.stroke();
	

	/*
	var line = [(HEIGHT/2+HEIGHT/10), (HEIGHT/2-HEIGHT/10)];
	for (var i = 0; i < line.length; i++) {
		draw_dottedLine(line[i]);
	}
	firstdate, lastdate;
	*/
	/*mouse position*/

	/*
	||---------------------------------------MORE WEATHER INFO
	*/
	
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('graph');
      var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        	//var calcValue = (WIDTH/(first-last));
        	//var x = ((time-last)*calcValue);
        var output = document.getElementById('more-weather');
        output.style.top = mousePos.y-50 + 'px';
        output.style.left = mousePos.x+20 +'px';
        var timeOfMouse = Math.floor(map_range(mousePos.x, WIDTH, 0, first, last));
        var resultObject = search(timeOfMouse, data);
        resultObject.time = calcTimeing(resultObject.dateTime);

        output.innerHTML ="";
        var outul = document.createElement("ul");
        var outTime = document.createElement("li");
        outTime. innerText = 'Time: ' + resultObject.time;
        outul.appendChild(outTime);
        if(!isNaN(resultObject.outTemp)){
	        var outTemp = document.createElement("li");
	        outTemp. innerText = 'Temp: ' + resultObject.outTemp.toFixed(1) + "°C";
	        outul.appendChild(outTemp);
    	}
    	if(!isNaN(resultObject.windGust)){
        var outwindSpeed = document.createElement("li");
        outwindSpeed. innerText = 'Wind speed: ' + (resultObject.windGust/3.6).toFixed(1) + "m/s";
        outul.appendChild(outwindSpeed);
    	}
        if(!isNaN(resultObject.dayRain)){
        var outrain = document.createElement("li");
        outrain. innerText = 'Rain: ' + (resultObject.dayRain*10).toFixed(2) + "mm";
        outul.appendChild(outrain);
    	}
        if(!isNaN(resultObject.barometer)){
        	var outbarometer = document.createElement("li");
        	outbarometer. innerText = 'Air pressure: ' + Math.round(resultObject.barometer) + "mbar";
        	outul.appendChild(outbarometer);
        }
    	if(!isNaN(resultObject.outHumidity)){
	        var outHumidity = document.createElement("li");
	        outHumidity. innerText = 'Humidity: ' + resultObject.outHumidity + "%Rh";
	        outul.appendChild(outHumidity);
	    }
	    if(!isNaN(resultObject.windDir)){
	        var outwindDir = document.createElement("li");
	        outwindDir. innerText = 'Wind dir: ' + resultObject.windDir + "°";
	        outul.appendChild(outwindDir);
        }
        output.appendChild(outul);

        //console.log(timeOfMouse);
      }, false);
      

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].dateTime <= nameKey) {
            return myArray[i];
        }
    }
}

//document.addEventListener("DOMContentLoaded", init2);
//"1463317681"
//"1463231641"
//1459807261
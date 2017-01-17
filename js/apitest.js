var weatherDate;
 document.addEventListener("DOMContentLoaded", init);
 function init(){
 	getData();
 }
function getData(){
	JSONPRequest("http://"+ip+"/json.php?date="+tiden+"&callback=printWeather")
}

function printWeather(data){
	var weather = document.getElementById("weatherdata");
	var timeElement = document.createElement("p");
	timeElement.innerHTML = "Weather data collected at " + data.time;
	weather.appendChild(timeElement);
	weatherDate = data.time;
	
	var outdoorElement = document.createElement("p");
	outdoorElement.innerHTML = "Outdoor: " + data.Outdoor;
	weather.appendChild(outdoorElement);

	var dayHighElement = document.createElement("p");
	dayHighElement.innerHTML = "Day high: " + data.dayHigh + " at " + data.dayHighTime;
	weather.appendChild(dayHighElement);
	dayHighElement.classList.add('indent');

	var dayLowElement = document.createElement("p");
	dayLowElement.innerHTML = "Day low: " + data.dayLow + " at " + data.dayLowTime;
	weather.appendChild(dayLowElement);
	dayLowElement.classList.add('indent');


	var windElement = document.createElement("p");
	windElement.innerHTML = "Wind: " + data.wind + " ("+data.windSpeed + ") from " + data.windDir;
	weather.appendChild(windElement);

	var windDayHighElement = document.createElement("p");
	windDayHighElement.innerHTML = "Day high: " + data.windDayHigh + " at " + data.windDayHighTime;
	weather.appendChild(windDayHighElement);
	windDayHighElement.classList.add('indent');

	var windDayLowElement = document.createElement("p");
	windDayLowElement.innerHTML = "Day low: " + data.windDayLow + " at " + data.windDayLowTime;
	weather.appendChild(windDayLowElement);
	windDayLowElement.classList.add('indent');
	

	var rainElement = document.createElement("p");
	rainElement.innerHTML = "Rain: " + data.rain;
	weather.appendChild(rainElement);

	
		var humidityElement = document.createElement("p");
	humidityElement.innerHTML = "Humidity: " + data.humidity;
	weather.appendChild(humidityElement);
	
	    var airPressureElement = document.createElement("p");
	airPressureElement.innerHTML = "Air pressure: " + data.airPressure;
	weather.appendChild(airPressureElement);
	
	/*
		var windChillElement = document.createElement("p");
	windChillElement.innerHTML = "Wind chill: " + data.windChill;
	weather.appendChild(windChillElement);

	var heatIndexElement = document.createElement("p");
	heatIndexElement.innerHTML = "Heat index: " + data.heatIndex;
	weather.appendChild(heatIndexElement);
    */

	var indoorElement = document.createElement("p");
	indoorElement.innerHTML = "Indoor: " + data.indoor;
	weather.appendChild(indoorElement);

	var sunriseTimeElement = document.createElement("p");
	sunriseTimeElement.innerHTML = "Sunrise time: " + data.sunriseTime;
	weather.appendChild(sunriseTimeElement);

	var sunsetTimeElement = document.createElement("p");
	sunsetTimeElement.innerHTML = "Sunset time: " + data.sunsetTime;
	weather.appendChild(sunsetTimeElement);
    
    //starttimer(data.time);
    //startar graph sciptet
    init2();
}
/*
function starttimer(starttTime){
    
}*/
/*
    'time': '$time',
    'Outdoor': '$outdoor',
    'dayHigh': '$dayHigh',
    'dayHighTime': '$dayHighTime',
    'dayLow': '$dayLow',
    'dayLowTime': '$dayLowTime',

    'windChill': '$windChill',
    'heatIndex': '$heatIndex',

    'dewpoint': '$heatIndex',
    'humidity': '$humidity',

    'airPressure': '$airPressure',

    'wind': '$wind',
    'windSpeed': '$windSpeed',
    'windDir': '$windDir',
    'windDayHigh': '$windDayHigh',
    'windDayHighTime': '$windDayHighTime',
    'windDayLow': '$windDayLowTime',
    'windDayLowTime': '$windDayLowTime',

    'indoor': '$indoor',

    'sunriseTime': '$sunriseTime',
    'sunsetTime': '$sunsetTime'
   */
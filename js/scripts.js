var URL = "http://api.wunderground.com/api/f6707df2a16e713d/geolookup/conditions/forecast/q/autoip.json"

function callAPI() {
	$.getJSON(URL, setUnits);
}

function setUnits(data) {
	currentConditions = data.current_observation;
	forecast = data.forecast.simpleforecast.forecastday;
	currentLocation = currentConditions.display_location.full;
	if ($("#unit_f").hasClass("selected")) {
		temp = currentConditions.temp_f;
		feelsLike = currentConditions.feelslike_f;
		precip = currentConditions.precip_today_in;
		loTemp = forecast[0].low.fahrenheit;
		hiTemp = forecast[0].high.fahrenheit;
		unit = "F&deg;";
		measure = "in";
	} else {
		temp = currentConditions.temp_c;
		feelsLike = currentConditions.feelslike_c;
		precip = currentConditions.precip_today_metric;
		loTemp = forecast[0].low.celsius;
		hiTemp = forecast[0].high.celsius;
		unit = "C&deg;";
		measure = "mm";
	}
	currentWeather();
}

function currentWeather(){
	var weather = currentConditions.weather;
	var weatherGif = "<img id='currentimage' src=" + currentConditions.icon_url + "></img>";
	var weatherHTML = "<p id='condition'>Current Conditions for<br>" + currentLocation + "</p>";
	weatherHTML += weatherGif + "</br>";
	weatherHTML += "<p id='weathertype'>" + weather + "</p>";

	var forecastHTML = "<p id='currenttemp'>" + temp + unit + "</p>";
	forecastHTML += "<p>Feels like: " + feelsLike + unit;
	forecastHTML += "<p><span class='lo'>Lo: " + loTemp + unit + "</span>";
	forecastHTML += "<span class='hi'>Hi: " + hiTemp + unit + "</span></p>";
	forecastHTML += "<p>Precip Today: " + precip + measure + "</p>";

	$("#city").html(currentLocation);
	$("#weatherimage").html(weatherHTML);
	$("#temps").html(forecastHTML);

	//create loop to add this to all 3 forecast days
	for (i=0; i<=2; i++) {
		if ($("#unit_f").hasClass("selected")) {
			forecastLow = forecast[i+1].low.fahrenheit;
			forecastHigh = forecast[i+1].high.fahrenheit;
			forecastPrecip = forecast[i+1].qpf_allday.in;
		} else {
			forecastLow = forecast[i+1].low.celsius;
			forecastHigh = forecast[i+1].high.celsius;
			forecastPrecip = forecast[i+1].qpf_allday.mm;
		}
		
		var forecastDayHTML = "<p>" + forecast[i+1].date.weekday + "</p>";
		forecastDayHTML += "<p>" + forecast[i+1].conditions + "</p>";
		forecastDayHTML += "<p><img class='weatherimage' src=" + forecast[i+1].icon_url + "></img>";
		forecastDayHTML += "<p><span class='lo'>Lo: " + forecastLow + unit + "</span>";
		forecastDayHTML += "<span class='hi'>Hi: " + forecastHigh + unit + "</span></p>";
		forecastDayHTML += "<p>Precip: " + forecastPrecip + measure + "</p>"

		$($(".forecast")[i]).html(forecastDayHTML);
	}
	setBackground();
}

function setBackground() {
	var source = $("#currentimage").attr('src');
	if (source.indexOf("rain") != -1 || source.indexOf("sleet") != -1) {
		$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/rain.jpg')");
	}	
	else if (source.indexOf("cloudy") != -1) {
		$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/clouds.jpg')");
	}	
	else if (source.indexOf("sunny") != -1 || source.indexOf("clear") != -1) {
		if (source.indexOf("nt") != -1) {
			$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/moon.jpg')");
		}
		else {
			$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/sunny.jpg')");
		}
	}	
	else if (source.indexOf("snow") != -1 || source.indexOf("flurries") != -1) {
		$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/snow.jpg')");
	}	
	else if (source.indexOf("fog") != -1 || source.indexOf("hazy") != -1) {
		$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/fog.jpg')");
	}
	else {
		$("body").css("background-image","url('https://dl.dropboxusercontent.com/u/755079/images/weather/storms.jpg')");
	}
}

callAPI();

$("button").on("click" , function() {
	$("button").removeClass("selected");
	$(this).addClass("selected");
	callAPI();
})


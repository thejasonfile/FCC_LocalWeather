var URL = "http://api.wunderground.com/api/f6707df2a16e713d/geolookup/conditions/forecast/q/NY/New_York.json"
function currentWeather(data) {
	var currentConditions = data.current_observation;
	var forecast = data.forecast.simpleforecast.forecastday;
	var location = currentConditions.display_location.full;
	var weather = currentConditions.weather;
	var weatherGif = "<img class='weatherimage' src=" + currentConditions.icon_url + "></img>";
	var temp = currentConditions.temp_f;
	var feelsLike = currentConditions.feelslike_f;
	var precip = currentConditions.precip_today_in;

	var weatherHTML = "<p>Current Conditions for<br>" + location + "</p>";
	weatherHTML += weatherGif + "</br>";
	weatherHTML += "<p>" + weather + "</p>";

	var forecastHTML = "<p>" + temp + "</p>";
	forecastHTML += "<p>Feels like: " + feelsLike;
	forecastHTML += "<p>Lo: " + forecast[0].low.fahrenheit;
	forecastHTML += "Hi: " + forecast[0].high.fahrenheit + "</p>";
	forecastHTML += "<p>Precip Today: " + precip + "</p>";

	$("#weatherimage").html(weatherHTML);
	$("#temps").html(forecastHTML);

	//create loop to add this to all 3 forecast days
	for (var i=0; i<=3; i++) {
		var forecastDayHTML = "<p>" + forecast[i+1].date.weekday + "</p>";
		forecastDayHTML += "<p>" + forecast[i+1].conditions + "</p>";
		forecastDayHTML += "<p><img class='weatherimage' src=" + forecast[i+1].icon_url + "></img>";
		forecastDayHTML += "<p>Lo: " + forecast[i+1].low.fahrenheit;
		forecastDayHTML += "<p>Hi: " + forecast[i+1].high.fahrenheit + "</p>";
		forecastDayHTML += "<p>Precip: " + forecast[i+1].qpf_allday.in + "</p>"

		$($(".forecast")[i]).html(forecastDayHTML);
	}
}

$.getJSON(URL, currentWeather);

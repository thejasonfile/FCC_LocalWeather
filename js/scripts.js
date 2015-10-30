var URL = "http://api.wunderground.com/api/f6707df2a16e713d/geolookup/conditions/forecast/q/NY/New_York.json"
function currentWeather(data) {
	var currentConditions = data.current_observation;
	var forecast = data.forecast.simpleforecast.forecastday;
	var location = currentConditions.display_location.full;
	var weather = currentConditions.weather;
	var weatherGif = "<img class='weatherimage' src='http://icons.wxug.com/i/c/k/clear.gif'></img>";
	var temp = currentConditions.temp_f;
	var feelsLike = currentConditions.feelslike_f;
	var precip = currentConditions.precip_today_in;

	var weatherHTML = "<p>Current Conditions for<br>" + location + "</p>";
	weatherHTML += weatherGif + "</br>";
	weatherHTML += "<p>" + weather + "</p>";

	var forecastHTML = "<p>" + temp + "</p>";
	forecastHTML += "<p>Feels like: " + feelsLike;
	forecastHTML += "<p>Hi: " + forecast[0].high.fahrenheit;
	forecastHTML += "Lo: " + forecast[0].low.fahrenheit + "</p>";
	forecastHTML += "<p>Precip Today: " + precip + "</p>";

	$("#weatherimage").html(weatherHTML);
	$("#temps").html(forecastHTML);
}

$.getJSON(URL, currentWeather);

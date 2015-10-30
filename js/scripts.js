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
	forecastHTML += "<p>Lo: " + forecast[0].low.fahrenheit;
	forecastHTML += "Hi: " + forecast[0].high.fahrenheit + "</p>";
	forecastHTML += "<p>Precip Today: " + precip + "</p>";

	//create loop to add this to all 3 forecast days
	var forecastDay1HTML = "<p>" + forecast[1].date.weekday + "</p>";
	forecastDay1HTML += "<p>" + forecast[1].conditions + "</p>";
	forecastDay1HTML += "<p><img class='weatherimage' src='http://icons.wxug.com/i/c/k/partlycloudy.gif'></img>";
	forecastDay1HTML += "<p>Lo: " + forecast[1].low.fahrenheit;
	forecastDay1HTML += "<p>Hi: " + forecast[1].high.fahrenheit + "</p>";
	forecastDay1HTML += "<p>Precip: " + forecast[1].qpf_allday.in + "</p>"

	$("#weatherimage").html(weatherHTML);
	$("#temps").html(forecastHTML);
	$("#day1").html(forecastDay1HTML);
}

$.getJSON(URL, currentWeather);

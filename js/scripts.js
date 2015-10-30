var URL1 = "http://api.wunderground.com/api/f6707df2a16e713d/conditions/q/NY/New_York.json"
function currentWeather(data) {
	var weatherHTML = "<p>Conditions for " + data.current_observation.display_location.city + " </p>";
	weatherHTML += "<p>" + data.current_observation.temperature_string + "</p>";
	weatherHTML += "<p>Feels like " + data.current_observation.feelslike_string + "</p>"
	weatherHTML += "<img src=" + data.current_observation.icon_url + ">";
	$("#weatherimage").html(weatherHTML);
}

var URL2 = "http://api.wunderground.com/api/f6707df2a16e713d/forecast/q/NY/New_York.json"
function forecastWeather(data) {
	var forecastHTML = 
}

$.getJSON(URL1, currentWeather);
$.getJSON(URL2, displayWeather);
var URL = "http://api.wunderground.com/api/f6707df2a16e713d/geolookup/conditions/forecast/q/autoip.json"
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

	$("#city").html(location);
	$("#weatherimage").html(weatherHTML);
	$("#temps").html(forecastHTML);

	//create loop to add this to all 3 forecast days
	for (var i=0; i<=3; i++) {
		var forecastDayHTML = "<p>" + forecast[i+1].date.weekday + "</p>";
		forecastDayHTML += "<p>" + forecast[i+1].conditions + "</p>";
		forecastDayHTML += "<p><img class='weatherimage' src=" + forecast[i+1].icon_url + "></img>";
		forecastDayHTML += "<p>Lo: " + forecast[i+1].low.fahrenheit;
		forecastDayHTML += "Hi: " + forecast[i+1].high.fahrenheit + "</p>";
		forecastDayHTML += "<p>Precip: " + forecast[i+1].qpf_allday.in + "</p>"

		$($(".forecast")[i]).html(forecastDayHTML);
	}
}

$.getJSON(URL, currentWeather);

function changeCity(evt) {
	evt.preventDefault();
	$("#city").html("<input type='text' id='newcity' placeholder='Enter City'></input><input type='text' id='newstate' placeholder='Enter State'></input>");
	$("#changecitybtn").text("Look Up New City").attr({"id": "newcitybtn", "type": "submit"});
	$("#newcitybtn").on("focus mouseenter", function() {
		newCityInput = $("#newcity").val();
		newStateInput = $("#newstate").val();
	})
	$("#newcitybtn").on("click", newCity);
}

function newCity(evt) {
	evt.preventDefault();
	URL = "http://api.wunderground.com/api/f6707df2a16e713d/geolookup/conditions/forecast/q/" + newStateInput + "/" + newCityInput +".json"
	$.getJSON(URL, currentWeather);
	console.log("new url is: " + URL);
	$("#newcitybtn").attr("id", "changecitybtn");
}

$("#changecitybtn").on("click", changeCity);

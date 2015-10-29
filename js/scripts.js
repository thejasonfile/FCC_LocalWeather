var URL = "http://api.openweathermap.org/data/2.5/weather?q=NewYork&appid=bd82977b86bf27fb59a04b61b657fb6f"
var weatherData = {
		units: "imperial"
}
function displayWeather(data) {
	$("#weatherimage").html(data.main.temp)
}
$.getJSON(URL, weatherData, displayWeather)
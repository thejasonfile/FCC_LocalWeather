// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    location: 'New York, NY',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      city = weather.city+', '+weather.region;
      conditions = '<span id="condition">'+weather.currently+'</span>';
      image = '<img src='+weather.image+'>';
      currentTemp = '<div id="currenttemp"><span>'+weather.temp+'&deg;'+weather.units.temp+'</span></div>';
      hiTemp = '<div id="hitemp"><span>High: '+weather.high+'&deg'+weather.units.temp+' </span></div>';
      loTemp = '<div id="lotemp"><span>Low: '+weather.low+'&deg'+weather.units.temp+' </span></div>';

      $("#subtitle").append(city);
      $("#weatherimage").html(image).append(conditions);
      $("#temps").prepend(currentTemp);
      $("#hiandlo").html(loTemp).append(hiTemp);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
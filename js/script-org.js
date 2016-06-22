var KEY = '3d9021af0fe004c37883c49e9cf08b46',
    BASE_URL = 'https://api.forecast.io/forecast/';




var weatherContainerNode = document.querySelector('#weatherContainer');
var buttonContainerNode = document.querySelector('#nav-buttons')

var geolocate = function(){
    // get current latitude and longitude
    // default the view type to current
    var successFunc = function(){
        var lat = positionObject.coords.latitude,
            lng = positionObject.coords.longitude;
        location.hash = lat + '/' + lng + '/current';
    };
    navigator.geolocation.getCurrentPosition(successFunc, function(err){console.log(err)});
};

var WeatherRouter = Backbone.Router.extend({
    routes: {
        ":lat/:lng/current": "handleCurrentView"
        ":lat/:lng/daily": "handleDailyView"
        ":lat/:lng/hourly": "handleHourlyView"
        "*anythingElse": "handleDefault"
    },
    handleCurrentWeather: function(){
        console.log('current weather route matched', lat, lng)
    },
    handleDefault: function(){
        geolocate()
    },
    handleDailyView: function(){

    },
    handleHourlyView: function(){

    },
    initialize: function(){
        Backbone.history.start()
    }
});




var rtr = new WeatherRouter()



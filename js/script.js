var KEY = '3d9021af0fe004c37883c49e9cf08b46',
    BASE_URL = 'https://api.forecast.io/forecast/'


// 'https://api.forecast.io/forecast/3d9021af0fe004c37883c49e9cf08b46/LATITUDE,LONGITUDE'
var locationReader = function(geoPos){
	console.log('got geo pos')
	location.hash = geoPos.coords.latitude + '/' + geoPos.coords.longitude + '/current'
}



var errorHandler = function(error) {
    console.log(error)
}
var buttonContainerNode = document.querySelector('#navBar')

var weatherContainerNode = document.querySelector('#weatherContainer')



var getInputHash = function(eventObj) {
    console.log('invoking getInputHash')
    var inputHash = eventObj.target.value
    console.log(inputHash)
    var currentStatus = inputHash
    // console.log(currentStatus)
}

var renderCurrentView = function(apiResponse) {
    console.log('invoking renderCurrentView')
    console.log(apiResponse)
    console.log("current status>>"+currentStatus)
    // var summaryConditions = apiResponse[]
    // console.log(summaryConditions)
    // weatherContainerNode.innerHTML = '<p class="condition">' + summaryConditions + '</p>'
}

var handleDefault = function() {
	console.log('invoking handleDefault')
    var getPos = function(inputObj) {
        console.log(inputObj)
        var newLat = inputObj.coords.latitude
        var newLon = inputObj.coords.longitude
        console.log(newLat, newLon)
        var newView = 'current'
        var hash = newLat + '/' + newLon + '/' + newView
        console.log(hash)
        location.hash = hash
    }
    navigator.geolocation.getCurrentPosition(getPos)
}

var hashController = function() {
	console.log('invoking hashController')
    //test hash #29.79836680912371/-95.38682656579275/current
    var currentHash = location.hash.substr(1)

    if (!currentHash) {
        handleDefault()
        return
    } else {

        console.log(currentHash)
            //test hash 29.79836680912371/-95.38682656579275/current

        var hashParts = currentHash.split('/')
        console.log("hash parts: ", hashParts)

        var lat = hashParts[0],
            lng = hashParts[1],
            currentView = hashParts[2]
        console.log(lat, lng, currentView)

        var weatherPromise = $.getJSON(BASE_URL + KEY + '/' + lat + ',' + lng)
        console.log(weatherPromise)

        if (currentView === 'current') {
            weatherPromise.then(renderCurrentView)
        } else if (currentView === 'daily') {
            weatherPromise.then(renderDailyView)
        } else if (currentView === 'hourly') {
            weatherPromise.then(renderHourlyView)
        }
    }
}
var currentStatus = ''

var getInputHash = function(eventObj) {
    console.log('invoking getInputHash')
    var inputHash = eventObj.target.value
    console.log(inputHash)
    currentStatus = inputHash
}


// navigator.geolocation.getCurrentPosition(locationReader, errorHandler)
/*
var controller = function(){
	var hashRoute = location.hash.substr[1]
	// console.log(hashRoute)
	var hashParts = hashRoute.split('/')
	var lat = hashParts[0],
		lng = hashParts[1],
		viewType = hashParts[2]
	console.log(lat,lng,viewType)
}
*/

buttonContainerNode.addEventListener('click', getInputHash)
window.addEventListener('hashchange', hashController)

hashController()

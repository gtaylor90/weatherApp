var KEY = '3d9021af0fe004c37883c49e9cf08b46',
    BASE_URL = 'https://api.forecast.io/forecast/'




var buttonContainerNode = document.querySelector('#navBar')
var buttonContainerNode_current = document.querySelector('#currentButton')
var buttonContainerNode_daily = document.querySelector('#dailyButton')
var buttonContainerNode_hourly = document.querySelector('#hourlyButton')

var weatherContainerNode = document.querySelector('#weatherContainer')
var weatherContainerNode_daily = document.querySelector('#weatherContainer_daily')
var weatherContainerNode_current = document.querySelector('#weatherContainer_current')

var getInputHash = function(eventObj) {

    var inputHash = eventObj.target.value

    var currentStatus = inputHash
        // 
}



var renderCurrentView = function(apiResponse) {

    console.log(apiResponse)

    var currentCond = apiResponse.currently
    console.log('icon', apiResponse.curently.icon)
    var htmlString = ''
    htmlString += '<div class="currentView">'
    htmlString += '<div class="weatherInformation">'
    htmlString += '<figure class="icons"><canvas id="' + currentCond['icon'] + '" width="120" height="120"></canvas></figure>'
    htmlString += '<ul class="dailyInfo">'
    htmlString += '<li class="temp"> Current Temperature: ' + currentCond.apparentTemperature + '</li>'
    htmlString += '<li class="summary">' + currentCond.summary + '</li>'
    htmlString += '<li class="day">' + currentCond.precipType + '</li>'
    htmlString += '</ul>'
    htmlString += '</div>'
    htmlString += '</div>'
    weatherContainerNode.innerHTML = htmlString

}




var renderDailyView = function(apiResponse) {

    console.log('invoking render daily view')

    var dailyConditions = apiResponse.daily.data

    // 
    var htmlString = ''
    for (var i = 0; i < dailyConditions.length; i++) {
        var dayObj = dailyConditions[i]

        htmlString += '<div class="currentView">'
        htmlString += '<div class="weatherInformation">'
        htmlString += '<figure class="icons"><canvas id="rain" width="120" height="120"></canvas></figure>'
        htmlString += '<ul class="dailyInfo">'
        htmlString += '<li class="day">' + i + '</li>'
        htmlString += '<li class="temp"> High: ' + dayObj.apparentTemperatureMax + '</li>'
        htmlString += '<li class="temp"> Low: ' + dayObj.apparentTemperatureMin + '</li>'
        htmlString += '<li class="summary">' + dayObj.summary + '</li>'
        htmlString += '</ul>'
        htmlString += '</div>'
        htmlString += '</div>'

    }
    console.log(htmlString)
    weatherContainer.innerHTML = htmlString
}

var renderHourlyView = function(apiResponse) {
        var hourlyConditions = apiResponse.hourly.data
        console.log('hourly conditions>> ', hourlyConditions)
        var htmlString = ''
        for (var i = 0; i < hourlyConditions.length; i++) {
            var dayObj = hourlyConditions[i]

            htmlString += '<div class="currentView">'
            htmlString += '<div class="weatherInformation">'
            htmlString += '<ul class="dailyInfo">'
            htmlString += '<li class="hour">' + i + '</li>'
            htmlString += '<li class="temp"> High: ' + dayObj.apparentTemperature + '</li>'
            htmlString += '<li class="temp"> Time: ' + dayObj.time + '</li>'
            htmlString += '<li class="summary">' + dayObj.summary + '</li>'
            htmlString += '</ul>'
            htmlString += '</div>'
            htmlString += '</div>'

        }
        weatherContainer.innerHTML = htmlString
            // 

    }
    /*
    <div class="currentView">
        <div class="weatherInformation">
            <ul class="dailyInfo">
                <li class="day">Monday</li>
                <li class="temp">99°</li>
                <li class="condition">Partly Cloudy</li>
                <li class="rainChance">77%</li>
            </ul>
        </div>
    </div>
    */


var handleDefault = function() {

    var getPos = function(inputObj) {

        var newLat = inputObj.coords.latitude
        var newLon = inputObj.coords.longitude

        var newView = 'current'
        var hash = newLat + '/' + newLon + '/' + newView

        location.hash = hash
    }
    navigator.geolocation.getCurrentPosition(getPos)
}

var hashController = function() {

    //test hash #29.79836680912371/-95.38682656579275/current
    var currentHash = location.hash.substr(1)

    if (!currentHash) {

        handleDefault()
        return
    } else {


        //test hash 29.79836680912371/-95.38682656579275/current

        var hashParts = currentHash.split('/')


        var lat = hashParts[0],
            lng = hashParts[1],
            currentView = hashParts[2]


        weatherPromise = $.getJSON(BASE_URL + KEY + '/' + lat + ',' + lng)


        if (currentView === 'current') {
            weatherPromise.then(renderCurrentView)
        } else if (currentView === 'daily') {
            weatherPromise.then(renderDailyView)
        } else if (currentView === 'hourly') {
            weatherPromise.then(renderHourlyView)
        }
    }
}


var getInputHash = function(eventObj) {

    var viewType = eventObj.target.value
        // read the hash
    console.log(location.hash)
        // #99/99/current
    var hashArray = location.hash.split('/')
        // #99/99/daily
    console.log("hash array>>>" + hashArray)
    hashArray[2] = viewType
    location.hash = hashArray.join('/')


}

/*
var controller = function(){
    var hashRoute = location.hash.substr[1]
    // 
    var hashParts = hashRoute.split('/')
    var lat = hashParts[0],
        lng = hashParts[1],
        viewType = hashParts[2]
    
}
*/

// buttonContainerNode_daily.addEventListener('click', renderDailyView)
buttonContainerNode.addEventListener('click', getInputHash)
window.addEventListener('hashchange', hashController)

hashController()

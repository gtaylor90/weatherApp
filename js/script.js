var locationReader = function(geoPos){
	console.log('got geo pos')
	location.hash = geoPos.coords.latitude + '/' + geoPos.coords.longitude + '/current'
}

var errorHandler = function(error){
	console.log(error)
}

navigator.geolocation.getCurrentPosition(locationReader, errorHandler)

var controller = function(){
	var hashRoute = location.hash.substr[1]
	// console.log(hashRoute)
	var hashParts = hashRoute.split('/')
	var lat = hashParts[0],
		long = hashParts[1],
		viewType = hashParts[2]
	console.log(lat,long,viewType)
}

window.addEventListener('hashchange', controller)

controller()
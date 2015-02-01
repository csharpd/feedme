// configuration & variables
var distance = 1000;
var foursquareApiBaseUrl = 'https://api.foursquare.com/v2/venues/explore?';
var clientId = 'J0IWD3NBN2YKHAI5U1GA1S1PJ5WPZYTPX5DSYKOLLC5QCSWO';
var clientSecret = 'UFJUDAPQZUX5LDPMDHGK3XOPB4QDH5HPA13J1WTP1QPWA0SB';
var apiVersion = 20130815;

window.map;
window.currentLocation;

// Map
window.getLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    map = new GMaps({
      div: '#map',
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    marker = map.addMarker({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      icon: 'images/zombie_walk.gif'
    });
      currentLocation = position.coords;
  });
}

window.clearMap = function() {
  map.removeMarkers();
}

window.mapMyLocation = function() {
  map.addMarker({
    lat: currentLocation.latitude,
    lng: currentLocation.longitude,
    icon: '/images/zombie_walk.gif',
    optimized: false
  });
}

window.placeOnMap = function(element) {
  var venue = elementToVenue(element);
  if(hasPriceAndRating(venue)) {
    map.addMarker({
      lat: venue.location.lat,
      lng: venue.location.lng,
      title: venue.name,
      infoWindow: {
        content: venue.name +": "+venue.rating+" Cost -"+venue.price.message
      }
    });
  };
}

// Foursquare Api calls
function locationAsString() {
  return '&ll=' + currentLocation.latitude + ',' + currentLocation.longitude;
}

function credentials() {
  return 'client_id=' + clientId + '&client_secret=' + clientSecret;
}

function radius(distance) {
  return '&radius=' + distance;
}

function version(apiVersion) {
  return '&v=' + apiVersion;
}

window.buildUrl = function() {
  var query = '&query=' + $(event.target).data('query');
  var url = foursquareApiBaseUrl + credentials() + version(apiVersion) + locationAsString() +
            radius(distance) + query;
  return url;
}

window.sortByRating = function(rawVenues, callback) {
  var venues = rawVenues.sort(function(a,b){
    return a.venue.rating - b.venue.rating;
  });
  callback(venues);
}

window.noSorting = function(rawVenues, callback) {
  callback(rawVenues);
}

window.searchForVenues = function(sortBy, callback) {
  $.get(buildUrl(), function(data){
    sortBy(data.response.groups[0].items, callback);
  });
}

// Multiple purpose functions
window.renderCategories = function(categories) {
  var category_template = $('#categories').html();
  var rendered_categories = Mustache.render(category_template,
  { categories: categories });
  $('section aside nav ul').html(rendered_categories);
}

window.clearResults = function() {
  $('#results').html('');
}

window.addToList = function(element) {
  var venue = elementToVenue(element);
  if(hasPriceAndRating(venue)) {
    var result = Mustache.render($('#profile_template').html(), {venue: venue, currentLocation: window.currentLocation});
    $(result).prependTo('#results');
  }
}

function elementToVenue(element) {
  console.log(element);
  return element.venue;
}

function hasPriceAndRating(venue) {
  return venue.price && venue.rating;
}

function cleanImageName(name) {
  return name.replace('+', '_');
}

window.changeBackground = function() {
  name = cleanImageName($(event.target).data('query'));
  $('html').css('background-image',"url('/images/" + name + ".jpg')");
}

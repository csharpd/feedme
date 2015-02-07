// configuration & variables
var distance = 1000;
var foursquareApiBaseUrl = 'https://api.foursquare.com/v2/venues/explore?';
var clientId = 'J0IWD3NBN2YKHAI5U1GA1S1PJ5WPZYTPX5DSYKOLLC5QCSWO';
var clientSecret = 'UFJUDAPQZUX5LDPMDHGK3XOPB4QDH5HPA13J1WTP1QPWA0SB';
var apiVersion = 20130815;

window.map;

// Handlebars...
//
// templates
var categories_source = $('#categories').html();
var profile_source = $('#profile_template').html();

Handlebars.registerHelper('stars', function(rating) {
  half = parseFloat(rating) / 2;
  star_rating = parseInt(half);
  halfStar = parseFloat(half) - star_rating > 0;
  stars =  _.times(star_rating, function(n) {
      return '<i class="fa fa-star"></i>';
  }).toString().replace(/,/g,'');
  if(halfStar == true) {
    stars += '<i class="fa fa-star-half"></i>';
  }
  return stars + ' (average rating: ' + rating + ')';
});

Handlebars.registerHelper('price', function(price) {
  pricing = { Cheap: 1, Moderate: 2, Expensive: 3, 'Very Expensive': 4 }
  return _.times(pricing[price], function(n) {
    return '<i class="fa fa-gbp"></i>'; 
  }).toString().replace(/,/g,'') + ' (' + price + ')';
});

// Map
window.getLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    map = new GMaps({
      div: '#map',
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });
    marker = map.addMarker({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
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

window.selectedCategory = function() {
  return $(event.target).data('query');
}

window.buildUrl = function() {
  var query = '&query=' + selectedCategory();
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
  var template = Handlebars.compile(categories_source);
  $('section aside nav ul').html(template({ categories: categories }));
}

window.clearResults = function() {
  $('#results').html('');
}

window.addToList = function(element) {
  var venue = elementToVenue(element);
  var template = Handlebars.compile(profile_source);
  if(hasPriceAndRating(venue)) {
    var result = template({venue: venue, currentLocation: window.currentLocation});
    $(result).prependTo('#results');
  }
}

function elementToVenue(element) {
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

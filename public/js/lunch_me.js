var map;
  var currentLocation;
  var distance = 1000;
  var foursquareApiBaseUrl = 'https://api.foursquare.com/v2/venues/explore?';
  var clientId = 'J0IWD3NBN2YKHAI5U1GA1S1PJ5WPZYTPX5DSYKOLLC5QCSWO';
  var clientSecret = 'UFJUDAPQZUX5LDPMDHGK3XOPB4QDH5HPA13J1WTP1QPWA0SB';
  var apiVersion = 20130815;

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
        // icon: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png'
      });
        currentLocation = position.coords;
    });
  }

  window.renderCategories = function(categories) {
    var category_template = $('#categories').html();
    var rendered_categories = Mustache.render(category_template,
    { categories: categories });
    $('section aside nav ul').html(rendered_categories);
  }

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
    return '&v=' + apeVersion;
  }

  window.buildUrl = function() {
    var query = '&query=' + $(event.target).data('query');
    var url = foursquareApiBaseUrl + credentials() + version(apiVersion) + locationAsString() +
              radius(distance) + query;
    console.log(url);
    return url;
  }


  $('#map_button').on('click',function(){
    $('#results').css('display','none');
    $('#map').css('left','0px');
  });

   $('#list_button').on('click',function(){
    $('#results').css('display','block');
    $('#map').css('left','-10000px');
  });

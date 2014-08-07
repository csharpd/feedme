(function(){
    var map;
    var marker;
    var currentLocation;
    function getLocation(){
      navigator.geolocation.getCurrentPosition(function(position){
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

  getLocation();




// we collect data via this URI

  $('button').on('click',function(){
      var base_url ='https://api.foursquare.com/v2/venues/explore?client_id=J0IWD3NBN2YKHAI5U1GA1S1PJ5WPZYTPX5DSYKOLLC5QCSWO&client_secret=UFJUDAPQZUX5LDPMDHGK3XOPB4QDH5HPA13J1WTP1QPWA0SB&v=20130815&ll=' + currentLocation.latitude+','+ currentLocation.longitude +'&radius=1000'
    var option = $(this).data('option');
    var url = base_url + '&query=' + option;

//Adds an extra search function onto the end of the API

    map.removeMarkers();
    map.addMarker({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
      icon: 'images/zombie_walk.gif'
    });
    $.get(url, function(data){


//Taking the data that URI generates
      var results = data.response.groups[0].items;
      results = results.sort(function(a,b){
        return a.venue.rating - b.venue.rating;
      })
      $('html').css('background-image',"url('/images/"+option+".jpg')");
      $('#results').html('');

      results.forEach(function(element){

// iterate over each object found - saving each one as a venue
        var venue = element.venue;
// take each of the elements attributes listed and display in the results section
        if(venue.price && venue.rating) {
          var newProfile = Mustache.render($('#profile_template').html(), venue);

            map.addMarker({
              lat: venue.location.lat,
              lng: venue.location.lng,
              title: venue.name,
              infoWindow: {
                content: venue.name +": "+venue.rating+" Cost -"+venue.price.message
              }
            });

       $(newProfile).prependTo('#results');
        };

      });

    });

  });

})();
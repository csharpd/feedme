(function(){
    var map;
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

  $('#map_button').on('click',function(){
    $('#results').css('display','none');
    $('#map').css('left','0px');
  });

   $('#list_button').on('click',function(){
    $('#results').css('display','block');
    $('#map').css('left','-10000px');
  });

  $('.button').on('click',function(){
      var base_url ='https://api.foursquare.com/v2/venues/explore?client_id=J0IWD3NBN2YKHAI5U1GA1S1PJ5WPZYTPX5DSYKOLLC5QCSWO&client_secret=UFJUDAPQZUX5LDPMDHGK3XOPB4QDH5HPA13J1WTP1QPWA0SB&v=20130815&ll=' + currentLocation.latitude+','+ currentLocation.longitude +'&radius=1000'
    var option = $(this).data('option');
    var url = base_url + '&query=' + option;


    map.removeMarkers();

    map.addMarker({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
      icon: 'images/zombie_walk.gif'
    });
    $.get(url, function(data){


      var results = data.response.groups[0].items;
      results = results.sort(function(a,b){
        return a.venue.rating - b.venue.rating;
      })
      $('html').css('background-image',"url('/images/"+option+".jpg')");
      $('#results').html('');

      results.forEach(function(element){

        var venue = element.venue;

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
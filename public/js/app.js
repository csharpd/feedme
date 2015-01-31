var categories = [
  {name: 'Burgers', query: 'burger'},
  {name: 'Sushi', query: 'sushi'},
  {name: 'Beer', query: 'beer'},
  {name: 'Noodles', query: 'noddles'},
  {name: 'Doughnuts', query: 'doughnuts'},
  {name: 'Coffee', query: 'coffee'},
  {name: 'Cake', query: 'cake'},
  {name: 'Vegan', query: 'vegan'},
  {name: 'Veggie', query: 'vegetarian'},
  {name: 'Gluten Free', query: 'gluten+free'},
  {name: 'Indian', query: 'indian'},
  {name: 'Ice Cream', query: 'ice+cream'},
  {name: 'Cocktails', query: 'cocktails'}
];

getLocation();
renderCategories(categories);

$('.button').on('click',function(){
  map.removeMarkers();

  map.addMarker({
    lat: currentLocation.latitude,
    lng: currentLocation.longitude,
    icon: 'images/zombie_walk.gif'
  });
  
  $.get(buildUrl(), function(data){
    var results = data.response.groups[0].items;
    results = results.sort(function(a,b){
      return a.venue.rating - b.venue.rating;
    })
    // $('html').css('background-image',"url('/images/"+option+".jpg')");
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

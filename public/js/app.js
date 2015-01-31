var categories = [
  {name: 'Burgers', query: 'burger'},
  {name: 'Sushi', query: 'sushi'},
  {name: 'Beer', query: 'beer'},
  {name: 'Noodles', query: 'noodles'},
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

$('.button').on('click',function() {
  clearMap();
  clearResults();
  mapMyLocation();
  changeBackground();
  searchForVenues(sortByRating, function(venues) {
    _.chain(venues)
      .each(placeOnMap)
      .each(addToList)
  });
});

$('#map_button').on('click',function(){
  $('#results').css('display','none');
  $('#map').css('left','0px');
});

$('#list_button').on('click',function(){
  $('#results').css('display','block');
  $('#map').css('left','-10000px');
});

var categories = [
  {name: 'Noodles', query: 'noodles'},
  {name: 'Sushi', query: 'sushi'},
  {name: 'Indian', query: 'indian'},
  {name: 'Burgers', query: 'burger'},
  {name: 'Beer', query: 'beer'},
  {name: 'Doughnuts', query: 'doughnuts'},
  {name: 'Ice Cream', query: 'ice+cream'},
  {name: 'Cocktails', query: 'cocktails'},
  {name: 'Vegetarian', query: 'vegetarian'},
  {name: 'Gluten Free', query: 'gluten+free'},
  {name: 'Vegan', query: 'vegan'},
  {name: 'Cake', query: 'cake'},
  {name: 'Coffee', query: 'coffee'}
];

feedme.setCurrentLocation(navigator);

renderCategories(categories);

function highlightCategory() {
  $('#navigation li').removeClass('active');
  $('#'+selectedCategory()).addClass('active');
}

$('.button').on('click',function() {
  clearResults();
  changeBackground();
  highlightCategory();
  searchForVenues(sortByRating, function(venues) {
    _.chain(venues)
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

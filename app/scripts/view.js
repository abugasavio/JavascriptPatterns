(function(_, $){
  Cat.loadAll();

  var $gallery = $('[rel=gallery]');


  var keys = Object.keys(Cat.instances);


  var compiled = _.template('<div class="col-lg-4 col-sm-6 col-xs-12">\
    <a href="#">\
    <img name="<%= name %>" src="<%= url %>" class="img-rounded img-responsive" rel="image">\
    <label rel="clicks"><%= clicks %> Clicks</label>\
    </a>\
    </div>');


  for(var i=0; i < keys.length; i++) {
    $gallery.append(compiled(Cat.instances[keys[i]]));
  }

  var $image = $('[rel=image]');

  function clickCat(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    var $catName = $(evt.target).attr('name');
    EVT.emit("cat clicked", $catName);
  }

  function renderPage($evt){

    var $query = $('[name="' + $evt +'"]');
    var $clicks = $query.next();
    var cat = Cat.instances[$evt];
    $clicks.html(cat.clicks + ' Clicks');
  }


  $image.on("click", clickCat);
  EVT.on("cat clicked", Cat.increaseClicks)
  EVT.on("clicksIncreased", renderPage);


})(_, $);

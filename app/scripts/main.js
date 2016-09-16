(function(_, $){
  Cat.loadAll();

  var $gallery = $('[rel=gallery]');


  var keys = Object.keys(Cat.instances);


  var compiled = _.template('<div class="col-lg-4 col-sm-6 col-xs-12">\
    <a href="#">\
    <img src="<%= url%>" class="thumbnail img-responsive">\
    </a>\
    </div>');


  for(var i=0; i < keys.length; i++) {
    $gallery.append(compiled(Cat.instances[keys[i]]));
  }
})(_, $);

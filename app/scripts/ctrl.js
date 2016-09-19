(function(){
  EVT.on("cat clicked", Cat.increaseClicks);
  // TODO: Use promises here

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


  EVT.on("clicksIncreased", renderPage);

  var $image = $('[rel=image]');
  $image.on("click", clickCat);

})();

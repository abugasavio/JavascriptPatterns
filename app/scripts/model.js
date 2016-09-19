function Cat(slots){
  this.url = slots.url;
  this.name = slots.name;
  this.clicks = 0;
}

Cat.instances = {};

Cat.updateInstances = function(json){
  var key = "";
  var keys = Object.keys(json);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    Cat.instances[json[key].name] = new Cat(json[key]);
  }
};

Cat.loadAll2 = function(){
  fetch('/data/data.json')
    .then(function(response){
      return response.json();
    }).then(function(json){
      console.log(json);
      Cat.updateInstances([
        {
          "name":"cat01",
          "url":"images/cat01.jpg"
        },
        {
          "name":"cat02",
          "url":"images/cat02.jpg"
        }
      ]);
  });
};

Cat.loadAll = function(){
  Cat.updateInstances([
    {
      "name":"cat01",
      "url":"images/cat01.jpg"
    },
    {
      "name":"cat02",
      "url":"images/cat02.jpg"
    },
    {
      "name":"cat03",
      "url":"images/cat03.jpg"
    }
  ])
};


Cat.increaseClicks = function($catName){
  var cat = Cat.instances[$catName];
  cat.clicks++;
  console.log(Cat.instances);
  EVT.emit("clicksIncreased", $catName);
};

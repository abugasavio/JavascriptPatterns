(function($, _){
  var model = {

    init: function(){
      if(!localStorage.cats) {
        localStorage.cats = JSON.stringify({
          'cat01': {
                    'name':'cat01',
                    'url':'images/cat01.jpg',
                    'clicks': 0
                  },
          'cat02': {
            'name':'cat02',
            'url':'images/cat02.jpg',
            'clicks': 0
          }
        });
      }
    },

    getAllCats: function(){
      return JSON.parse(localStorage.cats);
    },

    getCat: function(catName){
      return this.getAllCats()[catName];
    },
    incrementClicks: function(catName){
      var catsObj = this.getAllCats();
      var keys = Object.keys(catsObj);
      for(var i =0; i < keys.length; i++){
        var name = keys[i];
        if (name === catName) {
          catsObj[name].clicks++;
          break;
        }
      }
      console.log(catsObj);
      localStorage.setItem('cats', JSON.stringify(catsObj));
    }

  };

  var octopus = {

    init: function(){
      model.init();
      adminPanelView.init();
      listView.init();
      thumbnailView.init();
    },

    getCats: function () {
      return model.getAllCats();
    },
    catClicked: function(evt){
      var catName = $(evt.target).html();
      console.log(catName);
      model.incrementClicks(catName);
      thumbnailView.updateCatThumbnail(model.getCat(catName));
    },
    getFirstCat: function() {
      var keys = Object.keys(model.getAllCats());
      var name = keys[0];
      return model.getAllCats()[name];
    }

  };


  var thumbnailView = {
    init: function(){
      this.updateCatThumbnail(octopus.getFirstCat());
    },
    updateCatThumbnail: function(catObj){
      console.log(catObj);
      var $thumbnail = $('#catThumbnail');
      var catThumbnailTemplate=_.template('<div class="thumbnail">\
        <img class="img-rounded no-resize" rel="catimage" id="catimage" data-src="holder.js/100%x200" alt="..." src=<%= cat.url %>>\
        <div class="caption">\
        <h4>Cat Name: <%= cat.name %></h4>\
        <h4>Clicks: <%= cat.clicks %></h4>\
        </div>\
        </div>');
      $thumbnail.html('');
      $thumbnail.append(catThumbnailTemplate({cat:catObj}))
    }

  };

  var adminPanelView = {
    init: function() {
      var $adminForm = $('[ref=admin-form]');
      var $adminButton = $('[ref=admin-button]');
      var $adminButtonCancel = $('[ref=admin-button-cancel]');
      $adminForm.hide();
      $adminButton.on('click', function(evt){
        evt.preventDefault();
        $adminForm.show();
      });
      $adminButtonCancel.on('click', function(evt){
        evt.preventDefault();
        $adminForm.hide();
      });
      $adminForm.on('submit', function(evt){
        evt.preventDefault();
        console.log(evt)

      });
    },


  };

  var listView = {
    init: function(){
      var $catlist = $('#catlist');
      var catlistTemplate = _.template('<li ref="catlistLi" class="list-group-item" name=<%= cat.name%>><a href="#"><%= cat.name%></a></li>');
      var cats = octopus.getCats();
      var keys = Object.keys(cats);

      for(var i = 0; i < keys.length; i++) {
        var name = keys[i];
        $catlist.append(catlistTemplate({cat: cats[name]}));
      }
      var $catListLinks = $('[ref=catlistLi] > a');
      $catListLinks.on('click', octopus.catClicked);
    }
  };

  octopus.init();

})($, _);

(function($, _){
  var model = {

    init: function(){
      if(!localStorage.cats) {
        localStorage.cats = JSON.stringify([
          {
            'name':'cat01',
            'url':'images/cat01.jpg'
          },
          {
            'name':'cat02',
            'url':'images/cat02.jpg'
          }
        ]);
      }
    },

    getAllCats: function(){
      return JSON.parse(localStorage.cats);
    },

    getCat: function(catName){
      return model.getAllCats().filter(function(catObj){
        return catObj.name === catName;
      })
    },
    incrementClicks: function(catName){
      var catObj = this.getCat(catName);
      // TODO: incrementing clicks ...
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
      thumbnailView.updateCatThumbnail(model.getCat(catName)[0]);
    },
    getFirstCat: function() {
      return model.getAllCats()[0];
    }

  };


  var thumbnailView = {
    init: function(){
      this.updateCatThumbnail(octopus.getFirstCat());
    },
    updateCatThumbnail: function(catObj){
      var $thumbnail = $('#catThumbnail');
      var catThumbnailTemplate=_.template('<div class="thumbnail">\
        <img class="img-rounded no-resize" rel="catimage" id="catimage" data-src="holder.js/100%x200" alt="..." src=<%= cat.url %>>\
        <div class="caption">\
        <h3><%= cat.name %></h3>\
        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
       <p><a role="button" class="btn btn-primary" href="#">Button</a> <a role="button" class="btn btn-default" href="#">Button</a></p>\
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
    }
  };

  var listView = {
    init: function(){
      var $catlist = $('#catlist');
      var catlistTemplate = _.template('<li ref="catlistLi" class="list-group-item" name=<%= cat.name%>><a href="#"><%= cat.name%></a></li>');
      var cats = octopus.getCats();
      for(var i = 0; i < cats.length; i++) {
        $catlist.append(catlistTemplate({cat: cats[i]}));
      }
      var $catListLinks = $('[ref=catlistLi] > a');
      $catListLinks.on('click', octopus.catClicked);
    }
  };

  octopus.init();

})($, _);

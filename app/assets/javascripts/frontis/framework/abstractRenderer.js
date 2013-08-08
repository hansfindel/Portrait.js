AbstractRenderer = AbstractClass.extend({
  new: function(_template){
    if(typeof(_template)=="string"){
      _template = this.buildTemplate(_template);
    }
    var o = { 
      template: _template, 

      renderCallbacks: [], 
      addRenderCallback: function(fn, params){
        this.renderCallbacks.push([fn, params]);
      },
      fireRenderCallbacks: function(){
        for(var _i=0; _i < this.renderCallbacks.length; _i++){
          fn = this.renderCallbacks[_i]
          if(fn[1]){
            fn[0](fn[1]);
          }else{
            fn[0]();                      
          }          
        }
      },
      buildTemplate: function(source_container){
        this.template = Renderer.buildTemplate(source_container);
      },

      displayFromJSON: function(json, collection, container, isUnique){
        var product, _i, _len;
        var products = this.getCollection(json, collection);
        _len = products.length;
        if(_len == 0){
          this.displayProduct(json, null, container, isUnique);
        }else{
          for (_i = 0 ; _i < _len; _i++) {
            product = products[_i];
            this.displayProduct(product, json, container); // if it needs additional data... not implemented yet
          }  
        }
        this.fireRenderCallbacks();
      }, 
      getCollection: function(json, collection){
        if(collection==null){
          return [];
        }else{
          return json[collection];  
        }
      }, 
      displayProduct: function(product, json, container, isUnique){
        if(isUnique == null){ isUnique = false }
        var html = this.buildHTML(product, json);
        if(isUnique){
          $(container).html(html)
        }else{
          $(container).append(html)  
        }
        
      }, 
      buildHTML: function(product, json){
        //if more data were needed, here is the place to build the full data object
        var data = product;
        return this.template(data);
      }, 
      displayWith: function(data, containerSelector, isUnique){
        this.displayProduct(data, null, containerSelector, isUnique)
      }
    };
    return o;
  }, 
  buildTemplate: function(source_container){
    // "#picture-template"
    var source;
    if(typeof(source_container)=="string"){ 
      //console.log(Handlebars);
      if(Handlebars.TEMPLATES[source_container]){
        source = Handlebars.TEMPLATES[source_container];
      }
      else{
        if($(source_container).length){
          source = $(source_container).html();  
        }else{
          source = $("#"+source_container).html();
        }        
      }
    }else{
      source = source_container.html();
    }
    //console.log(source_container);
    //console.log(source);
    return Handlebars.compile(source);
  }

})
Handlebars.registerHelper('numberToCurrency', function(number) {
    var str = ""
    while(Math.floor(number/1000) > 0)
    {  
      str = "." + addZero((number%1000),3) + str
      number = Math.floor(number/1000)
    }
    str = "$" + number + str;
    return new Handlebars.SafeString(str);
}); 

Handlebars.registerHelper('partial', function(routeName, options) {
	//routeName should be controller_action_path or and url (not implemented)
  //var nameParts = name.split("/"),
  //    controller = nameParts[0], 
  //    action = nameParts[nameParts.length - 1];

  route = Router.findByRouteName(routeName)
    // default templates should have an preceding underscore 
    //var template = "_" + action;
  var action = route.controller.actions[route.action]
  //var template = action.templateName; 

  	//var underscoredName = [controller, template].join("/");
	//console.log(underscoredName)
      //, found  = templateFor(underscoredName)
      
  //if(!found){
  //	Console.log("Unable to find partial with name '"+name+"'.")	
  //}
  
  var data = options.data || options;
  if(data){
  	//console.log("data: ", data)
  	//console.log("options: ", options)
  	//action.data = data;	
  }
  // with triple -> {{{}}}
  var html = action.partial();
  return html;
  // with double {{{}}}
  /*
  partial_timeout = setTimeout(function(){
  	//$(container).html(html);
  	console.log("partial action")
  	console.log(action)
  	action.render()
  	clearTimeout(partial_timeout);
  }, 1)
  */
});



Handlebars.registerHelper('yield', function(options) {
  //var currentView = options.data.view, view = currentView;
  //console.log("yield")
  //console.log(Handlebars.yielded);
  if(Handlebars.yielded == undefined) {
  	Handlebars.yielded = false;
  }
  
  if(Handlebars.yielded == false){
  	  // detect url 
	  //var current_url = document.URL;
	  Handlebars.yielded = true;

	  var path = document.location.pathname; 
	  //console.log(path)
	  //console.log(Object.keys(Router.routes))
	  route = Router.findByUrl(path)
	  var action = route.controller.actions[route.action]

	  var html = action.partial();
	  return html;
	  /*
	  yield_timeout = setTimeout(function(){
	  	//$(container).html(html);
	  	action.render()
	  	clearTimeout(yield_timeout);
	  }, 1)
	  */
  }
});

Handlebars.registerHelper('linkTo', function(linkName, path, options){	
	//console.log(this);
	//console.log(parent);
	var html = "<a href='#' onclick='Handlebars.helpers.excecuteLinkTo('"+ path +"')>"+ linkName + "</a>"
	//return Handlebars.helpers.append(html, options);
	//return options.html(html)
	return html;
});
Handlebars.registerHelper('excecuteLinkTo', function(path, options){
	stateObj = {url: path}
	history.pushState(stateObj, "name..", path);
	Handlebars.yielded = false;
	Handlebars.helpers.yield();
})
//history.pushState(stateObj||{}, "page 2", "bar.html");

Handlebars.registerHelper("append", function(html, options){
	return $(document).domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
})
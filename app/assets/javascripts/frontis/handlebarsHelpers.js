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
  var nameParts = name.split("/"),
      controller = nameParts[0], 
      action = nameParts[nameParts.length - 1];

  
  
  route = Router.findByRouteName(routeName)
    // default templates should have an preceding underscore 
    //var template = "_" + action;
  var action = route.controller.actions[route.action]
  var template = action.templateName; 

  	//var underscoredName = [controller, template].join("/");
	//console.log(underscoredName)
      //, found  = templateFor(underscoredName)
      
  //if(!found){
  //	Console.log("Unable to find partial with name '"+name+"'.")	
  //}
  
  var data = options.data || options;
  if(data){
  	console.log("data: ", data)
  	action.data = data;	
  }
  action.render();

});



Handlebars.registerHelper('yield', function(options) {
  var currentView = options.data.view, view = currentView;

  while (view && !get(view, 'layout')) {
    view = get(view, 'parentView');
  }
  if(!!view){
  	Console.log("You called yield in a template that was not a layout");	
  }
  

  var template    = get(view, 'template'),
    contextView   = get(view, '_viewForYield'),
    keywords      = contextView.cloneKeywords();

  currentView.appendChild(View, {
    isVirtual:    true,
    tagName:      '',
    template:     template,
    context:      get(contextView, 'context'),
    controller:   get(contextView, 'controller'),
    templateData: {keywords: keywords}
  });
});
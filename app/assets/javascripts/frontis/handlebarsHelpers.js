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

Handlebars.registerHelper('partial', function(name, options) {
	//name should be controller/action 
  var nameParts = name.split("/"),
      controller = nameParts[0], 
      action = nameParts[nameParts.length - 1];

    // default templates should have an preceding underscore 
  var template = "_" + lastPart;

  var view = options.data.view,
      underscoredName = [controller, template].join("/")
      //, found  = templateFor(underscoredName)
      //template = view.templateForName(underscoredName),
      //deprecatedTemplate = !template && view.templateForName(name);
  //if(!found){
  //	Console.log("Unable to find partial with name '"+name+"'.")	
  //}
  
  template = template || deprecatedTemplate;
  var data = options.data || options;
  template(this, { data: data});
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
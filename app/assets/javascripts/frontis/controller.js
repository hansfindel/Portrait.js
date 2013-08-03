//Controller = AbstractController.extend({});
//Controller.defineActions(params)

Controller = AbstractController.new({
	application: Action.new({
		controllerName: "Controller",
		actionName: "application",
		templateName: "application", 
		templateContainer: "application", 
		data: {className: "frontis"},
		hasInstance: false, 
		uniqueInstance: true, 
	})
})
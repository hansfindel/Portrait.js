//Controller = AbstractController.extend({});
//Controller.defineActions(params)

Controller = AbstractController.new({
	application: Action.new({
		controllerName: "Controller",
		actionName: "application",
		templateName: "application", 
		templateContainer: "body", 
		data: {className: "frontis", content: "holo"},
		hasInstance: false, 
		uniqueInstance: true, 
	})
})
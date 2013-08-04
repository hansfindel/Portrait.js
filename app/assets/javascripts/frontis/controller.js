//Controller = AbstractController.extend({});
//Controller.defineActions(params)

Controller = AbstractController.new({
	//application: Action.new("application")
	name: "controller", 
	application: Action.new({
		controllerName: "Controller",
		actionName: "application",
		templateName: "application", 
		templateContainer: "body", 
		data: {className: "frontis", content: "holo"},
		hasInstance: false, 
		uniqueInstance: true, 
	}), 

	body: Action.new({
		controllerName: "Controller",
		actionName: "body",
		templateName: "body", 
		templateContainer: "#container", 
		data: {className: "asdf", content: "qweqr"},
		hasInstance: false, 
		uniqueInstance: true, 		
	})

})

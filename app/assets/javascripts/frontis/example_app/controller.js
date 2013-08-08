//Controller = AbstractController.extend({});
//Controller.defineActions(params)

Controller = AbstractController.new({
	//application: Action.new("application")
	name: "controller", 
	application: Action.new({
		controllerName: "controller",
		actionName: "application",
		templateName: "application", 
		templateContainer: "body", 
		data: {className: "frontis", content: "holo"},
		hasInstance: false, 
		uniqueInstance: true, 
	}), 

	body: Action.new({
		controllerName: "controller",
		actionName: "body",
		templateName: "body", 
		templateContainer: "#container", 
		data: {className: "asdf", content: "qweqr"},
		hasInstance: false, 
		uniqueInstance: false, 		
	}), 

	second: Action.new({
		controllerName: "controller", 
		actionName: "second", 
		templateName: "second", 
		templateContainer: "#container", 
		data: {first: "MicroWave", second: "of", third: "Evil"}
	}), 


	create: Trigger.new({
		controllerName: "controller", 
		triggerName: "create", 
		callback: function(){
			console.log("just called controllers create");
		}
	})

})

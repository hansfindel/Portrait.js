// its going to be called by the programmers each time they create a new controller, so no "factory on the name"
Action = AbstractClass.extend({
	new: function(params){
		var action; 
		if(arguments[0] != params){
			// hopefully this doesnt happen
			newArray(arguments);
		}else{
			action = this.newJSON(params);
		}
		return action;
	}, 
	newJSON: function(params){
		//action = AbstractAction.new(params) //not implemented... 
		var action = AbstractAction.new();
		fn = function(key, value, fc){
			action[key] = value;
		}
		this.loopHash(params, fn);
		this.defaultData(action);
		return action; 
	}, 
	newArray: function(array){
		var action = AbstractAction.new()
		// should be in order... 
		action.controllerName = array[0]
		action.actionName = array[1] || "";
		action.templateName = array[2] || action.actionName;
		action.data = array[3];
		this.defaultData(action);
		return action;
	},
	defaultData: function(action){
		action.data = action.data || {};
		action.hasInstance = false;
		action.uniqueInstance = action.uniqueInstance || false;
		action.uniqueID = Date.now();
	}

})
/* AbstractAction attributes
	controllerName: "",
	actionName: "",
	templateName: "", 
	templateContainer: "", 
	data: {className: "frontis"},
	hasInstance: true, 
	uniqueInstance: true, 
	uniqueID: "",

*/
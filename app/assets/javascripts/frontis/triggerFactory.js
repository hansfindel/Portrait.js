// its going to be called by the programmers each time they create a new controller, so no "factory on the name"
Trigger = AbstractClass.extend({
	new: function(params){
		var trigger; 
		if(arguments[0] != params){
			// hopefully this doesnt happen
			newArray(arguments);
		}else{
			action = this.newJSON(params);
		}
		return trigger;
	}, 
	newJSON: function(params){
		var trigger = AbstractTrigger.new();
		fn = function(key, value, fc){
			trigger[key] = value;
		}
		this.loopHash(params, fn);
		this.defaultData(trigger);
		return trigger; 
	}, 
	newArray: function(array){
		var trigger = AbstractTrigger.new()
		// should be in order... 
		trigger.controllerName = array[0]
		trigger.actionName = array[1] || "";
		trigger.templateName = array[2] || trigger.actionName;
		trigger.data = array[3];
		this.defaultData(trigger);
		return trigger;
	},
	defaultData: function(trigger){
		//controllerName: "", actionName: "", callback: function(){}
		trigger.data = action.data || {};
		trigger.hasInstance = false;
		trigger.uniqueInstance = action.uniqueInstance || false;
		trigger.uniqueID = Date.now();
	}

})

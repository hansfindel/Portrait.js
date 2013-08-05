// its going to be called by the programmers each time they create a new controller, so no "factory on the name"
Trigger = AbstractClass.extend({
	new: function(params){
		var trigger; 
		if(arguments[0] != params){
			// hopefully this doesnt happen
			newArray(arguments);
		}else{
			trigger = this.newJSON(params);
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
		trigger.triggerName = array[1] || "";
		trigger.callback = array[2];
		this.defaultData(trigger);
		return trigger;
	},
	defaultData: function(trigger){
		//controllerName: "", triggerName: "", callback: function(){}
		trigger.controllerName = trigger.controllerName || "";
		trigger.triggerName = trigger.triggerName  || trigger.action || ""; //action is the name passed in the router
		trigger.routeName = trigger.routeName || [trigger.controllerName, trigger.triggerName, "trigger"].join("_");
		trigger.callback = trigger.callback || function(){};
	}

})

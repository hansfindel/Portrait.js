AbstractTrigger = AbstractClass.extend({
	new: function(){
		var action = {
			controllerName: "",
			actionName: "",
			callback: function(){}
		}
		return action;
	}, 
	uniqueID: function(action){
		var uniq = Date.now();
		while(this.lastUniqueID == uniq){
			uniq = Date.now() + action.actionName;
		}
		return uniq;
	}
})
// each action has its own timestamp id -> Date.now()
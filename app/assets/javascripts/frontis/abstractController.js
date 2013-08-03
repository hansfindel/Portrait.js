AbstractController = AbstractClass.extend({
	new: function(params){
		//this.log(params);
		controller = AbstractController.extend({});
		controller.defineActions(controller, params);
		return controller;
	}, 

	actions:{}, 
	defineActions: function(controller, actionsList){
		if(actionsList==null || actionsList == undefined) controller.actions = {};
		if(actionsList.length == undefined) controller.defineActionsFromHashList(controller, actionsList);
		if(actionsList.length) controller.defineActionsFromArray(controller, actionsList);
	}, 
	defineActionsFromArray: function(controller, arr){
		for(var _i=0; i<arr.length; _i++){
			var action = arr[_i];
			if(action.length){
				controller.actions[action[0]] = action[1];
			}else{
				controller.defineActionsFromHashList(action);
			}
		}
	}, 
	defineActionsFromHashList: function(controller, params){
		var fn = function(propName, propValue, fns){
				if(AbstractController.emptyActions(controller)) controller.actions = {};
				controller.actions[propName] = propValue;
		}
		this.loopHash(params, fn);
	}, 

	emptyActions: function(controller){
		return (controller.actions == undefined || controller.actions == null)
	}
})

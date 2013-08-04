AbstractRoute = AbstractClass.extend({
	new: function(a, b, c){
		if(b == null || c == null){
			return this.newFromJSON(a);
		}else{
			return this.newFromVars(a,b,c);
		}

	},
	newFromVars: function(name, controller, action){
		cName = controller.name || "controller"
		if(name == null){ name = [cName, action].join("_") }
		routeName = [name, "path"].join("_")
		var route = {
			name: routeName, 
			controller: controller, 
			action: action
		}
		return route; 
	},
	newFromJSON: function(json){
		if(json.name == null){
			cName = json.controller
			json.name = [cName, json.action].join("_")
		}
		routeName = [json.name, "path"].join("_")
		var route = {
			name: routeName, 
			controller: json.controller, 
			action: json.action
		}
		return route; 
	}
})
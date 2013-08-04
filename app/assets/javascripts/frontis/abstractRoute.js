AbstractRoute = AbstractClass.extend({
	new: function(a, b, c){
		if(b == null || c == null){
			return newFromJSON(a);
		}else{
			return newFromVars(a,b,c);
		}

	},
	newFromVars: function(name, controller, action){
		var route = {
			name: name, 
			controller: controller, 
			action: action
		}
		return route; 
	},
	newFromJSON: function(json){
		var route = {
			name: json.name, 
			controller: json.controller, 
			action: jsonaction
		}
		return route; 
	}
})
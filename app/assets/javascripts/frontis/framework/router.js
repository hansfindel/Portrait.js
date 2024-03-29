Router = AbstractClass.extend({
	routes: {}, 
	addRoute: function(url, routeParams){
		Router.routes[url] = AbstractRoute.new(routeParams);
		return Router.routes[url];
	}, 
	new: function(url, routeParams){
		return Router.addRoute(url, routeParams);
	},
	resource: function(rootUrl, controller){
		var newRoute = rootUrl + "/new";
		var showRoute = rootUrl + ":objectId";
		var editRoute = showRoute + "/edit";
		var indexRoute = rootUrl;
		//name, controller, action
		var actioName = "new"
		Router.addRoute(newRoute, {name: actioName, controller: controller, action: actioName})
		var actioName = "show"
		Router.addRoute(showRoute, {name: actioName, controller: controller, action: actioName})
		var actioName = "index"
		Router.addRoute(indexRoute, {name: actioName, controller: controller, action: actioName})
		var actioName = "edit"
		Router.addRoute(editRoute, {name: actioName, controller: controller, action: actioName})
		// pending create and destroy... these should have no template
	}, 
	root: function(routeParams){
		this.addRoute("", routeParams);		
		this.addRoute("/", routeParams);		
	}, 

	findByRouteName: function(routeName){
		var keys = Object.keys(Router.routes);
		for(var _i = 0; _i < keys.length ; _i++){
			var route = Router.routes[keys[_i]];
			if(route.name == routeName){
				return Router.routes[keys[_i]];
			}
		}
	}, 
	findByUrl: function(path){
		var route = Router.routes[path];
		//console.log(route);
		//console.log(Router.routes)
		return route;
	}, 

	TriggerFor: function(controller, trigger){
		var keys = Object.keys(Router.routes);
		//console.log(controller)
		//console.log(trigger)
		for(var _i = 0; _i < keys.length ; _i++){
			var route = Router.routes[keys[_i]];
			//console.log(route);
			if(route.action == trigger){
				return Router.routes[keys[_i]];
			}
		}
		return null;
	},
	RouteNameForTrigger: function(controller, trigger){
		var route = this.TriggerFor(controller, trigger);
		if(route){
			return route.name;
		}
		return "";
	}, 

	RouteForName: function(routeName){
		var keys = Object.keys(Router.routes);
		for(var _i = 0; _i < keys.length ; _i++){
			var route = Router.routes[keys[_i]];
			if(route.name == routeName){
				return Router.routes[keys[_i]];
			}
		}
		return null;
	}
});

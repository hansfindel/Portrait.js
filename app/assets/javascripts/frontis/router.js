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
		return this.addRoute("", arguments);		
	}, 

	findByRouteName: function(routeName){
		var keys = Object.keys(Router.routes);
		for(var _i = 0; _i < keys.length ; _i++){
			var route = Router.routes[keys[_i]];
			if(route.name == routeName){
				return Router.routes[keys[_i]];
			}
		}
	}
});

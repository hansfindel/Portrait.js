// examples -> 
// hash = {name, controller, actionName}
// Router.new(url, hash)
// Router.addResource(url, hash)
// or resources 
// Router.resource(rootUrl, controller)

Router.root({name: "root", controller: Controller, action: "application"});

Router.addRoute("/blah", {name: "controller_body", controller: Controller, action: "body"})
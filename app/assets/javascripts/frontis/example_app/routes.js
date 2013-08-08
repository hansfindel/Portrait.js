// examples -> 
// hash = {name, controller, actionName}
// Router.new(url, hash)
// Router.addResource(url, hash)
//
// or resources 
//
// Router.resource(rootUrl, controller)
//
// there will be some other notations
//

Router.root({name: "root", controller: Controller, action: "body"});

Router.addRoute("/blah", {name: "controller_body", controller: Controller, action: "body"})
Router.addRoute("/second", {name: "controller_second", controller: Controller, action: "second"})

Router.addRoute("/create", {name: "controller_create", controller: Controller, action: "create"})
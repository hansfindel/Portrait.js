AbstractAction = AbstractClass.extend({
	actionName: "",
	controllerName: "",
	templateName: "", 
	templateContainer: "", 
	data: {className: "frontis"},
	hasInstance: true, 
	uniqueInstance: true, 
	uniqueID: "",

	render: function(){
		if(this.hasInstance){
			if(this.uniqueInstance){
				//no can do
			}else{
				this.displayInstance()
			}
		}else{
			this.displayInstance();
		}
	},
	updateTemplate: function(data){
		//update own data
		this.data = data;
		// search template by uniqueID

		// re-render template
				
	},
	displayInstance: function(){
		this.hasInstance = true;
		var renderer = Renderer.new(this.templateName, null);
		renderer.displayFromJSON(this.data, this.templateContainer);
	}
})
// each action has its own timestamp id -> Date.now()
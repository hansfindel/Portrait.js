AbstractAction = AbstractClass.extend({
	new: function(){
		var action = {
			controllerName: "",
			actionName: "",
			templateName: "", 
			templateContainer: "", 
			templateCollection: null,
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
				var renderer = Renderer.new(this.templateName);
				renderer.displayFromJSON(this.data, this.templateCollection, this.templateContainer);
			}			
		}
		return action;
	}
})
// each action has its own timestamp id -> Date.now()
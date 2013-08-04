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

			partial: function(){
				//returns the rendering content
				var renderer = Renderer.new(this.templateName);
				return renderer.buildHTML(this.data, this.templateCollection);
			}, 
			render: function(target){
				//console.log("render::this")
				//console.log(this)
				if(target == null){
					target = this.templateContainer;
				}
				if(this.hasInstance){
					if(this.uniqueInstance){
						//no can do
						console.log(this);
						console.log("cant render...")
					}else{
						this.displayInstance(target)
					}
				}else{
					this.displayInstance(target);
				}
			},
			updateTemplate: function(data){
				//update own data
				this.data = data;
				// search template by uniqueID

				// re-render template

			},
			displayInstance: function(target){
				//console.log("displayInstance");
				this.hasInstance = true;
				var renderer = Renderer.new(this.templateName);
				renderer.displayFromJSON(this.data, this.templateCollection, target);
			}			
		}
		return action;
	}
})
// each action has its own timestamp id -> Date.now()
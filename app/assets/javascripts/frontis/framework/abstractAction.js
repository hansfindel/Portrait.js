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
			isAbsolute: false, 
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
						if(this.isAbsolute){
							this.displayInstance(target, true)	
						}else{
							console.log(this);
							console.log("cant render...")
						}

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
			displayInstance: function(target, isUniq){
				//console.log("displayInstance");
				this.hasInstance = true;
				this.getUniqueID(); //should instances have the uniqueID as a class?
				var renderer = Renderer.new(this.templateName);
				renderer.displayFromJSON(this.data, this.templateCollection, target, isUniq);
			}, 
			makeSuper: function(){
				this.isAbsolute = true;
			},
			getUniqueID: function(){
				this.uniqueID = AbstractAction.uniqueID(this);			
			}
		}
		return action;
	}, 
	lastUniqueID: null,
	uniqueID: function(action){
		var uniq = Date.now();
		while(this.lastUniqueID == uniq){
			uniq = Date.now() + action.actionName;
		}
		return uniq;
	}
})
// each action has its own timestamp id -> Date.now()
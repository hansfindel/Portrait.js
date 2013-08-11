AbstractModel = AbstractClass.extend({
	new: function(params){
		var parent = this;
		var object = {
			constructor: parent, 
			isValid: function(){
				return this.constructor.validate(this);
			}, 
			save: function(){
				if(this.isValid()){
					//save
				}else{
					return false; 
				}
			}, 
			destroy: function(){
				if(this.canBeDestroyed){
					//
					return true;
				}
				//else{ hide? }
				return false;
			}, 
			makeCopy: function(){
				parent.copy(this);
			}
		}
		return object;
	}, 
	validator: Validator.new({}), 
	validate: function(object){
		if(this.validator){
			return this.validator.validate(object);
		}else{
			return true;
		}
	}, 
	copy: function(object){
		return this.new(Class.ownProperties(object))
	}, 
	addValidation: function(){
		//this.validator
	}, 
	requirePresenceOf: function(target, message){
		this.validator.require_presence_of(target, message);
	}, 
	
})
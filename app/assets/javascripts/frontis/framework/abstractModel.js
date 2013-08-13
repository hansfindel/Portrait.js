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
	//extend: function(params, inheritPropertyValues, extendingClass){
	extend: function(params, extendingClass){
		self = this;
		o = AbstractClass.extend(params, true, self); 
		return o;
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
	requireEmailFormatOf: function(target, message){
		this.validator.require_email_format_of(target, message);
	}, 
	requireUsernameFormatOf: function(target, message){
		this.validator.require_username_format_of(target, message);
	},
	requireFormatOf: function(format, target, message){
		this.validator.require_format_of(format, target, message);
	}, 
	requireLengthOf: function(min, max, target, message){
		this.validator.require_length_validation_of(target, min, max, message)
	}, 
	requireMinLengthOf: function(min, target, message){
		this.validator.require_length_validation_of(target, min, null, message)
	}, 
	requireMaxLengthOf: function(max, target, message){
		this.validator.require_length_validation_of(target, null, max, message)
	}
})
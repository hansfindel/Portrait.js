AbstractValidation = AbstractClass.extend({
	new: function(_function, _target, _message){
		if(_function == "function"){
			f = _function;
			t = _target;
			m = _message
		}else{
			if(_function.length){
				f = _function[0];
				t = _function[1];
				m = _function[2];
			}else{
				f = _function["function"] || _function["validationFunction"];
				t = _function["target"] || _function["validationTarget"];
				m = _function["message"] || _function["validationMessage"];
			}
		}
		validation = {
			validationFunction: f, 
			validationTarget: t, 
			validationMessage: m
		}
		return validation;
	}
})
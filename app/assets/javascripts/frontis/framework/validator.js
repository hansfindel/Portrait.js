Validator = AbstractClass.extend({

  new: function(){
    validatorObject = {
      notify: function(string){
        console.log(string);
      }, 
      validate: function(params){
        //console.log(params)
        return this.valid_params(params);
      },
      valid_params: function(params){
        var errors = this.get_validation_errors(params);
        if(errors.length == 0){
          return true;
        }else{
          for(var i = 0; i < errors.length; i++){
            this.notify(errors[i]);
          }
          return false;
        }
      }, 
      presentValue: function(string){
        if(string==null || string=="")
          return false;
        return true;
      }, 
      validSize: function(string, min, max){
        min = min || -1;
        max = max || string.length + 1;
        //console.log(min, "- - -", max);
        if(typeof(string) == "string"){
          if(string.length < min){
            return false;
          }
          if(string.length > max){
            return false;
          }
          return true;
        }
        return false;
      },
      defineValidSize: function(min, max){
        return function(string){
          min = min || -1;
          max = max || string.length + 1;
          //console.log(min, "- - -", max);
          if(typeof(string) == "string"){
            if(string.length < min){
              return false;
            }
            if(string.length > max){
              return false;
            }
            return true;
          }
          return false;
        }
      },

      emailFormat: function(s){
        var format = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; 
        return format.test(s);
      },
      usernameFormat: function(s){
        var format = /^[A-Za-z0-9._%+-]*@[A-Za-z0-9.-]*$/; // no @
        return !format.test(s);
      },
      testWithFormat: function(format){
        return function(s){
          if(typeof(format) == "object"){
            //lets assume its a regex
            return format.test(s);
          }else{
            return format == s;
          }
        }
      }, 
      get_message: function(default_message, attr_name, validation_message){
        var message;
      if(default_message){
        if(typeof(default_message)=="string"){
          message = default_message;
        }else{
          message = default_message(attr_name)
        }
      }else{
        message = "The attribute " + attr_name + " " + validation_message;
      }
      return message;
      },

      validations: [],
      require_presence_of: function(params_array, default_message){
        validations = this.validations;
        for(var i = 0; i < params_array.length; i++)
      { 
        var name = params_array[i];   
        var message = this.get_message(default_message, name, "is required");    
        var validation = [this.presentValue, name, message];
        // use abstractValidations instaed of arrays
        //console.log(validations);
        validations.push(validation);
      }
      return validations;
      }, 
      require_email_format_of: function(params_array, default_message){
      validations = this.validations;
        for(var i = 0; i < params_array.length; i++)
      { 
        var name = params_array[i];
        var message = this.get_message(default_message, name, "is not a valid email");   
        var validation = [this.emailFormat, name, message];
        validations.push(validation);
      }
      return validations;
      },
      require_username_format_of: function(params_array, default_message){
        validations = this.validations;
          for(var i = 0; i < params_array.length; i++)
        { 
          var name = params_array[i];
          var message = this.get_message(default_message, name, "is not a valid value");   
          var validation = [this.usernameFormat, name, message];
          validations.push(validation);
        }
        return validations;
      },
      require_format_of: function(format, params_array, default_message){
        validations = this.validations;
          for(var i = 0; i < params_array.length; i++)
        { 
          var name = params_array[i];
          var message = this.get_message(default_message, name, "is not a valid value");   
          var validation = [this.testWithFormat(format), name, message];
          validations.push(validation);
        }
        return validations;
      },
      require_length_validation_of: function(params_array, min, max, default_message){
        validations = this.validations;
        if(typeof(params_array) == "string"){
          var name = params_array;
          var message = this.get_message(default_message, name, "has not a valid length");    
          var validation = [this.defineValidSize(min, max), name, message];
          validations.push(validation);
        }else{
          for(var i = 0; i < params_array.length; i++){ 
            var name = params_array[i];
            var message = this.get_message(default_message, name, "has not a valid length");    
            var validation = [this.defineValidSize(min, max), name, message];
            validations.push(validation);
          }          
        }
        return validations;
      },
      require_validation: function(_function, _target, _message){
        validation = [_function, _target, _message]
        this.validations.push(validation);
      },
      get_validation_errors: function(params){
        validations = this.validations; 
        //console.log(validations);
        var errors = [];
        for(var i = 0; i < validations.length; i++){
          // loop through validations checking the params
          var validation = validations[i];
          var evaluator = validation[0];
          var evaluatee = validation[1];
          var value = params[evaluatee];
          if(!evaluator(value)){
            var message = validation[2];
            errors.push(message);
          }
        }
        return errors;
      }
    }
    return validatorObject;
  }
})
AbstractClass = {
	className: function(){
		return this.name;
	}, 
	name: "Class", 
	extend: function(params, inheritPropertyValues, extendingClass){
		if(params == null){ params = {} }
		if(inheritPropertyValues == null){
			inheritPropertyValues = false;
		}
		// console.log("extend::this = "); console.log(this);
		if(extendingClass==null){extendingClass = this;}
		if(extendingClass==Window){
			extendingClass = Class;
		}

		//var creator = this;
		var creator = extendingClass;
		// if some params management would be needed
		var newClass = {
			constructor: function(){return creator;}, 
			
			/*buble: function(fn, args){
				//console.log("asdf");
				console.log("buble fn & args"); console.log(fn); console.log(args);
				console.log("buble creator"); console.log(creator); 
				creator.handle(fn, args).call(creator);
			}, */

		}
		//console.log("extend::extendingClass = "); console.log(extendingClass);
		
		extendingClass.inherit(newClass, inheritPropertyValues)
		extendingClass.appendProperties(params, newClass);
		return newClass;
	}, 
	appendProperties: function(_properties, _class){
		var keys = Object.keys(_properties);
		for(var _i = 0; _i < keys.length ;_i++){
			_class[keys[_i]] = _properties[keys[_i]];
		}
	}, 
	handle: function(fc, args){
		var fn = this[fc];
		// console.log("handle::this, fn"); console.log(this); console.log(fn);
		if(args == null){
			return fn().call(this);
		}else if(args.length == 0){
			fn().call(this);
		}else if(args.length == 1 && fn.length == 1){
			fn(args).call(this);
		}else{
			//there should be a better way... but for now it works with up to 6 parameters
			///*
			if(typeof(args)=="string"){
				return fn(args).call(this);
			}else{
				var a = args[0]; var aa = args[1]; var b = args[2]; var bb = args[3]; var c = args[4]; var cc = args[5];
				return fn(a, aa, b, bb, c, cc).call(this);
			}
			//*/
			// this should work, but may is insecure and hackable... its still on the client side, so it messes up with his pc
			/*
			if(typeof(args)=="string"){
				return eval(fn(args))
			}else{
				var _len = args.length;
				var _lastIndex = _len - 1;
				var str = fn + "("
				for(var _i = 0; _i < _len; _i++ ){
					str += args[_i] 
					if(_i < _lastIndex){
						str += ","
					}
				}
				str += ")"
				return eval(str)
			}
			
			 */
			 // or this approach? 
			 //fn.call(args);
		}
	}, 
	ownProperties: function(object){
		if(object==null){
			object = this;
		}
		var fn = function(propName, propValue, fns){
			if(typeof(propValue)!="function"){
				fns[propName] = propValue;
			}
		}
		return this.loopHash(object, fn, true);
	}, 
	ownFunctions: function(object){
		if(object==null){
			object = this;
		}
		var fn = function(propName, propValue, fns){
			if(typeof(propValue)=="function"){
				fns[propName] = propValue;
			}
		}
		return this.loopHash(object, fn, true);
	}, 
	inherit: function(newClass, withValues){
		var f = function(values, f){ 
			return function(propName, propValue, fns){
				if(values){
					newClass[propName] = propValue;
				}else{
					if(f){ //if function buble it to the parent
						//var val = String(propName);
						//newClass[propName] = function(){
						//    console.log(arguments)
						    //args = arguments.slice(1)
							//console.log(arguments)
						//	this.super(val, arguments)
							//this.super(propName, args)
						//}
						newClass[propName] = function(){
							//console.log(arguments); console.log(this); console.log(propName); 
							this.buble(propName, arguments, this.constructor);
						};	
					}else{ // else set property value to null
						newClass[propName] = null;	
					}
					
				}
			}
		}
		//this.loopHash(this.ownFunctions(), f(null, true))
		this.loopHash(this.ownFunctions(), f(true))  //copy functions of parent
		this.loopHash(this.ownProperties(), f(withValues))
	}, 
	loopHash: function loopHash(hash, fn,retFns){
		var keys = Object.keys(hash);		
		var fns = {};
		for(var _i = 0; _i < keys.length ; _i++){
			propName  = keys[_i]
			propValue = hash[propName]
			fn(propName, propValue, fns);					
		}
		if(retFns){
			return fns;
		}
	}, 
	log: function log(str){
		console.log(str);
	}
    
}
//var Handlebars = Handlebars || this.Handlebars || or load!

// create bindings 
function makeBindings(options) {
  var hash = options.hash,
      hashType = options.hashTypes;

  for (var prop in hash) {
    if (hashType[prop] === 'ID') {
      hash[prop + 'Binding'] = hash[prop];
      hashType[prop + 'Binding'] = 'STRING';
      delete hash[prop];
      delete hashType[prop];
    }
  }
}



function detectValue(obj){ 
  if (typeof(obj) !== 'function'){ 
  	return false; 
  }
  while(obj) {
  	// this = window?...
    if (obj===this) { return true; }
    obj = obj.superclass;
  }
  return false;
}
Handlebars.helper = function(name, value) {
  if (detectValue(value)) {
  	if(name.match(/-/)){
		Console.log("You tried to register a component named '" + name + "', but component names must include a '-'");
	}
    var proto = value.proto();
    if (!proto.layoutName && !proto.templateName) {
      value.reopen({
        layoutName: 'components/' + name
      });
    }
  }

  if (detectValue(value)) {
    Handlebars.registerHelper(name, function(options) {
      if(arguments.length < 2){
      	Console.log("You can only pass attributes (such as name=value) not bare values to a helper for a View");	
      }
      makeBindings(options);
      return Handlebars.helpers.view.call(this, value, options);
    });
  } else {
    Handlebars.registerBoundHelper.apply(null, arguments);
  }
};

var objectCreate = Object.create || function(parent) {
  function F() {}
  F.prototype = parent;
  return new F();
};
Handlebars.helpers = objectCreate(Handlebars.helpers);

Handlebars.Compiler = function() {};

if (Handlebars.Compiler) {
  Handlebars.Compiler.prototype = objectCreate(Handlebars.Compiler.prototype);
}
Handlebars.Compiler.prototype.compiler = Handlebars.Compiler;

Handlebars.JavaScriptCompiler = function() {};

// Handlebars.JavaScriptCompiler doesn't exist in runtime-only
if (Handlebars.JavaScriptCompiler) {
  Handlebars.JavaScriptCompiler.prototype = objectCreate(Handlebars.JavaScriptCompiler.prototype);
  Handlebars.JavaScriptCompiler.prototype.compiler = Handlebars.JavaScriptCompiler;
}
Handlebars.JavaScriptCompiler.prototype.namespace = "Handlebars";

Handlebars.JavaScriptCompiler.prototype.initializeBuffer = function() {
  return "''";
};

Handlebars.JavaScriptCompiler.prototype.appendToBuffer = function(string) {
  return "data.buffer.push("+string+");";
};

var prefix = "" + (+new Date()), incr = 1;





















Handlebars.Compiler.prototype.mustache = function(mustache) {
  if (mustache.isHelper && mustache.id.string === 'control') {
    mustache.hash = mustache.hash || new Handlebars.AST.HashNode([]);
    mustache.hash.pairs.push(["controlID", new Handlebars.AST.StringNode(prefix + incr++)]);
  } else if (mustache.params.length || mustache.hash) {
    // no changes required
  } else {
    var id = new Handlebars.AST.IdNode([{ part: '_triageMustache' }]);

    // Update the mustache node to include a hash value indicating whether the original node
    // was escaped. This will allow us to properly escape values when the underlying value
    // changes and we need to re-render the value.
    if (!mustache.escaped) {
      mustache.hash = mustache.hash || new Handlebars.AST.HashNode([]);
      mustache.hash.pairs.push(["unescaped", new Handlebars.AST.StringNode("true")]);
    }
    mustache = new Handlebars.AST.MustacheNode([id].concat([mustache.id]), mustache.hash, !mustache.escaped);
  }

  return Handlebars.Compiler.prototype.mustache.call(this, mustache);
};

Handlebars.precompile = function(string) {
  var ast = Handlebars.parse(string);

  var options = {
    knownHelpers: {
      action: true,
      unbound: true,
      bindAttr: true,
      template: true,
      view: true,
      _triageMustache: true
    },
    data: true,
    stringParams: true
  };

  var environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
};

/*
// We don't support this for Handlebars runtime-only
if (Handlebars.compile) {
  /**
    The entry point for Ember Handlebars. This replaces the default
    `Handlebars.compile` and turns on template-local data and String
    parameters.

    @method compile
    @for Ember.Handlebars
    @static
    @param {String} string The template to compile
    @return {Function}
  // * /
  Handlebars.compile = function(string) {
    var ast = Handlebars.parse(string);
    var options = { data: true, stringParams: true };
    var environment = new Handlebars.Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);

    return Handlebars.template(templateSpec);
  };
}
*/
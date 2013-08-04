if(Handlebars.TEMPLATES == null){
	Handlebars.TEMPLATES = {};	
} 
Handlebars.TEMPLATES["second"] = makeTemplate( ""+ 
"<div class=second>" + 
	"{{first}} {{second}} {{third}}" + 
"</div>"
);
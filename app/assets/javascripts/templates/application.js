if(Handlebars.TEMPLATES == null){
	Handlebars.TEMPLATES = {};	
} 
Handlebars.TEMPLATES["application"] = makeTemplate( ""+ 
"<div class={{className}}>" + 
	"{{content}}" + 
	"<div id='container'>" +
		"yield" +  
		"{{ yield }}" +
	"</div>" +
	"partial" +
	"{{partial 'controller_body_path' }}" +
"</div>"
);


//Handlebars.TEMPLATES["application"] = makeTemplate($(this).text().split("EOF")[1]);
/* 
EOF
<div class={{className}}>
	{{content}}
	<div id='container'>
		Container div" 
	</div>
</div>
);
EOF*/

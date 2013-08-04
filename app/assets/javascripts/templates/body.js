if(Handlebars.TEMPLATES == null){
	Handlebars.TEMPLATES = {};	
} 

Handlebars.TEMPLATES["body"] = makeTemplate(
"<div class='body'>" +
	"{{className}}" +
	"<div class='container'>" +
		"{{content}}" + 
	"</div>" + 
"</div>"
);

//Handlebars.TEMPLATES["body"] = makeTemplate($(this).text().split("EOF"));
/* 
EOF
<div class="body">
	{{className}}
	
	<div class='container'>
		{{content}}
	</div>
</div>
);
EOF*/
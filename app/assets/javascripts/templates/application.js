if(Handlebars.TEMPLATES == null){
	Handlebars.TEMPLATES = {};	
} 
Handlebars.TEMPLATES["application"] = makeTemplate( ""+ 
"<header class='navbar'> " + 
	"<section class='title brand'>" +
			"{{{ linkTo 'Portrait JS' '/' 'class=navbar-brand brand-title' }}}" + 
			"<nav class='nav-collapse collapse navbar-responsive-collapse'>" + 
	"</section>" +
"</header>" + 
"<div class='{{className}} content main-content' >" + 
	"{{content}}" + 
	"<div id='container row'>" +
		"yield" +  
		"{{{ yield }}}" +
	"</div>" +
	"<div class='row'>" +
		"partial" +
	"{{{ partial 'controller_body_path' }}}" +
	"</div>" +
	"<div class='link row'>" +
		"{{{ linkTo 'Click here' '/second' }}}" + 
	"</div>" +
	"<div class='row'></div>" + 
	"<div class='row'>" + 
		"<button {{{trigger 'controller' 'create'}}}> Button </button>" +
	"</div>" +
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

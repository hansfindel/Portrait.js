// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require ../../../vendor/assets/javascripts/handlebars
//= require_tree ../../../vendor/assets/javascripts/
//= require ./frontis/framework/abstractClass
//= require ./frontis/framework/validator
//= require ./frontis/framework/abstractRenderer
//= require ./frontis/framework/renderer
//= require_tree ./frontis/framework
//= require turbolinks
//= require_tree ./frontis/.
//= require_tree .

$(document).ready(function(){
	Controller.actions.application.makeSuper();
	Controller.actions.application.render();	
})

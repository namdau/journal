(function() {
	"use strict";

	var menu = document.getElementById('toggle');
	var body = document.getElementsByTagName('body')[0];

	menu.addEventListener('click', function() {
		this.classList.toggle('open');
		body.classList.toggle('nav-opened');
	}, false);
})();
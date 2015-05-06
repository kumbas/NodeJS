var phrases = require('./en');

function Planet(name) {
	this.name = name;
}

Planet.prototype.hello = function(who) {
	console.log(phrases.Hello + ", " + who.name);
}

exports.Planet = Planet;
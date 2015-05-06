var planet = require('./src/planet');

var saturn = new planet.Planet('Saturn');
var jupiter = new planet.Planet('Jupiter');

saturn.hello(jupiter);
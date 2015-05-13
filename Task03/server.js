'use strict'

var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	fileHandler = require('file-handler'),
	server = new http.Server(),
	port = 3000,
	pathUrl = 'localhost',
	actUrl = '/action',
	method,
	fileName;

server.listen(port, pathUrl);

server.on('request', function(req, res) {
	var parsedUrl = url.parse(req.url, true);
	switch (parsedUrl.pathname) {
		case actUrl:
			method = parsedUrl.query.method;
			fileName  = parsedUrl.query.filename;
			fileHandler.handleAction(method, fileName);
			res.end('Done!');
			break;

		case '/':
			var a = fileAction('index', './');
			res.end('Horay!!!');

		default:
			res.end('404 Page no found! :-/');
			break;
	}
			
});
'use strict'

const fs = require('fs'),
	fileName = process.argv[2],
	method = process.argv[3],
	spawn = require('child_process').spawn;

var getCurrentDate = function(date) {
	var day = date.getDate(),
	year = date.getFullYear(),
	month = date.getMonth();

	return day + '-' + month + '-' + year;
}

var date = new Date;
var currentDate = getCurrentDate(date);
	
fs.watch(fileName, function() {
	if (method == 'Copy') {		
		fs.createReadStream(fileName).pipe(fs.createWriteStream(currentDate + '-' + fileName));
		console.log('File copyed');		
	} else if (method == 'Del') {
		let del = spawn('cmd', [
			'/S',
			'/C',
			'del',
			fileName
		]);
		del.stdout.pipe(process.stdout);
		console.log('File deleted');
	}
})

console.log('Start watching ' + fileName);
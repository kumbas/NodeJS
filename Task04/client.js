//Set params and required modules.
const http = require('http'),
    fs = require('fs'),
    Q = require('q');

var fileName = process.argv[2];

//Send file to server
var sendFile = function () {
    var req = http.request({
        hostname: 'localhost',
        port: 3000,
        method: 'POST',
        path: '/gzip'
    });

    var def = Q.defer();
    var file = new fs.ReadStream('files\\' + fileName);
    file.pipe(req);
    file.on('close', function () {
        def.resolve('close')
        req.end();
    });

    return def.promise
}

//Get file from server
var getFile = function() {
    var req = http.request({
        hostname: 'localhost',
        port: 3000,
        method: 'GET',
        path: '/gunzip'
    }, function (res) {
        var writableSteam = fs.createWriteStream('files\\' + fileName);
        res.pipe(writableSteam);
    });
    
    req.end();
}

sendFile().then(getFile);
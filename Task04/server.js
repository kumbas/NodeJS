//Set server params and required modules.
const http = require('http'),
    zlib = require('zlib'),
    fs = require('fs'),
    url = require('url'),
    options = {
        port: 3000,
        urlPath: 'localhost'
	};

// Starting server
http.createServer(function(req, res) {
    var path = url.parse(req.url, true);
    var fileName = 'test.txt.gz';
    
    switch (path.pathname) {
        case '/gzip':
            var gzip = zlib.createGzip();
            var compressed = '';
            req.on('data', function (chunk) {
                compressed += chunk;
            });

            var writable = fs.createWriteStream('files\\' + fileName);
            req.pipe(gzip).pipe(writable);
            req.on('end', function () {
                console.log('File packed');
                res.end();
            });

            break;

        case '/gunzip':
            var gunzip = zlib.createGunzip();
            var uncompressed = new fs.ReadStream('files\\' + fileName);
            uncompressed.pipe(gunzip).pipe(res);
            uncompressed.on('close', function () {
                console.log('File unpacked')
                res.end();
            });
    }

}).listen(options.port, options.urlPath);	

console.log('Server is running on ' + options.port + ' port');
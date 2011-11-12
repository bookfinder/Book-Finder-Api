var http = require('http'),
    url     = require('url'),
    querystring = require('querystring'),
    path    = require('path'),
    fs      = require('fs'),
    mime    = require('mime'),
    io      = require('socket.io'),
    mongoose = require('mongoose'),
    //Api     = require('./api.js'),
    //config  = require('./config.js');

var server = http.createServer(function(req, res){
    var u = url.parse(req.url);
    if(u.pathname == '/')
        u.pathname = '/index.html';
    var f = path.join(__dirname, 'public', u.pathname);
    path.exists(f, function(exists){
    if(exists)
    {
        // serve static file
        res.writeHead(200, {'Content-Type': mime.lookup(f)});
        var file = fs.createReadStream(f);
        file.pipe(res);
    }
    else
    {
        // callback
        var callback = function(err, data, code){
            if(typeof code != 'number')
                code = (err)?500:200;
            res.writeHead(code, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        };
        // serve api call
        var s = u.pathname.substr(1, u.length - 1).split('/');
        if(s.length < 2)
            return callback(true, {}, 400);
        var name = s[0]+'.'+s[1];
        api.callMethod(name, {}, callback);
    }
});


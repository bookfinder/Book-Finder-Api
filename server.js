var http = require('http'),
    url     = require('url'),
    querystring = require('querystring'),
    path    = require('path'),
    fs      = require('fs'),
    mime    = require('mime'),
    finder  = require('./finder.js'),
    Search  = require('./search.js');

var api = new finder(Search);
var connectors = fs.readdirSync(path.join(__dirname, 'connectors'));
var connector, i;
for(i in connectors)
{
    connector = require(connectors[i]);
    if(typeof connector != 'undefined')
    {
        api.addConnector(connector);
    }
}

var server = http.createServer(function(req, res){
    var u = url.parse(req.url);
    if(u.pathname.substr(0, 4) == '/api')
    {
        var err400 = function()
        {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({err: true, msg: 'Bad request format'}));
        };
        // serve api call
        if(!u.query) return err400();
        var query = querystring.parse(u.query);
        if(u.pathname.substr(4, 6) == 'search')
        {
            if(!query.s) return err400();
            var oSearch = new Search(s);
            api.search(oSearch, function(err)
            {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({err: false, books: oSearch.list()));
            });
        }
        else if(u.pathname.substr(4, 3) == 'get')
        {
            if(typeof query.isbn == 'undefined')
                return err400();
            api.get(query.isbn, function(err, book){
                    if(err)
                    {
                        res.writeHead(404, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({err: true, msg: "Can't find book!"}));
                    }
                    else
                    {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({err: false, book: book}));
                    }
                });
        }
    }
    
    if(u.pathname == '/')
        u.pathname = '/index.html';
    var file, f = path.join(__dirname, 'public', u.pathname);
    path.exists(f, function(exists){
        if(exists)
        {
            // serve static file
            res.writeHead(200, {'Content-Type': mime.lookup(f)});
            file = fs.createReadStream(f);
            file.pipe(res);
        }
        else
        {
            res.writeHead(404, {'Content-Type': 'text/html'});
            file = fs.createReadStream(path.join(__dirname, 'public/404.html'));
            file.pipe(res);
        }
    });
});


var http    = require('http'),
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
    //console.log(path.join(__dirname, 'connectors', connectors[i]));
    connector = require(path.join(__dirname, 'connectors', connectors[i]));
    if(typeof connector != 'undefined')
    {
        api.addConnector(connector);
    }
}

var jsonType = 'application/json';

var server = http.createServer(function(req, res){
    var u = url.parse(req.url);
    console.log('>>> Request on '+u.pathname);
    if(u.pathname.substr(0, 4) == '/api')
    {
        console.log(u);
        var err400 = function()
        {
            res.writeHead(400, {'Content-Type': jsonType});
            res.end(JSON.stringify({success: false, msg: 'Bad request format'}));
        };
        // serve api call
        if(typeof u.query == 'undefined') return err400();
        var query = querystring.parse(u.query);
        console.log(u.pathname.substr(4, 6));
        if(u.pathname.substr(5, 6) == 'search')
        {
            console.log(">> Search!");
            if(typeof query.s == 'undefined') return err400();
            var oSearch = new Search(query.s);
            return api.search(oSearch, function(err)
            {
                var list = oSearch.list();
                res.writeHead(200, {'Content-Type': jsonType});
                var ret = JSON.stringify({success: true, total: list.length, results: list});
                console.log(ret);
                res.end(ret);
            });
        }
        else if(u.pathname.substr(5, 3) == 'get')
        {
            if(typeof query.isbn == 'undefined')
                return err400();
            return api.get(query.isbn, function(err, book){
                    if(err)
                    {
                        res.writeHead(404, {'Content-Type': jsonType});
                        res.end(JSON.stringify({success: false, msg: "Can't find book!"}));
                    }
                    else
                    {
                        res.writeHead(200, {'Content-Type': jsonType});
                        res.end(JSON.stringify({success: true, book: book}));
                    }
                });
        }
        else
        {
            return err400();
        }
    }
    console.log(">> Not an API call!");
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
}).listen(process.env.PORT);


setTimeout(function(){ process.exit(); }, 600000);

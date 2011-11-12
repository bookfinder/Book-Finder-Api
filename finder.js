
var finder = function(Search){
    this.Search = Search;
    this.books = {};
    this.connectors = [];
};

finder.prototype = {
    search: function(s, callback){
            var i;
            for(i in this.connectors)
            {
                this.connectors[i].search(s);
            }
        },
    
    getList: function(isbns){
            
        },
        
    get: function(isbn, callback){
            
        },
        
    addBook: function(book){
        
    },
    addConnector: function(connector){
        if(typeof connector == 'function')
        {
            var oConnect = new connector(this, finder.Book);
            this.connectors.push(oConnect);
            console.log(oConnect.name);
        }
    }
    
};


finder.Book = function(isbn, title)
{
    this.isbn = isbn;
    this.title = title;
    this.locations = [];
};

finder.Connector = function(){
    };

finder.Connector.prototype = {
    search: function(s)
    {
        
    }
};

module.exports = finder;







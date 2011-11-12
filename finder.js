
var finder = function(Search){
    this.Search = Search;
    this.books = {};
    this.connectors = [];
};

finder.prototype = {
    search: function(s, callback){
            
        },
    
    getList: function(isbns){
            
        },
        
    get: function(isbn, callback){
            
        },
        
    addBook: function(book){
        
    },
    addConnector: function(connector){
        this.connectors.push(new connector());
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








var finder = function(Search){
    this.Search = Search;
    this.books = {};
    this.connectors = [];
};

finder.prototype = {
    search: function(s, callback){
            var i;
            s.callback(this.connectors.length, callback);
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
        if(typeof this.books[book.isbn] != 'Book')
        {
            this.books[book.isbn] = book;
        }
        else
        {
            var i;
            for(i in book)
            {
                if(i == 'locations')
                {
                    this.books[book.isbn][i] = this.books[book.isbn][i].concat(book[i]);
                }
                else if(typeof this.books[book.isbn][i] == 'undefined')
                    this.books[book.isbn][i] = book[i];
            }
        }
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







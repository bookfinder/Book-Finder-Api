var Search = function(s)
{
    this.s = s;
    this.books = [];
};

Search.prototype = {
    addBook: function(book)
    {
        this.books.push(book);
    },
    list: function()
    {
        return this.books;
    },
    callback: function(n, callback)
    {
        this.callback = callback;
        this.nbConnector = n;
    },
    end: function()
    {
        this.nbConnector--;
        console.log('Search complete ? '+this.nbConnector);
        if(this.nbConnector == 0)
            this.callback();
    }
    
};

module.exports = Search;

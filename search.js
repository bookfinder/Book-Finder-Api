var Search = function(s)
{
    this.books = {};
};

Search.prototype = {
    addBook: function(book)
    {
        
    },
    list: function()
    {
        return this.books;
    }
};

module.exports = Search;

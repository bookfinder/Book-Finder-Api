var Lambda = function(api, Book)
{
    this.name = 'Lambda';
    this.api = api;
    this.Book = Book;
};

Lambda.prototype = {
    search: function(search)
    {
        // query == search.s
        var book = new this.Book('9782070612369', "Harry Potter a L'ecole des sorciers");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "2007";
        book.locations = [
                {name: 'Amazon', price: 5.50, distance: 5.7}
            ];
        
        api.addBook(book);
        search.addBook(book);
        search.end();
    }
};

module.exports = Lambda;

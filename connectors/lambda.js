var Lambda = function(api, Book)
{
    this.name = 'Lambda';
    this.api = api;
    this.Book = Book;
};

Lambda.prototype = {
    search: function(search)
    {
        console.log(search);
        // query == search.s
        var book;
        // book fake
        book = new this.Book('9782070612369', "Harry Potter a L'ecole des sorciers");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "1997";
        book.locations = [
                {name: 'Saint-Albert', price: 24.95, distance: 4.3}
            ];
        
        this.api.addBook(book);
        search.addBook(book);
        
        // book fake
        book = new this.Book('9782070612376', "Harry Potter et la chambre des secrets");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "1998";
        book.locations = [
                {name: 'Saint-Albert', price: 24.95, distance: 4.3}
            ];
        
        this.api.addBook(book);
        search.addBook(book);
        
        // book fake
        book = new this.Book('9782070541300', "Harry Potter et le Prisonnier d'Azkaban");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "1999";
        book.locations = [
                {name: 'Saint-Albert', price: 24.95, distance: 4.3}
            ];
        
        this.api.addBook(book);
        search.addBook(book);
        
        // book fake
        book = new this.Book('9782070543588', "Harry Potter et la Coupe de feu");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "2000";
        book.locations = [
                {name: 'Saint-Albert', price: 24.95, distance: 4.3}
            ];
        
        this.api.addBook(book);
        search.addBook(book);
        
        // book fake
        book = new this.Book('9782070556854', "Harry Potter et l'Ordre du phénix");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "2003";
        book.locations = [
                {name: 'Saint-Albert', price: 24.95, distance: 4.3}
            ];
        
        this.api.addBook(book);
        search.addBook(book);
        search.end();
    }
};

module.exports = Lambda;

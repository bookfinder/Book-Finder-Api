var OperationHelper = require('apac').OperationHelper,
    util = require('util');

var opHelper = new OperationHelper({
    awsId:     'AKIAJTG5ZGYFNR7GNQUA',
    awsSecret: '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',
    assocId:   'bookfinde-20'
});
var Amazon = function(api, Book)
{
    this.name = 'Amazon';
    this.api = api;
    this.Book = Book;
};

Amazon.prototype = {
    search: function(search)
    {
        opHelper.execute('ItemSearch', {
            'SearchIndex': 'Books',
            'Keywords': search.s,
            'ResponseGroup': 'ItemAttributes,Offers'
        }, function(error, results) {
            if (error) { console.log('Erro : '+error); }
            else
                console.log(results.Items.Item);
        });
        /*
        // query == search.s
        var book = new this.Book('9782070612369', "Harry Potter a L'ecole des sorciers");
        book.author = "JOANNE KATHLEEN ROWLING";
        book.year = "2007";
        book.locations = [
                {name: 'Amazon', price: 5.50, distance: 5.7}
            ];
        
        this.api.addBook(book);
        search.addBook(book);*/
        search.end();
    }
};

module.exports = Amazon;

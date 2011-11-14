var pg = require('pg');

var Postgres = function(api, Book)
{
  this.name = 'Postgres';
  this.api = api;
  this.Book = Book;
};

Postgres.prototype = {
  search: function(search)
  {
    var self = this;
    
    var conString = "tcp://postgres:postgres@localhost/bookfinder";

    //error handling omitted
    pg.connect(conString, function(err, client) {
      
      var sql = "SELECT * FROM documents WHERE title like '%toto%' OR subject like '%toto%'";
      
      client.query(sql, function(err, result) {
        console.log("Row count: %d",result.rows.length);
        
        for(var i=0; i < result.rows.length ; i++){
          var book = new self.Book(result.rows[0].isbn, result.rows[0].title);
          book.year = result.rows[0].years;
          book.author = "UN AUTEUR"; //TODO
          book.locations = [
          {
            name: 'St-Albert',
            price: 0,
            distance: 5.7
          }
          ];
          
          self.api.addBook(book);
          search.addBook(book);
        }
      });
    });
    search.end();
  }
};

//module.exports = Postgres;

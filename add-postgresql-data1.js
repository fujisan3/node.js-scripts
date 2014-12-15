var pg = require('pg');
var async = require('async');

var connectString = "tcp://postgres@localhost:5432/test_db";

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

/*
Data Format
---------------
CREATE TABLE t_dummy
(
    id character varying(100), 
    age integer,
);

data
    id  : "user-"[1=>i]
    age : random[10-90]
---------------
*/

pg.connect(connectString, function(err, client) {
    if (err) {
        console.log('Connection Error:', err);
        throw err;
    } else {
        var counter = [];
        for (var i = 0; i < 1000; i++) {
          counter[i] = i;
        }
        async.eachSeries(counter, function(i, next) {
            var qs = "INSERT INTO  t_dummy (id, age) VALUES("
                        + "'" + "user-" + (i+1) + "', "
                        + randomInt(10, 90) + ");"
            console.log("qs=" + qs);

            client.query(qs, function(err, result) {
                if(err) {
                    console.log('Insert Error! :' + (i+1));
                    throw err;
                } else {
                };
            });
            console.log('Inserted : ' + (i+1));
            next();

        }, function(err) {
            console.log('Finished!');
            client.on('drain', client.end.bind(client));
        });
    }
});

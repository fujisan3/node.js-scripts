var couchbase = require('couchbase');
var crypto = require('crypto');
var async = require('async');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function md5String (src) {
    var md5hash = crypto.createHash('md5');
    md5hash.update(src, 'UTF8');
    return md5hash.digest('hex');
};

/*
Data Format
---------------
key = MD5 Hash from DocumentData
doc =
{
    "user" : "user-"[1=>i]
    "age" : random[10-90]
}
---------------
*/
var destinationString = 'localhost:8091';
var cluster = new couchbase.Cluster(destinationString);
var bucket = cluster.openBucket('default', function (err) {
    if (err) {
        console.log('Connection Error:', err);
        throw err;
    } else {
        var counter = [];
        for (var i = 0; i < 3; i++) {
          counter[i] = i;
        }
        async.eachSeries(counter, function(i, next) {

            doc = "{\n";
            doc = doc + "\"user\" : \"user-" + (i+1) + "\" , \n";
            doc = doc + "\"age\" : \"" + randomInt(10, 90) + "\"\n";
            doc = doc + "}\n";

            key = md5String(doc);
            console.log("key=" + key);
            console.log("doc=" + doc);

            bucket.upsert(key, doc, function(err, result) {
                if (err) {
                    console.log('Insert Error!' + (i+1));
                    throw err;
                } else {
                }
            });
            console.log('Inserted : ' + (i+1));
            next();
           
        }, function(err) {
            console.log('Finished!');
            bucket.disconnect();
        });
    }
});

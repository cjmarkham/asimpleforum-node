var redis = require('redis');
var client = redis.createClient();

exports.set = function (key, value) {
    client.set(key, value);
}

exports.get = function (key, setter, callback) {

    var data = client.get(key, function (error, data) {

        if (!data && typeof setter == 'function') {
            setter(function (data) {
                CacheService.set(key, data);

                return callback(data);
            });
        } else {
            return callback(data);
        }
    });
    
}
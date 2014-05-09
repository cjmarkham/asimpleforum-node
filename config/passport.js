var passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
    User.findOneById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
    
    User.findByUsername(username).exec(function (err, user) {
        if (err) {
            return done(null, err);
        }
        
        if (!user || user.length < 1) {
            return done(null, false, {
                message: 'Incorrect User'
            });
        }
        
        bcrypt.compare(password, user[0].password, function(err, res) {
            if (!res) {
                return done(null, false, {
                    message: 'Invalid Password'
                });
            }
            
            return done(null, user);
        });
    });
}));
const passport = require("passport"); // this is to perform authentication for user
const db = require("../../db");
const LocalStrategy = require("passport-local").Strategy;

// Passport setup
passport.use(
  new LocalStrategy((username, password, done) => {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(query, [username, password], (err, user) => {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect username or password" });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.get(query, [id], (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

module.exports = passport

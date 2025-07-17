const express = require('express')
const app = express()
const port = 3000

var session = require('express-session')
const MemoryStore = require('memorystore')(session)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
  }),
}))

var path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))

function authenticate(name, pass, fn) {
  console.log('authenticating %s:%s', name, pass);
  // var user = users[name];
  // query the db for the given username
  // if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  // hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
  //   if (err) return fn(err);
  //   if (hash === user.hash) return fn(null, user)
  //   fn(null, null)
  // });
  if (name === "testname" && pass === "testpass") return fn(null, name);
  // TODO: add login failed message
  return fn(null, null);
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', function(req, res){
  res.redirect('/login');
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', express.urlencoded({ extended: false }), function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.redirect('/restricted');
      });
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.get('/mtg', (req, res) => {
//   res.send('Here are simple rules for mtg')
// })

// app.get('/dandan', (req, res) => {
//   res.send('Here are the rules for dandan')
// })

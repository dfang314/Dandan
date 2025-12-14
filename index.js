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

const http = require('http');
const server = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo(server);

var path = require('path')

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
  res.sendFile(path.join(__dirname, 'views', 'game.html'));
});

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
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

// game code starts here
class Card {
    constructor(name, type, cost, onResolve, pow = -1, tou = -1) {
        this.name = name;
        this.pos = "deck"; // deck, stack, topHand, topField, bottomHand, bottomField
        this.type = type; // creature, instant, sorcery, land
        this.cost = cost; // only monocolor for now
        this.onResolve = onResolve;
        this.tapped = false;
        this.summoningSick = true;
        this.pow = pow;
        this.tou = tou;
    }
}

class Game {
    constructor() {
        this.players = 0;
        this.deck = [];
        this.stack = [];
        this.hand1 = [];
        this.field1 = [];
        this.hand2 = [];
        this.field2 = [];
        this.phase = "none"; // upkeep, main1, declareBlocks, damage, main2, end
        this.passes = 0; // when passes = 2 go to next phase
        this.turn = 1; // which player's turn it is
        this.priority = 1; // player with priority (1 or 2)
        this.landPlayed = false;
        
        // Constants
        this.TOTAL_CARDS = 60;
    }
    
    initDeck() {
        const colors = [];
        for (let i = 0; i < this.TOTAL_CARDS; i++) {
            const hue = (i * 360) / this.TOTAL_CARDS;
            const saturation = 70 + (i % 3) * 10;
            const lightness = 50 + (i % 4) * 10;
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }

        colors.forEach((color) => {
            const card = Card(color, "land", 0, function(this){});
            this.deck.unshift(card);
        });
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[i]];
        }
    }

    initializeGame() {
        this.initDeck();

        this.shuffle();
        
        for (let i = 0; i < 7; i++) {
            this.draw(true);
        }

        for (let i = 0; i < 7; i++) {
            this.draw(false);
        }
    }

    draw(playerNumber) {
        if (this.deck.length === 0) return;
        const card = this.deck.shift();

        // TODO: game loss on empty deck
        
        if (playerNumber === 1) {
            card.pos = "hand1";
            this.hand1.unshift(card);
        } else {
            card.pos = "hand2";
            this.hand2.unshift(card);
        }
        
        setTimeout(() => this.repositionAndUpdate(), 50);
    }
    getHandField(playerNumber) {
      let hand = null;
      let field = null;
      if(playerNumber === 1) {
        hand = this.hand1;
        field = this.field1;
      } else {
        hand = this.hand2;
        field = this.field2;
      }

      return hand, field;
    }

    getCard(cardName, hand) {
      for(let i = 0; i < hand.length; i++) {
          if(hand[i].name === cardName) {
            return hand[i];
          }
      }
      return null;
    }

    canPlay(cardName, playerNumber) {
        // TODO: validate if card can be played
        let hand, field = this.getHandField(playerNumber);
        let card = this.getCard(cardName, hand);

        // check if card is in player's hand
        if(card === null) {
          return false;
        }

        // check priority
        if(playerNumber != this.priority) {
          return false;
        }
        if(card.type != "instant") {
          if(this.phase != "main1" || this.phase != "main2" || this.stack.length > 0 || this.turn != playerNumber) {
            return false;
          }
        }

        // check if player has enough mana
        let manaAvailable = 0;

        for(let i = 0; i < field.length; i++) {
          if(field[i].type == "land" && !field[i].tapped) {
            manaAvailable++;
          }
        }

        if(manaAvailable < card.cost) {
          return false;
        }

        // land already played
        if(card.type === "land" && this.landPlayed) {
          return false;
        }

        // TODO: valid targets

        return true;
    }
    
    play(cardName, playerNumber) {
        // TODO: play the card
        if(!this.canPlay(cardName, playerNumber)) {
          return;
        }

        let hand, field = this.getHandField(playerNumber);
        let card = this.getCard(cardName, hand);
        
        if(card.type === "land") {
          // tODO: remove card from hand
          field.unshift(card);
        }

        

    }

    pass(playerNumber) {
      // TODO
    }

}

const gameRooms = new Map();

function findAvailableRoom() {
  for (let [roomId, game] of gameRooms) {
    if (game.players < 2) {
      return roomId;
    }
  }
  return null;
}

function createNewRoom() {
  const roomId = Math.random().toString(36).substring(2, 15);
  gameRooms.set(roomId, Game());
  return roomId;
}

function handlePlayerDisconnect() {
    // TODO
}

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  socket.on('join-game', () => {
    let roomId = findAvailableRoom();
    if (!roomId) {
      roomId = createNewRoom();
    }
    
    socket.join(roomId);
    socket.roomId = roomId; // Store room ID on socket
    
    const game = gameRooms.get(roomId);
    game.players++;
    
    // Assign player number
    const playerNumber = room.players.length;
    socket.playerNumber = playerNumber;
    
    socket.emit('player-assigned', { playerNumber, roomId });
    
    if (game.players === 2) {
      // Deal initial cards and start game
      game.initializeGame();
      io.to(roomId).emit('game-start', {
        gameState: room.gameState
      });
    }
  });

  // Handle game moves
  socket.on('play-card', (cardName) => {
    const roomId = socket.roomId;
    const game = gameRooms.get(roomId);
    
    if (game.canPlay(cardName, socket.playerNumber)) {
      game.play(cardName, socket.playerNumber);
      io.to(roomId).emit('valid-move');
    } else {
      io.to(roomId).emit('invalid-move');
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    handlePlayerDisconnect(socket.roomId, socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

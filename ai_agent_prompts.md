I want you to act as a software engineer. You have strong programming skills, and a lot of programming experience. However, you have never made a website. Now, you are tasked with making a website with the following features.
Feature 1: The website should have basic authentication. Users who are not logged in should not be able to access the website.
Feature 2: The website should host a 2-player game. You already have the code for the game itself.
Feature 3: Users should be able to participate in the 2-player game if there aren't already 2 players, or spectate an ongoing 2-player game being played by others.
Feature 4: The website should be able to detect if a player closes the website.
How would you approach this task? Let's think step by step.
---
Context: I am creating a website with Express.js. I have added basic authentication to the website to protect a restricted path. I am currently able to serve basic text to that restricted path using these lines of code:
app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

This is a step by step implemention approach of a full website for the game:

Step-by-Step Implementation Approach
Phase 1: Basic Web Server Setup

Set up Express server with basic routing
Create simple login/logout pages
Implement session-based authentication middleware
Test basic authentication flow

Phase 2: Game Integration

Integrate existing game code into the server
Create game state management (rooms, players, game instances)
Build basic game UI (HTML/CSS)
Test game logic without real-time features

Phase 3: Real-time Communication

Add Socket.io to handle connections
Implement game room joining/leaving logic
Add player vs spectator role management
Synchronize game state between clients

Phase 4: Connection Management

Handle disconnect detection using Socket.io events
Implement reconnection logic
Clean up abandoned games
Add player replacement or game pause features

Change the given code to no longer give a simple sentence. Instead, the restricted path should serve a basic game of 2 player tic tac toe.
---
Context: I am using some code to implement a simple tic tac toe game using express js. The current code works.

This is the current code:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style>
        .game-board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
        }
        .cell {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            cursor: pointer;
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>Tic Tac Toe</h1>
    <div class="game-board">
        <div class="cell" data-index="0"></div>
        <div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
    </div>
    <p id="turn">Current turn: X</p>
    <a href="/logout">Logout</a>

    <script>
        let currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        const turnDisplay = document.getElementById('turn');

        cells.forEach(cell => {
            cell.addEventListener('click', handleClick);
        });

        function handleClick(e) {
            const index = e.target.dataset.index;
            if (!e.target.textContent) {
                e.target.textContent = currentPlayer;
                if (!checkWin()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    turnDisplay.textContent = `Current turn: ${currentPlayer}`;
                }
            }
        }

        function checkWin() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const condition of winConditions) {
                const [a, b, c] = condition;
                if (
                    cells[a].textContent &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent
                ) {
                    turnDisplay.textContent = `Player ${cells[a].textContent} wins! 🎉`;
                    cells.forEach(cell => cell.removeEventListener('click', handleClick));
                    return true;
                }
            }
            return false;
        }
    </script>
</body>
</html>

I have created sprites for a blank square, a square with an X, and a square with an O, for this tic tac toe game. How would I modify this code to use those sprites? Explain each change.
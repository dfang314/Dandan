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
            width: 100px;
            background-size: contain;
            background-position: center;
            background-image: url('defaultimg.png');
            cursor: pointer;
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
            if (e.target.style.backgroundImage === '' || 
                e.target.style.backgroundImage.includes('defaultimg.png')) {
                
                // Set the appropriate sprite based on current player
                if (currentPlayer === 'X') {
                    e.target.style.backgroundImage = "url('xsquare.png')";
                } else {
                    e.target.style.backgroundImage = "url('osquare.png')";
                }
                
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
                const cellA = cells[a].style.backgroundImage;
                const cellB = cells[b].style.backgroundImage;
                const cellC = cells[c].style.backgroundImage;
                
                if (cellA && 
                    !cellA.includes('defaultimg.png') && 
                    cellA === cellB && 
                    cellA === cellC) {
                    
                    // Determine winner based on sprite
                    const winner = cellA.includes('xsquare.png') ? 'X' : 'O';
                    turnDisplay.textContent = `Player ${winner} wins! 🎉`;
                    cells.forEach(cell => cell.removeEventListener('click', handleClick));
                    return true;
                }
            }
            return false;
        }
    </script>
</body>
</html>

I would like to add a circle that the player can click on and drag around. When the tic tac toe game is over, the position of the circle will change the winning message. Instead of having 🎉, if the circle is on a square with an X, then the winning message should have 😌. If the circle is on a square with an O, the winning message should have 🎧. If the circle is on a blank square, the winning message should have 🥂. If the circle is not on the tic tac toe board, the winning message should have 😎.

Please change the given code to add this feature. Let's think step by step. Explain each step.
---
Context: I am making a tic tac toe game with html, css, and javascript. The current code works. There is a floating square that the user can use to modify the game logic slightly. Here is the current code:

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
            position: relative;
        }
        .cell {
            height: 100px;
            width: 100px;
            background-size: contain;
            background-position: center;
            background-image: url('defaultimg.png');
            cursor: pointer;
        }
        
        /* Step 2: Style the draggable circle */
        .draggable-circle {
            width: 40px;
            height: 40px;
            background-color: #ff6b6b;
            border-radius: 8px;
            position: absolute;
            cursor: move;
            z-index: 1000;
            border: 3px solid #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            top: 50px;
            left: 50px;
            user-select: none;
        }
        
        .draggable-circle:hover {
            background-color: #ff5252;
            transform: scale(1.1);
        }
        
        .draggable-circle.dragging {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
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
        
        <!-- Step 1: Add the draggable circle -->
        <div class="draggable-circle" id="draggableCircle"></div>
    </div>
    <p id="turn">Current turn: X</p>
    <p><em>Drag the red circle around - it will affect the winning message!</em></p>
    <a href="/logout">Logout</a>

    <script>
        let currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        const turnDisplay = document.getElementById('turn');
        
        // Step 3: Drag functionality variables
        const circle = document.getElementById('draggableCircle');
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        cells.forEach(cell => {
            cell.addEventListener('click', handleClick);
        });

        function handleClick(e) {
            const index = e.target.dataset.index;
            if (e.target.style.backgroundImage === '' || 
                e.target.style.backgroundImage.includes('defaultimg.png')) {
                
                // Set the appropriate sprite based on current player
                if (currentPlayer === 'X') {
                    e.target.style.backgroundImage = "url('xsquare.png')";
                } else {
                    e.target.style.backgroundImage = "url('osquare.png')";
                }
                
                if (!checkWin()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    turnDisplay.textContent = `Current turn: ${currentPlayer}`;
                }
            }
        }

        // Step 3: Implement drag functionality
        circle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        function startDrag(e) {
            isDragging = true;
            circle.classList.add('dragging');
            
            const rect = circle.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;
            
            const gameBoard = document.querySelector('.game-board');
            const boardRect = gameBoard.getBoundingClientRect();
            
            // Calculate position relative to the game board
            const x = e.clientX - boardRect.left - dragOffset.x;
            const y = e.clientY - boardRect.top - dragOffset.y;
            
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
        }

        function stopDrag() {
            isDragging = false;
            circle.classList.remove('dragging');
        }

        // Step 4: Add position detection function
        function getCirclePosition() {
            const circleRect = circle.getBoundingClientRect();
            const circleCenterX = circleRect.left + circleRect.width / 2;
            const circleCenterY = circleRect.top + circleRect.height / 2;
            
            // Check if circle is over any cell
            for (let i = 0; i < cells.length; i++) {
                const cellRect = cells[i].getBoundingClientRect();
                
                if (circleCenterX >= cellRect.left && 
                    circleCenterX <= cellRect.right &&
                    circleCenterY >= cellRect.top && 
                    circleCenterY <= cellRect.bottom) {
                    
                    // Determine what's in this cell
                    const cellBg = cells[i].style.backgroundImage;
                    if (cellBg.includes('xsquare.png')) {
                        return 'X';
                    } else if (cellBg.includes('osquare.png')) {
                        return 'O';
                    } else {
                        return 'blank';
                    }
                }
            }
            
            // Circle is not over the board
            return 'outside';
        }

        // Step 5: Modify the win check function
        function checkWin() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const condition of winConditions) {
                const [a, b, c] = condition;
                const cellA = cells[a].style.backgroundImage;
                const cellB = cells[b].style.backgroundImage;
                const cellC = cells[c].style.backgroundImage;
                
                if (cellA && 
                    !cellA.includes('defaultimg.png') && 
                    cellA === cellB && 
                    cellA === cellC) {
                    
                    // Determine winner based on sprite
                    const winner = cellA.includes('xsquare.png') ? 'X' : 'O';
                    
                    // Get circle position and choose appropriate emoji
                    const circlePos = getCirclePosition();
                    let emoji;
                    switch(circlePos) {
                        case 'X':
                            emoji = '😌';
                            break;
                        case 'O':
                            emoji = '🎧';
                            break;
                        case 'blank':
                            emoji = '🥂';
                            break;
                        case 'outside':
                            emoji = '😎';
                            break;
                        default:
                            emoji = '🎉';
                    }
                    
                    turnDisplay.textContent = `Player ${winner} wins! ${emoji}`;
                    cells.forEach(cell => cell.removeEventListener('click', handleClick));
                    return true;
                }
            }
            return false;
        }
    </script>
</body>
</html>

I would like to modify this code to accomplish two things. The first thing I want to accomplish is that I want the square to be a rectangle instead that is taller than it is wide. The second thing I want to accomplish is that I want the rectangle to be rotated at all times. The angle of rotation should be determined by where the rectangle is located. The closer to the left edge of the screen, the more rotated the rectangle should be counterclockwise, to a maximum of 20 degrees. The closer to the right edge of the screen, the more rotated the rectangle should be clockwise, to a maximum of 20 degrees. In the middle of the screen, the rectangle should be upright and not rotated at all.

How would I modify the current code to accomplish both of these changes? Let's think step by step. Explain each step.

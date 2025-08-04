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
---
Context: I have working code for a modified tic tac toe game. There is a rectangle that can be dragged and will change orientation based on its position on the screen. The code for this is here:

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
        
        .draggable-rectangle {
            width: 40px;
            height: 80px;
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
        
        .draggable-rectangle:hover {
            background-color: #ff5252;
            transform: scale(1.1);
        }
        
        .draggable-rectangle.dragging {
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
        
        <!-- Step 1: Add the draggable rect -->
        <div class="draggable-rectangle" id="draggableRectangle"></div>
    </div>
    <p id="turn">Current turn: X</p>
    <p><em>Drag the red rect around - it will affect the winning message!</em></p>
    <a href="/logout">Logout</a>

    <script>
        let currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        const turnDisplay = document.getElementById('turn');
        
        const rect = document.getElementById('draggableRectangle');
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
        rect.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        function startDrag(e) {
            isDragging = true;
            rect.classList.add('dragging');
            
            const rectRect = rect.getBoundingClientRect();
            dragOffset.x = e.clientX - rectRect.left;
            dragOffset.y = e.clientY - rectRect.top;
            
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;
            
            const gameBoard = document.querySelector('.game-board');
            const boardRect = gameBoard.getBoundingClientRect();
            
            // Calculate position relative to the game board
            const x = e.clientX - boardRect.left - dragOffset.x;
            const y = e.clientY - boardRect.top - dragOffset.y;
            
            // Move the rectangle
            rect.style.left = x + 'px';
            rect.style.top = y + 'px';

            // 🌟 Get screen width and position
            const screenWidth = window.innerWidth;
            const centerX = e.clientX;

            // Normalize centerX to range [-1, 1]
            const relativePosition = (centerX - screenWidth / 2) / (screenWidth / 2);
            
            // Clamp between -1 and 1
            const clamped = Math.max(-1, Math.min(1, relativePosition));

            // Calculate rotation angle (max 20 degrees)
            const angle = clamped * 20;

            // Apply rotation
            rect.style.transform = `rotate(${angle}deg)`;
        }

        function stopDrag() {
            isDragging = false;
            rect.classList.remove('dragging');
        }

        // Step 4: Add position detection function
        function getRectPosition() {
            const rectRect = rect.getBoundingClientRect();
            const rectCenterX = rectRect.left + rectRect.width / 2;
            const rectCenterY = rectRect.top + rectRect.height / 2;
            
            // Check if rect is over any cell
            for (let i = 0; i < cells.length; i++) {
                const cellRect = cells[i].getBoundingClientRect();
                
                if (rectCenterX >= cellRect.left && 
                    rectCenterX <= cellRect.right &&
                    rectCenterY >= cellRect.top && 
                    rectCenterY <= cellRect.bottom) {
                    
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
            
            // rect is not over the board
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
                    
                    let emoji = '😌';
                    
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

I want to modify this game so that there is a large button in the middle of the screen. Whenever the user presses this button, another rectangle with the same behaviour will appear. This way, the user can create a large amount of rectangles by pressing the button many times. Each rectangle should act independently. How would I change to code to add this feature? Let's think step by step. Explain each step clearly.
---
Context: I have working code for a tic tac toe game with rectangles on top. The code is:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        
        .game-board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
            position: relative;
            margin: 20px 0;
        }
        
        .cell {
            height: 100px;
            width: 100px;
            background-size: contain;
            background-position: center;
            background-image: url('defaultimg.png');
            cursor: pointer;
            border: 2px solid #ccc;
            background-color: #f9f9f9;
        }
        
        .draggable-rectangle {
            width: 40px;
            height: 80px;
            background-color: #ff6b6b;
            border-radius: 8px;
            position: absolute;
            cursor: move;
            z-index: 1000;
            border: 3px solid #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            user-select: none;
        }
        
        .draggable-rectangle:hover {
            background-color: #ff5252;
            transform: scale(1.1);
        }
        
        .draggable-rectangle.dragging {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        /* New button styles */
        .spawn-button {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            border: none;
            color: white;
            padding: 20px 40px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            cursor: pointer;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        .spawn-button:hover {
            background: linear-gradient(45deg, #45a049, #4CAF50);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        
        .spawn-button:active {
            transform: translateY(0px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .info-text {
            font-style: italic;
            color: #666;
            margin: 10px 0;
        }
        
        .rectangle-counter {
            background-color: #e0e0e0;
            padding: 10px 20px;
            border-radius: 20px;
            margin: 10px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Multi-Rectangle Tic Tac Toe</h1>
    
    <!-- New spawn button -->
    <button class="spawn-button" id="spawnButton">🔴 Spawn New Rectangle</button>
    
    <div class="rectangle-counter" id="rectangleCounter">Rectangles: 1</div>
    
    <div class="game-board" id="gameBoard">
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
    <p class="info-text">Drag the red rectangles around - they will rotate based on screen position!</p>
    <p class="info-text">Click the button above to spawn more rectangles!</p>

    <script>
        let currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        const turnDisplay = document.getElementById('turn');
        const gameBoard = document.getElementById('gameBoard');
        const spawnButton = document.getElementById('spawnButton');
        const rectangleCounter = document.getElementById('rectangleCounter');
        
        // Array to keep track of all rectangles
        let rectangles = [];
        let rectangleIdCounter = 0;

        // Game logic
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

        // Rectangle factory function
        function createRectangle() {
            const rectId = `rect_${rectangleIdCounter++}`;
            const rect = document.createElement('div');
            rect.className = 'draggable-rectangle';
            rect.id = rectId;
            
            // Random starting position within the game board area
            const randomX = Math.random() * 200 + 50;
            const randomY = Math.random() * 200 + 50;
            rect.style.left = randomX + 'px';
            rect.style.top = randomY + 'px';
            
            // Add to game board
            gameBoard.appendChild(rect);
            
            // Create rectangle object with drag state
            const rectangleObj = {
                element: rect,
                isDragging: false,
                dragOffset: { x: 0, y: 0 }
            };
            
            // Add event listeners for this specific rectangle
            rect.addEventListener('mousedown', (e) => startDrag(e, rectangleObj));
            
            // Add to rectangles array
            rectangles.push(rectangleObj);
            
            // Update counter
            updateRectangleCounter();
            
            return rectangleObj;
        }

        // Drag functionality for individual rectangles
        function startDrag(e, rectangleObj) {
            rectangleObj.isDragging = true;
            rectangleObj.element.classList.add('dragging');
            
            const rectRect = rectangleObj.element.getBoundingClientRect();
            rectangleObj.dragOffset.x = e.clientX - rectRect.left;
            rectangleObj.dragOffset.y = e.clientY - rectRect.top;
            
            e.preventDefault();
        }

        function drag(e) {
            rectangles.forEach(rectangleObj => {
                if (!rectangleObj.isDragging) return;
                
                const boardRect = gameBoard.getBoundingClientRect();
                
                // Calculate position relative to the game board
                const x = e.clientX - boardRect.left - rectangleObj.dragOffset.x;
                const y = e.clientY - boardRect.top - rectangleObj.dragOffset.y;
                
                // Move the rectangle
                rectangleObj.element.style.left = x + 'px';
                rectangleObj.element.style.top = y + 'px';

                // Get screen width and position for rotation
                const screenWidth = window.innerWidth;
                const centerX = e.clientX;

                // Normalize centerX to range [-1, 1]
                const relativePosition = (centerX - screenWidth / 2) / (screenWidth / 2);
                
                // Clamp between -1 and 1
                const clamped = Math.max(-1, Math.min(1, relativePosition));

                // Calculate rotation angle (max 20 degrees)
                const angle = clamped * 20;

                // Apply rotation
                rectangleObj.element.style.transform = `rotate(${angle}deg)`;
            });
        }

        function stopDrag() {
            rectangles.forEach(rectangleObj => {
                if (rectangleObj.isDragging) {
                    rectangleObj.isDragging = false;
                    rectangleObj.element.classList.remove('dragging');
                }
            });
        }

        // Global mouse event listeners
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        // Spawn button functionality
        spawnButton.addEventListener('click', () => {
            createRectangle();
            
            // Add a little visual feedback
            spawnButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                spawnButton.style.transform = '';
            }, 100);
        });

        // Update rectangle counter display
        function updateRectangleCounter() {
            rectangleCounter.textContent = `Rectangles: ${rectangles.length}`;
        }

        // Position detection function (updated for multiple rectangles)
        function getRectPosition(specificRect = null) {
            const rectsToCheck = specificRect ? [specificRect] : rectangles;
            
            for (const rectangleObj of rectsToCheck) {
                const rectRect = rectangleObj.element.getBoundingClientRect();
                const rectCenterX = rectRect.left + rectRect.width / 2;
                const rectCenterY = rectRect.top + rectRect.height / 2;
                
                // Check if rect is over any cell
                for (let i = 0; i < cells.length; i++) {
                    const cellRect = cells[i].getBoundingClientRect();
                    
                    if (rectCenterX >= cellRect.left && 
                        rectCenterX <= cellRect.right &&
                        rectCenterY >= cellRect.top && 
                        rectCenterY <= cellRect.bottom) {
                        
                        // Determine what's in this cell
                        const cellBg = cells[i].style.backgroundImage;
                        if (cellBg.includes('ff0000')) { // Red X
                            return 'X';
                        } else if (cellBg.includes('0000ff')) { // Blue O
                            return 'O';
                        } else {
                            return 'blank';
                        }
                    }
                }
            }
            
            return 'outside';
        }

        // Win check function
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
                    const winner = cellA.includes('ff0000') ? 'X' : 'O';
                    
                    let emoji = '😌';
                    
                    turnDisplay.textContent = `Player ${winner} wins! ${emoji}`;
                    cells.forEach(cell => cell.removeEventListener('click', handleClick));
                    return true;
                }
            }
            return false;
        }

        // Create the initial rectangle
        createRectangle();
    </script>
</body>
</html>

Remove the tic tac toe aspect of the game. Only retain the rectangle creation and behaviour. Let's think step by step. Explain each step.
---
Context: I have a working game that involves rectangles. These rectangles are all the same color. The game code is provided as such:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rectangle Playground</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f5f5f5;
            min-height: 100vh;
        }
        
        .playground-area {
            width: 80vw;
            height: 60vh;
            background-color: #fff;
            border: 3px solid #ddd;
            border-radius: 15px;
            position: relative;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .draggable-rectangle {
            width: 40px;
            height: 80px;
            background-color: #ff6b6b;
            border-radius: 8px;
            position: absolute;
            cursor: move;
            z-index: 1000;
            border: 3px solid #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            user-select: none;
            transition: transform 0.1s ease;
        }
        
        .draggable-rectangle:hover {
            background-color: #ff5252;
            transform: scale(1.1);
        }
        
        .draggable-rectangle.dragging {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        .spawn-button {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            border: none;
            color: white;
            padding: 20px 40px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            cursor: pointer;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        .spawn-button:hover {
            background: linear-gradient(45deg, #45a049, #4CAF50);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        
        .spawn-button:active {
            transform: translateY(0px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .info-text {
            font-style: italic;
            color: #666;
            margin: 10px 0;
            text-align: center;
        }
        
        .rectangle-counter {
            background-color: #e0e0e0;
            padding: 10px 20px;
            border-radius: 20px;
            margin: 10px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🔴 Interactive Rectangle Playground</h1>
    
    <button class="spawn-button" id="spawnButton">🔴 Spawn New Rectangle</button>
    
    <div class="rectangle-counter" id="rectangleCounter">Rectangles: 1</div>
    
    <div class="playground-area" id="playgroundArea"></div>
    
    <p class="info-text">Drag the red rectangles around - they will rotate based on screen position!</p>
    <p class="info-text">Click the button above to spawn more rectangles!</p>

    <script>
        const playgroundArea = document.getElementById('playgroundArea');
        const spawnButton = document.getElementById('spawnButton');
        const rectangleCounter = document.getElementById('rectangleCounter');
        
        // Array to keep track of all rectangles
        let rectangles = [];
        let rectangleIdCounter = 0;

        // Rectangle factory function
        function createRectangle() {
            const rectId = `rect_${rectangleIdCounter++}`;
            const rect = document.createElement('div');
            rect.className = 'draggable-rectangle';
            rect.id = rectId;
            
            // Random starting position within the playground area
            const playgroundRect = playgroundArea.getBoundingClientRect();
            const randomX = Math.random() * (playgroundRect.width - 60) + 10; // Account for rectangle width
            const randomY = Math.random() * (playgroundRect.height - 100) + 10; // Account for rectangle height
            rect.style.left = randomX + 'px';
            rect.style.top = randomY + 'px';
            
            // Add to playground area
            playgroundArea.appendChild(rect);
            
            // Create rectangle object with drag state
            const rectangleObj = {
                element: rect,
                isDragging: false,
                dragOffset: { x: 0, y: 0 }
            };
            
            // Add event listeners for this specific rectangle
            rect.addEventListener('mousedown', (e) => startDrag(e, rectangleObj));
            
            // Add to rectangles array
            rectangles.push(rectangleObj);
            
            // Update counter
            updateRectangleCounter();
            
            return rectangleObj;
        }

        // Drag functionality for individual rectangles
        function startDrag(e, rectangleObj) {
            rectangleObj.isDragging = true;
            rectangleObj.element.classList.add('dragging');
            
            const rectRect = rectangleObj.element.getBoundingClientRect();
            rectangleObj.dragOffset.x = e.clientX - rectRect.left;
            rectangleObj.dragOffset.y = e.clientY - rectRect.top;
            
            e.preventDefault();
        }

        function drag(e) {
            rectangles.forEach(rectangleObj => {
                if (!rectangleObj.isDragging) return;
                
                const playgroundRect = playgroundArea.getBoundingClientRect();
                
                // Calculate position relative to the playground area
                let x = e.clientX - playgroundRect.left - rectangleObj.dragOffset.x;
                let y = e.clientY - playgroundRect.top - rectangleObj.dragOffset.y;
                
                // Keep rectangle within playground bounds
                const rectWidth = 40;
                const rectHeight = 80;
                x = Math.max(0, Math.min(playgroundRect.width - rectWidth, x));
                y = Math.max(0, Math.min(playgroundRect.height - rectHeight, y));
                
                // Move the rectangle
                rectangleObj.element.style.left = x + 'px';
                rectangleObj.element.style.top = y + 'px';

                // Get screen width and position for rotation
                const screenWidth = window.innerWidth;
                const centerX = e.clientX;

                // Normalize centerX to range [-1, 1]
                const relativePosition = (centerX - screenWidth / 2) / (screenWidth / 2);
                
                // Clamp between -1 and 1
                const clamped = Math.max(-1, Math.min(1, relativePosition));

                // Calculate rotation angle (max 20 degrees)
                const angle = clamped * 20;

                // Apply rotation while maintaining scale
                const currentTransform = rectangleObj.element.classList.contains('dragging') ? 'scale(1.2)' : '';
                rectangleObj.element.style.transform = `${currentTransform} rotate(${angle}deg)`;
            });
        }

        function stopDrag() {
            rectangles.forEach(rectangleObj => {
                if (rectangleObj.isDragging) {
                    rectangleObj.isDragging = false;
                    rectangleObj.element.classList.remove('dragging');
                }
            });
        }

        // Global mouse event listeners
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        // Spawn button functionality
        spawnButton.addEventListener('click', () => {
            createRectangle();
            
            // Add a little visual feedback
            spawnButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                spawnButton.style.transform = '';
            }, 100);
        });

        // Update rectangle counter display
        function updateRectangleCounter() {
            rectangleCounter.textContent = `Rectangles: ${rectangles.length}`;
        }

        // Create the initial rectangle
        createRectangle();
    </script>
</body>
</html>

I want to make some big changes to this. Please make these changes. Let's think step by step. Explain each step. The changes are:
Change 1: Instead of creating rectangles, there will always be a fixed number of rectangles. This fixed number is 60.
Change 2: Each of these rectangles should have a unique color.
Change 3: At the start of the game, 7 rectangles at random are chosen to be near the bottom middle of the screen in a row. Similarly, 7 more rectangles are chosen at random to be near the top middle of the screen in a row. The rest of the rectangles should form a row across the middle of the screen.
Change 4: Even before any dragging, each rectangle should already be rotated based on its position on the screen.
---
Context: I have a working game with rectangles. In the game, there is currently a top row, bottom row, and middle row of rectangles. I want to modify the deck to be more like a card game, with the rectangles representing different cards.

The current working code is:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>60 Colorful Rectangles Playground</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
        }
        
        .playground-area {
            width: 90vw;
            height: 75vh;
            background: rgba(255, 255, 255, 0.95);
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            position: relative;
            margin: 20px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            overflow: hidden;
        }
        
        .draggable-rectangle {
            width: 35px;
            height: 70px;
            border-radius: 8px;
            position: absolute;
            cursor: move;
            z-index: 1000;
            border: 2px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            user-select: none;
            transform-origin: center center;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        
        .draggable-rectangle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 1);
            transition: all 0.1s ease;
        }
        
        .draggable-rectangle.dragging {
            transform: scale(1.1);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            z-index: 2000;
            border-color: rgba(255, 255, 255, 1);
        }
        
        .info-text {
            font-style: italic;
            color: rgba(255, 255, 255, 0.9);
            margin: 10px 0;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-size: 16px;
        }
        
        .title {
            color: white;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .rectangle-info {
            background: rgba(255, 255, 255, 0.2);
            padding: 15px 30px;
            border-radius: 25px;
            margin: 10px 0;
            font-weight: bold;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body>
    <h1 class="title">🌈 60 Colorful Rectangles Playground</h1>
    
    <div class="rectangle-info">60 Unique Colorful Rectangles</div>
    
    <div class="playground-area" id="playgroundArea"></div>
    
    <p class="info-text">Drag the colorful rectangles around - they rotate based on screen position!</p>
    <p class="info-text">Each rectangle has its own unique color from across the spectrum!</p>

    <script>
        const playgroundArea = document.getElementById('playgroundArea');
        
        // Array to keep track of all rectangles
        let rectangles = [];
        const TOTAL_RECTANGLES = 60;
        const TOP_ROW_COUNT = 7;
        const BOTTOM_ROW_COUNT = 7;
        
        let isDragging = false;
        let animationId = null;
        let currentMouseEvent = null;

        // Generate 60 unique colors using HSL color space
        function generateUniqueColors(count) {
            const colors = [];
            for (let i = 0; i < count; i++) {
                const hue = (i * 360) / count;
                const saturation = 70 + (i % 3) * 10;
                const lightness = 50 + (i % 4) * 10;
                colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
            }
            return colors;
        }

        // Calculate rotation based on screen position
        function calculateRotation(x) {
            const screenWidth = window.innerWidth;
            const relativePosition = (x - screenWidth / 2) / (screenWidth / 2);
            const clamped = Math.max(-1, Math.min(1, relativePosition));
            return clamped * 20;
        }

        // Rectangle factory function
        function createRectangle(color, x, y) {
            const rect = document.createElement('div');
            rect.className = 'draggable-rectangle';
            rect.style.backgroundColor = color;
            rect.style.left = x + 'px';
            rect.style.top = y + 'px';
            
            // Calculate initial rotation based on absolute screen position
            const playgroundRect = playgroundArea.getBoundingClientRect();
            const absoluteX = playgroundRect.left + x + 17.5;
            const rotation = calculateRotation(absoluteX);
            rect.style.transform = `rotate(${rotation}deg)`;
            
            playgroundArea.appendChild(rect);
            
            const rectangleObj = {
                element: rect,
                isDragging: false,
                dragOffset: { x: 0, y: 0 }
            };
            
            rect.addEventListener('mousedown', (e) => startDrag(e, rectangleObj));
            
            return rectangleObj;
        }

        // Initialize all 60 rectangles with strategic positioning
        function initializeRectangles() {
            const colors = generateUniqueColors(TOTAL_RECTANGLES);
            const playgroundRect = playgroundArea.getBoundingClientRect();
            const playgroundWidth = playgroundRect.width || playgroundArea.offsetWidth;
            const playgroundHeight = playgroundRect.height || playgroundArea.offsetHeight;
            
            const indices = Array.from({length: TOTAL_RECTANGLES}, (_, i) => i);
            
            // Fisher-Yates shuffle
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            
            const topRowIndices = indices.slice(0, TOP_ROW_COUNT);
            const bottomRowIndices = indices.slice(TOP_ROW_COUNT, TOP_ROW_COUNT + BOTTOM_ROW_COUNT);
            const middleRowIndices = indices.slice(TOP_ROW_COUNT + BOTTOM_ROW_COUNT);
            
            // Position rectangles in top row (centered)
            const topRowY = 30;
            const topRowSpacing = 80;
            const topRowTotalWidth = (TOP_ROW_COUNT - 1) * topRowSpacing;
            const topRowStartX = (playgroundWidth - topRowTotalWidth) / 2;
            
            topRowIndices.forEach((colorIndex, i) => {
                const x = topRowStartX + i * topRowSpacing - 17.5;
                const rectangle = createRectangle(colors[colorIndex], x, topRowY);
                rectangles.push(rectangle);
            });
            
            // Position rectangles in bottom row (centered)
            const bottomRowY = playgroundHeight - 100;
            const bottomRowSpacing = 80;
            const bottomRowTotalWidth = (BOTTOM_ROW_COUNT - 1) * bottomRowSpacing;
            const bottomRowStartX = (playgroundWidth - bottomRowTotalWidth) / 2;
            
            bottomRowIndices.forEach((colorIndex, i) => {
                const x = bottomRowStartX + i * bottomRowSpacing - 17.5;
                const rectangle = createRectangle(colors[colorIndex], x, bottomRowY);
                rectangles.push(rectangle);
            });
            
            // Position remaining rectangles in middle row
            const middleRowY = playgroundHeight / 2 - 35;
            const middleRowSpacing = Math.max(playgroundWidth / (middleRowIndices.length + 1), 45);
            const middleRowStartX = (playgroundWidth - (middleRowIndices.length - 1) * middleRowSpacing) / 2;
            
            middleRowIndices.forEach((colorIndex, i) => {
                const x = middleRowStartX + i * middleRowSpacing - 17.5;
                const rectangle = createRectangle(colors[colorIndex], x, middleRowY);
                rectangles.push(rectangle);
            });
        }

        // Optimized drag functions
        function startDrag(e, rectangleObj) {
            rectangleObj.isDragging = true;
            isDragging = true;
            rectangleObj.element.classList.add('dragging');
            
            const rectRect = rectangleObj.element.getBoundingClientRect();
            rectangleObj.dragOffset.x = e.clientX - rectRect.left;
            rectangleObj.dragOffset.y = e.clientY - rectRect.top;
            
            e.preventDefault();
        }

        function updatePositions() {
            if (!isDragging || !currentMouseEvent) return;
            
            const e = currentMouseEvent;
            const playgroundRect = playgroundArea.getBoundingClientRect();
            
            rectangles.forEach(rectangleObj => {
                if (!rectangleObj.isDragging) return;
                
                let x = e.clientX - playgroundRect.left - rectangleObj.dragOffset.x;
                let y = e.clientY - playgroundRect.top - rectangleObj.dragOffset.y;
                
                const rectWidth = 35;
                const rectHeight = 70;
                x = Math.max(0, Math.min(playgroundRect.width - rectWidth, x));
                y = Math.max(0, Math.min(playgroundRect.height - rectHeight, y));
                
                rectangleObj.element.style.left = x + 'px';
                rectangleObj.element.style.top = y + 'px';

                const rotation = calculateRotation(e.clientX);
                rectangleObj.element.style.transform = `scale(1.1) rotate(${rotation}deg)`;
            });
        }

        function drag(e) {
            if (!isDragging) return;
            currentMouseEvent = e;
            
            if (!animationId) {
                animationId = requestAnimationFrame(() => {
                    updatePositions();
                    animationId = null;
                });
            }
        }

        function stopDrag() {
            isDragging = false;
            currentMouseEvent = null;
            
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            
            rectangles.forEach(rectangleObj => {
                if (rectangleObj.isDragging) {
                    rectangleObj.isDragging = false;
                    rectangleObj.element.classList.remove('dragging');
                    
                    const currentTransform = rectangleObj.element.style.transform;
                    const rotationMatch = currentTransform.match(/rotate\(([^)]+)\)/);
                    if (rotationMatch) {
                        rectangleObj.element.style.transform = `rotate(${rotationMatch[1]})`;
                    }
                }
            });
        }

        // Event listeners
        document.addEventListener('mousemove', drag, { passive: false });
        document.addEventListener('mouseup', stopDrag);

        // Handle window resize
        window.addEventListener('resize', () => {
            rectangles.forEach(rectangleObj => {
                if (!rectangleObj.isDragging) {
                    const rectRect = rectangleObj.element.getBoundingClientRect();
                    const centerX = rectRect.left + rectRect.width / 2;
                    const rotation = calculateRotation(centerX);
                    rectangleObj.element.style.transform = `rotate(${rotation}deg)`;
                }
            });
        });

        // Initialize the game
        window.addEventListener('load', () => {
            setTimeout(initializeRectangles, 100);
        });
    </script>
</body>
</html>

I want you to modify this to be a card game. Here are the changes I want you to make.

Change 1: The game area should be divided into 7 rows. The top row of rectangles/cards should be in the top row, and the bottom row of rectangles/cards should be in the bottom row.

Change 2: The middle row of cards should be in the middle row. The cards should be stacked into a deck instead of a row. The order of the rectangles in the deck should not be visible. However, a button should be added that moves the top card of the deck to the top row. Another similar button should be added that moves the top card of the deck to the bottom row. These new buttons should be in the middle row.

Change 3: The top row should be rotated the opposite direction. Currently, cards on the right should are rotated clockwise, and cards on the left are rotate counterclockwise. Instead, in the top row, cards on the right should be rotated counterclockwise, and cards on the left should be rotated clockwise. The angle of rotation should not change.

Change 4: When a card is being dragged, it should not be rotated. Cards should only be rotated if they are in the top or bottom row and not being dragged.

Change 5: When a card is dragged from the bottom row or top row to the deck, it should put that card onto the top of the deck.

Implement these changes. Do the changes one by one. Let's think step by step. Explain each step.

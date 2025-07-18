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

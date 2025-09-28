## Inspiration

This project was inspired by close friends wanting interesting and new ways to play Magic: The Gathering. Dandan is one of the most well-known variants, and was introduced almost a decade ago here: https://docs.google.com/document/d/1nLLsrRfv6qRvri8zIHnxqUjOeUGS-o_izVicthyRzYM/edit?usp=sharing . However, due to its unique twists on the game, popular platforms such as MTGA, Untap.in, and Cockatrice do not support it. So, I thought that it would be a perfect opportunity to not only dive into web dev (which I have little experience in) and AI assistance (which I do not tend to use), but also create something fun and useful.

## What is this?

This is the code for a Dandan website server. The purpose of this project is not only to help me gain some experience and skills in web development, but also to learn how to efficiently use publicly available LLMs (Claude, ChatGPT, Meta AI, Perplexity) to code, debug, and test. See more about Dandan in public/dandan.html. See more about Magic: The Gathering in public/mtg.html.

## How does it work?

This project is built on Express.js. Express session is used to authenticate users. Socket.io is used to manage concurrent players and support multiplayer features.

---
These modules are required to run this code.

npm install express

npm install express-session

npm install express-session memorystore

npm install ejs

npm install socket.io

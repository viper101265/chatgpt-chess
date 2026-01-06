// server/index.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Placeholder AI endpoint
// TODO: Replace with OpenAI API call later
app.post('/ai-move', (req, res) => {
    // Example: AI spawns a black queen at e4
    const dummyAIMove = {
        type: "spawn",       // move | spawn | delete | capture
        piece: "q",          // q = queen, r = rook, b = bishop, n = knight, p = pawn, k = king
        to: "e4",            // square to apply the action
        color: "black"       // AI color
    };

    res.json(dummyAIMove);
});

// Fallback route for frontend (if you want to support SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Unfair Chess™ server running on port ${PORT} 🗿💀😭`);
});

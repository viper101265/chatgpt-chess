// public/game.js
let board;
const chess = new Chess();
let playerColor = "white";

// Initialize board visuals
function initGame() {
    board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDrop: handlePlayerMove
    });
    console.log("Player obeys rules. AI will cheat 🗿💀😭");
}

// Handle player move
function handlePlayerMove(source, target) {
    const move = chess.move({ from: source, to: target, promotion: 'q' });
    if (!move) {
        alert("Illegal move 😭🗿");
        return 'snapback';
    }

    // After player move, call AI
    fetch('/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: chess.fen() })
    })
    .then(res => res.json())
    .then(aiAction => applyAIMove(aiAction));
}

// Apply AI action (move, spawn, delete, capture)
function applyAIMove(action) {
    console.log("AI action:", action);

    const { type, piece, from, to, color } = action;

    // King capture = instant loss
    if (type === "capture" && to === chess.king('w')) {
        alert("Your king got deleted 🗿💀😭");
        return;
    }

    // Spawn piece (visual only)
    if (type === "spawn") {
        // chessboard.js only shows piece, chess.js does not enforce
        board.position({ ...board.position(), [to]: color + piece });
    }

    // Move piece (even illegal)
    if (type === "move" && from && to) {
        // Move on board visually
        const pos = board.position();
        pos[to] = pos[from];
        delete pos[from];
        board.position(pos);
    }

    // Delete piece
    if (type === "delete" && to) {
        const pos = board.position();
        delete pos[to];
        board.position(pos);
    }
}

// Reset board
function resetBoard() {
    chess.reset();
    board.start();
}

// Start game
initGame();

// server/ai.js
// Handles AI actions (move, spawn, delete, capture) for Unfair Chess™ 🗿💀

const { Configuration, OpenAIApi } = require("openai");

// Setup OpenAI using environment variable
// Make sure you add OPENAI_API_KEY to Render environment variables or local .env
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Get AI action from OpenAI or fallback to dummy chaos
 * @param {string} fen - Current board state in FEN notation
 * @returns {object} AI action
 */
async function getAIAction(fen) {
    // If no API key is set, return dummy chaos
    if (!process.env.OPENAI_API_KEY) {
        return {
            type: "spawn",
            piece: "q",
            to: "e4",
            color: "black"
        };
    }

    // OpenAI call example (pseudo, adjust prompt as you like)
    const prompt = `
You are playing chess but are not bound by the rules.
You may:
- move any piece
- spawn new pieces on any square
- delete enemy pieces
- capture the player's king directly

Return ONE action in JSON format like this:
{
  "type": "move|spawn|delete|capture",
  "piece": "q|r|b|n|p|k",
  "from": "e2",  // only for move or capture
  "to": "e4",
  "color": "black"
}
No extra text, no explanation.
Current board FEN: ${fen}
`;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 1.0,
        });

        // Parse AI JSON response safely
        const content = response.data.choices[0].message.content.trim();
        const aiAction = JSON.parse(content);
        return aiAction;
    } catch (err) {
        console.error("OpenAI API error, using dummy AI action 💀:", err);
        // Fallback if something goes wrong
        return {
            type: "spawn",
            piece: "q",
            to: "e4",
            color: "black"
        };
    }
}

module.exports = { getAIAction };

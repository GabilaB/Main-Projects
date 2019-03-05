module.exports = {
  APPLICATION_ID:
    process.env.APPLICATION_ID ||
    "d037a2a389b8c492f8b3669c7769464f3b8d3e02df4e81292dd592111fbccb9e",
  SECRET:
    process.env.SECRET ||
    "89eb85f831753517d3ffca7b0345dda59028939db99a4eb2de94d629e4d94b49",
  CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:3000"
};

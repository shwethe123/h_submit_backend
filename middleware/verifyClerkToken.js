// verifyClerkToken.js
require('dotenv').config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressWithAuth({
  // ✅ Don't use "audience" now, just rely on env vars
});

module.exports = requireAuth;


//middleware

require('dotenv').config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressWithAuth(); // ✅ Middleware
module.exports = requireAuth;

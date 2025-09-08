const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth'); // ✅ fixed

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // parse JSON requests

// Routes
app.use('/api/auth', authRoutes);

// Test DB connection
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch((err) => console.error('❌ Error syncing DB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


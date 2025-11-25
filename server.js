const dotenv = require('dotenv');
const sequelize = require('./config/db');
const app = require('./app'); 
dotenv.config();

// Test DB connection
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch((err) => console.error('❌ Error syncing DB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

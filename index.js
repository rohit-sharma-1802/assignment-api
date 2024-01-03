const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const authenticationMiddleware = require('./src/middleware/authenticationMiddleware');
const rateLimitMiddleware = require('./src/middleware/rateLimitMiddleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimitMiddleware);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api', authenticationMiddleware, noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
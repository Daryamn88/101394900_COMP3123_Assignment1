const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');
const employeeRoutes = require('./routes/Employee');
require('dotenv').config();

const app = express();
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

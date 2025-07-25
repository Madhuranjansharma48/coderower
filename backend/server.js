const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Configuration = require('./models/Configuration');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// GET /api/configurations/:id
app.get('/api/configurations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const config = await Configuration.findById(id);
    
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    
    res.json(config.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/configurations/:id
app.put('/api/configurations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { remark } = req.body;
    
    const config = await Configuration.findByIdAndUpdate(
      id,
      { remark, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    
    res.json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

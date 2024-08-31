const express = require('express');
const dotenv = require('dotenv');
const redis = require('redis');
const apiMonitor = require('./routes/apiMonitor');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Redis client setup
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis...');
});

app.use(express.json());

// API Monitoring Routes
app.use('/api/monitor', apiMonitor(redisClient));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

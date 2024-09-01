const express = require('express');
const { getGitHubRateLimit } = require('../apiClients/githubClient');
const { getTwitterRateLimit } = require('../apiClients/twitterClient');
const notificationService = require('../utils/notificationService');

const router = express.Router();

module.exports = (redisClient) => {
    router.get('/github', async (req, res) => {
        try {
            const data = await getGitHubRateLimit(process.env.GITHUB_API_TOKEN);
            // Save data to Redis
            redisClient.setex('githubRateLimit', 3600, JSON.stringify(data));
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch GitHub rate limit.' });
        }
    });

    router.get('/twitter', async (req, res) => {
        try {
            const data = await getTwitterRateLimit(process.env.TWITTER_API_KEY, process.env.TWITTER_API_SECRET);
            // Save data to Redis
            redisClient.setex('twitterRateLimit', 3600, JSON.stringify(data));
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch Twitter rate limit.' });
        }
    });

    return router;
};

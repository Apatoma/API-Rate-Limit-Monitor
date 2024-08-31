const axios = require('axios');

const getGitHubRateLimit = async (token) => {
    try {
        const response = await axios.get('https://api.github.com/rate_limit', {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub rate limit:', error);
        throw error;
    }
};

module.exports = { getGitHubRateLimit };

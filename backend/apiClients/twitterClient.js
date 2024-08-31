const axios = require('axios');

const getTwitterRateLimit = async (apiKey, apiSecret) => {
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    try {
        const tokenResponse = await axios.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });

        const token = tokenResponse.data.access_token;

        const rateLimitResponse = await axios.get('https://api.twitter.com/1.1/application/rate_limit_status.json', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return rateLimitResponse.data;
    } catch (error) {
        console.error('Error fetching Twitter rate limit:', error);
        throw error;
    }
};

module.exports = { getTwitterRateLimit };

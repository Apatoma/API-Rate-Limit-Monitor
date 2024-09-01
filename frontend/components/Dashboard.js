import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiStatus from './ApiStatus';
import ApiHistory from './ApiHistory';
import AlertSettings from './AlertSettings';

const Dashboard = () => {
    const [githubData, setGithubData] = useState(null);
    const [twitterData, setTwitterData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const githubResponse = await axios.get('/api/monitor/github');
            setGithubData(githubResponse.data);

            const twitterResponse = await axios.get('/api/monitor/twitter');
            setTwitterData(twitterResponse.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>API Rate Limit Monitor Dashboard</h1>
            <ApiStatus title="GitHub API" data={githubData} />
            <ApiStatus title="Twitter API" data={twitterData} />
            <ApiHistory />
            <AlertSettings />
        </div>
    );
};

export default Dashboard;

import React from 'react';

const ApiStatus = ({ title, data }) => {
    return (
        <div>
            <h2>{title} Status</h2>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ApiStatus;

import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
    const [data, setData] = useState([]);
    const socket = new WebSocket('http://localhost:8081');
    useEffect(() => {

    }, []); // Empty dependency array for running effect once on mount
    console.log(data);

    return (
        <div>
            <h1>Data from Database (Updates dynamically)</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name + item.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;

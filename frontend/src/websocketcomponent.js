import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = WebSocket('http://localhost:8081');

        socket.on('database_data', (newData) => {
            console.log('Received data from server:', newData);
            setData(newData); // Update state with new data
        });

        return () => {
            socket.disconnect(); // Disconnect socket when component unmounts
        };
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

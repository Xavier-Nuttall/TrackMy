import React, { useState, useEffect } from 'react';

const ws = new WebSocket('ws://localhost:8081/');

const WebSocketComponent = () => {
    const [room, setRoom] = useState({
        room_id: 1,
        threshold: 0,
        occupancy: 0,
    });

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            console.log('Received:', event.data);
            const message = JSON.parse(event.data);
            update(message.data); // Call update function with new data
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };
    }, []);

    const update = (newData) => {
        try {
            // Parse the received data (assuming it's in the correct JSON format)
            const parsedData = JSON.parse(newData);
            
            // Extract relevant information from the parsed data
            const { room_name, threshold, occupancy } = parsedData[0];
    
            // Update the state with the extracted information
            setRoom({
                room_id: 1, // Assuming room_id is fixed for this component
                threshold,
                occupancy,
            });
        } catch (error) {
            console.error('Error parsing WebSocket data:', error);
        }
    };

    return (
        <div>
            <h1>Data from Database (Updates dynamically)</h1>
            <ul>
                {Object.keys(room).map((key, index) => (
                    <li key={index}>
                        {key}: {room[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;

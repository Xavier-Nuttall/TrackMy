import React, { useState, useEffect } from 'react';

const ws = new WebSocket('ws://localhost:8081/');

const WebSocketComponent = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/rooms/1/occupancy/');
                //console.log('trying');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                // Handle fetch errors gracefully
            }
        };

        fetchData();

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

    const addRooms = (newRooms) => {
        setRooms(rooms => {
            // Create a map from room_id to room object for faster lookup
            const roomMap = new Map(rooms.map(room => [room.room_id, room]));
    
            // Update existing rooms and add new rooms without duplicates
            newRooms.forEach(newRoom => {
                if (roomMap.has(newRoom.room_id)) {
                    // Update existing room by replacing it in the map
                    roomMap.set(newRoom.room_id, newRoom);
                } else {
                    // Add new room to the map
                    roomMap.set(newRoom.room_id, newRoom);
                }
            });
    
            // Convert the updated map back to an array of rooms
            return Array.from(roomMap.values());
        });
    };

    const update = (newData) => {
        try {
            // Parse the received data (assuming it's in the correct JSON format)
            const parsedData = JSON.parse(newData);
            if (Array.isArray(parsedData)) {
                addRooms(parsedData);
            } else {
                console.error('Invalid data format:', parsedData);
            }

        } catch (error) {
            console.error('Error parsing WebSocket data:', error);
        }
    };

    return Array.from(rooms.values());
};

export default WebSocketComponent;

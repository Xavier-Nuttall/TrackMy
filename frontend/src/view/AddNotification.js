import React, { useState } from 'react';
import '../AddNotification.css';
import { useNavigate, useLocation } from "react-router-dom";

function AddNotification({ rooms }) {

    // Function to get default time in format 'HH:MM'
    const getDefaultTime = (hour) => {
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        return `${formattedHour}:00`;
    };

    const location = useLocation();
    const { session_id } = location.state || {};
    const [formData, setFormData] = useState({
        session_id: session_id,
        room_id: '',
        room_threshold: '',
        start_time: getDefaultTime(7),
        end_time: getDefaultTime(21)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const roomArray = Object.values(rooms);

    const handleRoomChange = (e) => {
        const selectedRoomId = e.target.value;
        const selectedRoom = roomArray.find((room) => room.room_id == selectedRoomId);

        setFormData((prevData) => ({
            ...prevData,
            room_id: selectedRoom.room_id,
            room_info: selectedRoom, // Store the whole room information
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/users/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // alert('Notification added successfully!');
                setFormData({
                    session_id: session_id,
                    room_id: '',
                    room_threshold: '',
                    start_time: '',
                    end_time: ''
                });
                navigate("/account");
            } else {
                // alert('Failed to add notification.');
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while adding the notification.');
        }
    };

    const handleCancel = () => {
        setFormData({
            session_id: session_id,
            room_id: '',
            room_threshold: '',
            start_time: '',
            end_time: ''
        });
        navigate("/account");
    };

    return (
        <main>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="roomId">Room:</label>
                        <select
                            id="roomId"
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleRoomChange}
                            required
                        >
                            <option value="" disabled>Select a room</option>
                            {roomArray.map((room) => (
                                <option key={room.room_id} value={room.room_id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="roomThreshold">Room Threshold:</label>
                        <input
                            type="number"
                            id="roomThreshold"
                            name="room_threshold"
                            value={formData.room_threshold}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time:</label>
                        <input
                            type="time" // Change type to "time"
                            id="startTime"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time:</label>
                        <input
                            type="time" // Change type to "time"
                            id="endTime"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Add Notification</button>
                        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddNotification;

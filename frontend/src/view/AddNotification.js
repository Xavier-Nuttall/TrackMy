import React, { useState } from 'react';
import '../AddNotification.css';
import { useNavigate, useLocation } from "react-router-dom";

function AddNotification({ rooms }) {
    const location = useLocation();
    const { session_id } = location.state || {}
    const [formData, setFormData] = useState({
        session_id: session_id,
        room_id: '',
        room_threshold: '',
        start_time: '',
        end_time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                alert('Notification added successfully!');
                setFormData({
                    session_id: session_id,
                    room_id: '',
                    room_threshold: '',
                    start_time: '',
                    end_time: ''
                });
                navigate("/account");
            } else {
                alert('Failed to add notification.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the notification.');
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
                        <label htmlFor="roomId">Room ID:</label>
                        <input
                            type="number"
                            id="roomId"
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleChange}
                            required
                        />
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
                            type="datetime-local"
                            id="startTime"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time:</label>
                        <input
                            type="datetime-local"
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

async function updateNotif(notification) {
    try {
        const response = await fetch('http://localhost:3001/api/users/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notification)
        });

        if (response.ok) {
            alert('Notification updated successfully!');
        } else {
            alert('Failed to update notification.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the notification.');
    }
}

function EditNotificationsPage({ notification }) {
    const [roomThreshold, setRoomThreshold] = useState(notification?.room_threshold || "No");
    const [startTime, setStartTime] = useState(notification?.start_time || "");
    const [endTime, setEndTime] = useState(notification?.end_time || "");
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!validateInputs()) return;

        // Update notification object with new values
        notification.room_threshold = roomThreshold;
        notification.start_time = startTime;
        notification.end_time = endTime;

        try {
            await updateNotif(notification);
            navigate("/account/");
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    const handleCancel = () => {
        navigate("/account/");
    };

    const validateInputs = () => {
        // Perform validation logic here
        // Example: Check if start time is before end time
        if (startTime >= endTime) {
            alert('Start time must be before end time.');
            return false;
        }
        return true;
    };

    if (!notification) {
        return <main><div>Error: Invalid notification data</div></main>;
    }

    return (
        <main>
            <div className="edit-notifications-page">
                <h2>Edit Notification</h2>
                <div className="form-group">
                    <label htmlFor="roomThreshold">Occupancy Threshold:</label>
                    <input
                        type="number"
                        id="roomThreshold"
                        value={roomThreshold}
                        onChange={(e) => setRoomThreshold(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </main>
    );
}

export default EditNotificationsPage;

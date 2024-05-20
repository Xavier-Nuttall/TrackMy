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
    console.log(notification);
    // Initialize state unconditionally at the top level
    const [roomThreshold, setRoomThreshold] = useState(notification?.room_threshold || "No");
    const [startTime, setStartTime] = useState(notification?.start_time || "");
    const [endTime, setEndTime] = useState(notification?.end_time || "");

    const navigate = useNavigate();

    const handleSave = async () => {
        // Perform save logic with updated data
        // For demonstration purposes, log the updated data
        console.log("Updated Room Threshold:", roomThreshold);
        console.log("Updated Start Time:", startTime);
        console.log("Updated End Time:", endTime);
        notification.room_threshold = roomThreshold;
        notification.start_time = startTime;
        notification.end_time = endTime;

        // Redirect or close the editing page after saving
        try {
            await updateNotif(notification);
        } catch (error) {
            console.error('Error updating notification:', error);
        }
        navigate("/account/");
    };

    const handleCancel = () => {
        navigate("/account/");
    };

    // Check if notification or its properties are undefined before accessing them
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

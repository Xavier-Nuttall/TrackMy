import React, { useState } from "react";

function EditNotificationsPage({ notification }) {
    console.log(notification);
    // Initialize state unconditionally at the top level
    const [roomThreshold, setRoomThreshold] = useState(notification?.room_threshold || "No");
    const [startTime, setStartTime] = useState(notification?.start_time || "");
    const [endTime, setEndTime] = useState(notification?.end_time || "");

    console.log(roomThreshold);

    // Check if notification or its properties are undefined before accessing them
    if (!notification) {
        return <main><div>Error: Invalid notification data</div></main>;
    }

    const handleSave = () => {
        // Perform save logic with updated data
        // For demonstration purposes, log the updated data
        console.log("Updated Room Threshold:", roomThreshold);
        console.log("Updated Start Time:", startTime);
        console.log("Updated End Time:", endTime);

        // Redirect or close the editing page after saving
    };

    const handleCancel = () => {
        // Handle cancel action (e.g., redirect or close the editing page)
    };

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

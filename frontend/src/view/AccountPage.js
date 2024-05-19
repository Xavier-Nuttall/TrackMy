import React from "react";
import { useState } from "react";

function AccountPage({ isOpen }) {

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // You can add logic here to update notification settings in your application
  };

  let user = {
    email: "temch584@student.otago.ac.nz",
    firstName: "Charlie",
    lastName: "Templeton",
    otherNames: "Jack McKay"
  }

  const notifications = [
    { id: 1, roomName: "Room 101", notificationZone: "Zone A", startTime: "16:00:00", endTime: "21:00:00" },
    { id: 2, roomName: "Room 102", notificationZone: "Zone B", startTime: "13:00:00", endTime: "19:00:00" },
    { id: 3, roomName: "Room 103", notificationZone: "Zone C", startTime: "15:00:00", endTime: "20:00:00" },
    // Add more notifications as needed
  ];

  const handleUpdate = (id) => {
    console.log(`Update notification ${id}`);
  };

  return (
    <main className={`account-page ${isOpen ? '' : 'open'}`}>
      <div className="account-container">
        <div className="user-info">
          <h2>Account Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Other Names:</strong> {user.otherNames}</p>
        </div>
        <div className="notifications">
          <h2>Notifications</h2>
          <div className="notifications-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.map(notification => (
              <div key={notification.id} className="notification-row">
                <input
                  type="checkbox"
                  checked={notification.enabled}
                  onChange={() => handleNotificationToggle(notification.id)}
                />
                <p><strong>Room Name:</strong> <br></br>{notification.roomName}</p>
                <p><strong>Notification Zone:</strong> <br></br>{notification.notificationZone}</p>
                <p><strong>Time Zone:</strong> <br></br>{notification.startTime} - {notification.endTime}</p>
                <button onClick={() => handleUpdate(notification.id)} className="update-button">Update</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
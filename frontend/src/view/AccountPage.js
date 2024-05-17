import React from "react";

function AccountPage() {

  let user = {
    email: "temch584@student.otago.ac.nz",
    firstName: "Charlie",
    lastName: "Templeton",
    otherNames: "Jack McKay"
  }

  const notifications = [
    { id: 1, roomName: "Room 101", notificationZone: "Zone A" },
    { id: 2, roomName: "Room 102", notificationZone: "Zone B" },
    { id: 3, roomName: "Room 103", notificationZone: "Zone C" },
    // Add more notifications as needed
  ];

  const handleUpdate = (id) => {
    console.log(`Update notification ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete notification ${id}`);
  };

  return (
    <main className="account-page">
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
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-row">
                <p><strong>Room Name:</strong> {notification.roomName}</p>
                <p><strong>Notification Zone:</strong> {notification.notificationZone}</p>
                <button onClick={() => handleUpdate(notification.id)} className="update-button">Update</button>
                <button onClick={() => handleDelete(notification.id)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
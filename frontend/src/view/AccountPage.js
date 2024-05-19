import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccountPage({ isOpen, setNotification }) {
  let user = {
    email: "temch584@student.otago.ac.nz",
    firstName: "Charlie",
    lastName: "Templeton",
    otherNames: "Jack McKay"
  }

  const userId = "d78bc510-3eeb-4197-817a-7f665f032fa0";

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData = await getNotifications(userId);
        console.log("Notifications data:", notificationsData); // Log the data received
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = (id) => {
    console.log(`Update notification ${id}`);
  };

  const handleAddNotification = () => {

  };

  const navigate = useNavigate();

  const redirectToPage = (notification) => {
    setNotification(notification);
    navigate("/account/notification-update", { state: { notification } });
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
            <div className="notification-row">
              <p><strong>Room Name</strong></p>
              <p><strong>Occupancy</strong></p>
              <p><strong>Time Zone</strong></p>
            </div>
            {notifications.map(notification => (
              <div key={`${notification.user_id}-${notification.room_id}`} className="notification-row">
                <p>{notification.room_id}</p>
                <p>0-{notification.room_threshold}</p>
                <p>{new Date(notification.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} - {new Date(notification.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                <div><button onClick={() => redirectToPage(notification)} className="update-button">Update</button></div>
                <div><button onClick={() => handleDelete(notification.id)} className="delete-button">Delete</button></div>
              </div>
            ))}
          </div>
          <button onClick={handleAddNotification} className="add-notification-button">Add New Notification</button>
        </div>
      </div>
    </main>
  );
}

async function getNotifications(userId) {
  try {
    const response = await fetch(`http://localhost:3001/api/users/notifications/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    // Check if data is empty
    if (data.length === 0) {
      return [{ id: null, room_id: 'No notifications found', room_threshold: null, start_time: null, end_time: null }];
    }
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // rethrow the error so that the caller can handle it
  }
}

export default AccountPage;
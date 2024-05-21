import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function deleteNotif(notification) {
  try {
    const response = await fetch(`http://localhost:3001/api/users/notifications`, {
      method: "DELETE", // Specify the DELETE method for deleting the notification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching room data:", error.message);
  }
}

function AccountPage({ isOpen, setNotification, userSession }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log(userSession.session_token);
        const notificationsData = await getNotifications(userSession.session_token);
        console.log(notificationsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    console.log("Hit");
  }, []);

  const handleDeleteNotification = async (notification) => {
    try {
      await deleteNotif(notification);
      const updatedNotifications = await getNotifications(userSession.session_token);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const navigate = useNavigate();

  const redirectToPage = (notification) => {
    setNotification(notification);
    navigate("/account/notification-update", { state: { notification } });
  };

  const handleAddNotification = () => {
    navigate("/account/add-notification", { state: { session_id: userSession.session_token } });
  };

  console.log(notifications);
  return (
    <main className={`account-page ${isOpen ? '' : 'open'}`}>
      <div className="account-container">
        <div className="user-info">
          <h2>Account Information</h2>
          <p><strong>Email:</strong> {userSession.email}</p>
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
                <div><button onClick={() => handleDeleteNotification(notification)} className="delete-button">Delete</button></div>
              </div>
            ))}
          </div>
          <button onClick={handleAddNotification} className="add-notification-button">Add New Notification</button>
        </div>
      </div>
    </main>
  );
}

async function getNotifications(userSessionId) {
  try {
    const response = await fetch(`http://localhost:3001/api/users/notifications/${userSessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("LOL");
    console.log(data);
    // Check if data is empty
    if (data.length === 0) {
      console.log("bad Hit");
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // rethrow the error so that the caller can handle it
  }
}

export default AccountPage;
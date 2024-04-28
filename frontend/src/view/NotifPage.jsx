import React from "react";

function NotifPage() {
    return (
        <main>
          {/* Probably a minimap on the side of the floor plan to have a reference to which room you're going for */}
          {/* . with the floor change */}
          <div className="grid-contain">
            <div id="top-set">
              <div id="new-notif">
                <fieldset>
                  <legend>New Notification</legend>
                  <form>
                    <label htmlFor="room">Room:</label>
                    <select id="room">
                      <option>Example Room</option>
                    </select>
                    <label htmlFor="threshold">Notify when occupancy goes over this amount of people:</label>
                    <input id="threshold" type="number" />
                    <label htmlFor="startTime">When to begin receiving notifications:</label>
                    <input id="startTime" type="time" />
                    <label htmlFor="endTime">Notifications will stop being received after:</label>
                    <input id="endTime" type="time" />
                    <input type="submit" value="Create New" />
                  </form>
                </fieldset>
              </div>
              <div id="mini-map">
                <p>heatmap goes here albeit without current stats.<br />primarily for reference when making notifs</p>
              </div>
            </div>
            <div id="full-list">
              <h3>Current Notifications</h3>
              <dl id="list-notifs">
                <dt>Room A</dt>
                <dd>Threshold: 10</dd>
                <dd>Times: 10:00 - 18:00</dd>
                <dd><button>Delete Notification</button></dd>
  
                <dt>Room B</dt>
                <dd>Threshold: 20</dd>
                <dd>Times: 9:00 - 15:00</dd>
                <dd><button>Delete Notification</button></dd>
  
                <dt>Room B</dt>
                <dd>Threshold: 20</dd>
                <dd>Times: 9:00 - 15:00</dd>
                <dd><button>Delete Notification</button></dd>
  
                <dt>Room B</dt>
                <dd>Threshold: 20</dd>
                <dd>Times: 9:00 - 15:00</dd>
                <dd><button>Delete Notification</button></dd>
  
                <dt>Room B</dt>
                <dd>Threshold: 20</dd>
                <dd>Times: 9:00 - 15:00</dd>
                <dd><button>Delete Notification</button></dd>
              </dl>
            </div>
          </div>
        </main>
      );
  }

export default NotifPage;
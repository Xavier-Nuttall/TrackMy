import React from 'react';
import WebSocketComponent from './websocketcomponent';


function HomePage() {
    return (
      <main>
        <div className="grid-contain" id="main-show">
          <div id="graph-show">
            <p>heatmap goes here</p>
            <WebSocketComponent></WebSocketComponent>
            <div id="floor-select">
                <dl>
                    <dt>F3</dt>
                    <dt>F2</dt>
                    <dt>F1</dt>
                </dl>
            </div>
          </div>
          <div id="room-graph-show">
              <p>this panel is for selecting a specific room and showing the trends for a set time frame. will also test js graphs here.</p>
          </div>
          <div id="room-show">
            <p>this is room information for selected room in overhead panel heatmap. that functions as the room list. information here will be basic statistics for each room throughout the week</p>
            <h1>Room X</h1>
            <table>
              <tr>
                <th>Variable</th> {/**what do i call this anyways  */}
                <th>Value</th>
              </tr>
              <tr>
                <td>Current Present</td>
              </tr>
              <tr>
                <td>Maximum this week</td>
              </tr>
              <tr>
                <td>Minimum this week</td>
              </tr>
            </table>
          </div>
          
        </div>
      </main>
    );
  }

export default HomePage;

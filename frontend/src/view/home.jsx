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
          <div id="room-show">
            <p>individual room stats go here either via grid or list</p>
            <div id="list-rooms">
                <dl>
                <dt>Room A</dt>
                <dd>Threshold: 10</dd>
                <dd><button>Room Stats</button></dd>
  
                <dt>Room B</dt>
                <dd>Threshold: 20</dd>
                <dd><button>Room Stats</button></dd>

                <dt>Room C</dt>
                <dd>Threshold: 100</dd>
                <dd><button>Room Stats</button></dd>

                <dt>Room D</dt>
                <dd>Threshold: 5</dd>
                <dd><button>Room Stats</button></dd>
                </dl>
            </div>
          </div>
          <div id="room-graph-show">
              <p>this panel is for selecting a specific room and showing the trends for a set time frame. will also test js graphs here.</p>
          </div>
        </div>
      </main>
    );
  }

export default HomePage;

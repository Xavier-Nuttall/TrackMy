import React, { useState, useEffect } from 'react';
import '../App.css';
import { useMainContent, useMenuOpen, useFloor, useRoom } from './CustomHooks';
import '../FloorMap.css';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';


let displayedRoomID;

let floorInfo = {
    0: {
        name: "Room 1",
        occupancy: [],
        threshold: ""
    },
    1: {
        name: "Room 2",
        occupancy: [],
        threshold: ""
    },
    2: {
        name: "Room 3",
        occupancy: [],
        threshold: ""
    },
    3: {
        name: "Room 4",
        occupancy: [],
        threshold: ""
    },
};

async function fetchRoomData() {
    try {
        const response = await fetch('http://localhost:3001/api/rooms/occupancy', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // assume responseData is an array of objects

        // Update floorInfo based on responseData
        responseData.forEach(room => {
            const roomId = room.room_id; // assuming each room object has a room_id
            if (roomId === null) {
                console.log("was null");
                return;
            }

            if (floorInfo[roomId]) {
                floorInfo[roomId].occupancy = room.occupancy; // assuming room.occupancy is an array
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchRoomThresholdData() {
    try {
        const response = await fetch('http://localhost:3001/api/rooms/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // assume responseData is an array of objects

        // Update floorInfo based on responseData
        responseData.forEach(room => {
            const roomId = room.room_id; // assuming each room object has a room_id
            if (roomId === null) {
                console.log("was null");
                return;
            }

            if (floorInfo[roomId]) { // assuming room.occupancy is an array
                floorInfo[roomId].name = room.room_name;
                floorInfo[roomId].threshold = room.threshold; // assuming room.threshold is a string
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}



function GetSecondFloor() {

    const handleR1Click = () => {
        displayedRoomID = 1;
    }


    return (
        <div className="floor">
            <div className="room5" onClick={handleR1Click}><p></p></div>
            <div className="room6" onClick={handleR1Click}></div>
            <div className="untracked2"></div>
            <div className="corridor1"></div>
            <div className="stairs2"></div>
            <div className="stairs3"></div>
            <div className="stairs4"></div>
            <div className="stairs5"></div>

        </div>
    );
}

function GetThirdFloor() {
    const handleR1Click = () => {
        displayedRoomID = 1;
    }

    return (
        <div className="floor">
            <div className="room7" onClick={handleR1Click}><p></p></div>
            <div className="room8" onClick={handleR1Click}></div>
            <div className="room9" onClick={handleR1Click}></div>
            <div className="untracked3"></div>
            <div className="stairs6"></div>
        </div>
    );
}

function generateLineGraph(roomId) {
    const room = floorInfo[roomId];
  
    // Check if the room exists in floorInfo
    if (!room) {
      console.error(`Room ${roomId} not found in floorInfo`);
      return;
    }
  
    // Get the canvas element for the line graph
    const canvas = document.getElementById('lineChart');
  
    if (canvas) {
      const ctx = canvas.getContext('2d');
  
      // Destroy existing chart if it exists
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }

      // Create the line chart for the specified room
      window.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: room.occupancy.map(data => data.value),
          datasets: [{
            label: `Occupancy for Room ${room.name}`,
            data: room.occupancy.map(data => data.value),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              display: false // Hide x-axis labels
            }
          }
        }
      });
    }
  }
  

const HomePage = () => {

    const [menuOpen, setMenuOpen] = useMenuOpen(true); // Set default menu open state to true
    const [floor, setFloor] = useFloor(<GetFirstFloor />);
    const [room, setRoom] = useRoom(1);

    function GetFirstFloor() {

        const handleR1Click = () => {
            setRoom(0);
        }
    
        const handleR2Click = () => {
            setRoom(1);
        }
    
        const handleR3Click = () => {
            setRoom(2);
        }
    
        const handleR4Click = () => {
            setRoom(3);
        }
    
        return (
            <div className="floor">
                <div className="room1" onClick={handleR1Click}><p></p></div>
                <div className="room2" onClick={handleR2Click}></div>
                <div className="room3" onClick={handleR3Click}></div>
                <div className="room4" onClick={handleR4Click}></div>
                <div className="untracked1"></div>
                <div className="stairs1"></div>
            </div>
        );
    }

    useEffect(() => {
        console.log('Updated room:', room); // Log the updated room state
        const fetchData = async () => {
            await fetchRoomData();
            await fetchRoomThresholdData();
            generateLineGraph(room); // Generate graph after fetching data
        };
        fetchData();
    }, [room]);

    const toggleFilter = () => {
        setMenuOpen(!menuOpen);
    };

    const handleFloorClick = (floorNumber) => {
        switch (floorNumber) {
            case 'F1':
                setFloor(<GetFirstFloor />)
                break;
            case 'F2':
                setFloor(<GetSecondFloor />)
                break;
            case 'F3':
                setFloor(<GetThirdFloor />)
                break;
            default:
                setFloor(null)
        }
    };

    return (
        <div className={`content-container${menuOpen ? '2' : '1'}`}>
            <div id="title">
                <div id="menu" onClick={toggleFilter}>
                    <div id="menu-button" className={`menu-button ${menuOpen ? 'change' : ''}`} >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <h1>TrackMy</h1>
                {/* <div className="search-button" onClick={toggleSearch}>
            <span className="icon"></span>
          </div> */}
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <Link to="/" className="sidebar-button">Home</Link>
                <Link to="/about" className="sidebar-button">About Us</Link>
                <Link to="/login" className="sidebar-button">Log In | Register</Link>
                <Link to="/account" className="sidebar-button">Account Settings</Link>
                <Link to="/notifications" className="sidebar-button">Edit Notifications</Link>
                <Link to="/room-information" className="sidebar-button">Room Information</Link>
            </nav>

            <main>
                <div className="grid-contain" id="main-show">
                    <div id="graph-show">
                        {floor}

                        <div id="floor-select" >
                            <dl>
                                <dt onClick={() => handleFloorClick('F1')}>F1</dt>
                                <dt onClick={() => handleFloorClick('F2')}>F2</dt>
                                <dt onClick={() => handleFloorClick('F3')}>F3</dt>
                            </dl>
                        </div>
                    </div>

                    <div id="room-show">
                    <canvas id="lineChart"></canvas>
                    </div>

                </div>
            </main>

        </div>

    );
}



export default HomePage;
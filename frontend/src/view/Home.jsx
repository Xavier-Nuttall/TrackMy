import React, { useState, useEffect } from 'react';
import '../App.css';
import { useMainContent, useMenuOpen, useFloor, useRoom, useColor } from './CustomHooks';
import '../FloorMap.css';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { createUseStyles } from 'react-jss';

const ws = new WebSocket('ws://localhost:8081/');

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
                // console.log("was null");
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

/** Function that fetches and assigns room threshold data and room name
 * to the floor Info variable
 */
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
                // console.log("was null");
                return;
            }

            if (floorInfo[roomId]) { // assuming room.occupancy is an array
                floorInfo[roomId].name = room.room_name;
                floorInfo[roomId].threshold = room.threshold; // assuming room.threshold is a string
            }
            else {
                floorInfo[roomId] = {
                    name: room.room_name,
                    occupancy: [],
                    threshold: room.threshold
                };
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
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
                labels: room.occupancy.map(data => data.time),
                datasets: [{
                    label: `Occupancy for Room ${room.name}`,
                    data: room.occupancy.map(data => data.value),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
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

function updateFloorArr(data) {
    // console.log(data);
}


function updateColors(colors, setColor, floor, handleFloorClick) {
    // console.log(floorInfo);
    // console.log(floorInfo[0].occupancy[floorInfo[0].occupancy.length - 1]);
    let newColors = colors;
    for (let roomID in floorInfo) {
        const threshold = floorInfo[roomID].threshold;
        let occupancy;
        if (!floorInfo[roomID].occupancy || floorInfo[roomID].occupancy.length === 0) {
            occupancy = 0;
        } else {
            occupancy = floorInfo[roomID].occupancy[floorInfo[roomID].occupancy.length - 1].value;
        }

        const diff = threshold - occupancy;
        const tenPercent = threshold / 10;
        // console.log("RoomID: " + roomID + "Diff" + diff + "ThresholdP" + tenPercent);
        if (diff <= tenPercent * 2) {
            newColors[roomID] = 'red';
        }
        else if (diff >= tenPercent * 2 && diff <= tenPercent * 5) {
            newColors[roomID] = 'orange';
        }
        else if (diff > tenPercent * 5 && diff <= tenPercent * 8) {
            newColors[roomID] = 'yellow';
        }
        else {
            newColors[roomID] = 'green';
        }
    }
    setColor(newColors);
    handleFloorClick(floor);
}

const HomePage = () => {

    const [menuOpen, setMenuOpen] = useMenuOpen(true); // Set default menu open state to true
    const [floor, setFloor] = useFloor('F1');
    const [room, setRoom] = useRoom(0);
    const [color, setColor] = useColor(['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']);

    function GetFirstFloor() {
        const useStyles = createUseStyles({
            roomColor1: {
                background: (prop) => prop.color1
            },
            roomColor2: {
                background: (prop) => prop.color2
            },
            roomColor3: {
                background: (prop) => prop.color3
            },
            roomColor4: {
                background: (prop) => prop.color4
            }
        });

        let prop = {
            color1: color[0],
            color2: color[1],
            color3: color[2],
            color4: color[3]
        };
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
        const classes = useStyles(prop);
        return (
            <div className="floor">
                <div className={`room1 ${classes.roomColor1}`} onClick={handleR1Click}>{floorInfo[0].name}</div>
                <div className={`room2 ${classes.roomColor2}`} onClick={handleR2Click}>{floorInfo[1].name}</div>
                <div className={`room3 ${classes.roomColor3}`} onClick={handleR3Click}>{floorInfo[2].name}</div>
                <div className={`room4 ${classes.roomColor4}`} onClick={handleR4Click}>{floorInfo[3].name}</div>
                <div className="untracked1"></div>
                <div className="stairs1"></div>
            </div>
        );
    }

    function GetSecondFloor() {
        const handleR5Click = () => {
            setRoom(4);
        }
        const handleR6Click = () => {
            setRoom(5);
        }
        const useStyles = createUseStyles({
            roomColor1: {
                background: (prop) => prop.color1
            },
            roomColor2: {
                background: (prop) => prop.color2
            }
        });

        let prop = {
            color1: color[4],
            color2: color[5],
        };
        const classes = useStyles(prop);
        return (
            <div className="floor">
                <div className={`room5 ${classes.roomColor1}`} onClick={handleR5Click}>{floorInfo[4].name}</div>
                <div className={`room6 ${classes.roomColor2}`} onClick={handleR6Click}>{floorInfo[5].name}</div>
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
        const handleR7Click = () => {
            setRoom(6);
        }
        const handleR8Click = () => {
            setRoom(7);
        }
        const handleR9Click = () => {
            setRoom(8);
        }
        const useStyles = createUseStyles({
            roomColor1: {
                background: (prop) => prop.color1
            },
            roomColor2: {
                background: (prop) => prop.color2
            },
            roomColor3: {
                background: (prop) => prop.color3
            }
        });

        let prop = {
            color1: color[6],
            color2: color[7],
            color3: color[8]
        };

        const classes = useStyles(prop);
        return (
            <div className="floor">
                <div className={`room7 ${classes.roomColor1}`} onClick={handleR7Click}>{floorInfo[6].name}</div>
                <div className={`room8 ${classes.roomColor2}`} onClick={handleR8Click}>{floorInfo[7].name}</div>
                <div className={`room9 ${classes.roomColor3}`} onClick={handleR9Click}>{floorInfo[8].name}</div>
                <div className="untracked3"></div>
                <div className="stairs6"></div>
            </div>
        );
    }

    useEffect(() => {
        //console.log('Updated room:', room); // Log the updated room state
        const fetchData = async () => {
            await fetchRoomData();
            await fetchRoomThresholdData();
            generateLineGraph(room); // Generate graph after fetching data
            updateColors(color, setColor, floor, handleFloorClick);
        };
        fetchData();
    }, [room, color]);

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket connected');
        };
        ws.onmessage = (event) => {
            console.log('Received Socket Home:', event);
            const fetchData = async () => {
                await fetchRoomData();
                await fetchRoomThresholdData();
                generateLineGraph(room); // Generate graph after fetching data
                updateColors(color, setColor, floor, handleFloorClick);
            };
            fetchData();
            //update(event.data);
        };
        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };
        const update = (newData) => {
            try {
                // console.log(newData);
                // Parse the received data (assuming it's in the correct JSON format)
                const parsedData = JSON.parse(newData);
                // console.log(parsedData);
                if (Array.isArray(parsedData)) {
                    updateFloorArr(parsedData);
                } else {
                    console.error('Invalid data format:', parsedData);
                }

            } catch (error) {
                console.error('Error parsing WebSocket data Update Method Home:', error);
            }
        };
    }, []);

    const toggleFilter = () => {
        setMenuOpen(!menuOpen);
    };

    const handleFloorClick = (floorNumber) => {
        switch (floorNumber) {
            case 'F1':
                setFloor(<GetFirstFloor />);
                break;
            case 'F2':
                setFloor(<GetSecondFloor />);
                break;
            case 'F3':
                setFloor(<GetThirdFloor />);
                break;
            default:
                console.error('Invalid floor identifier:', floorNumber);
                break;
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
                {/* <Link to="/account" className="sidebar-button">Account Settings</Link>
                <Link to="/notifications" className="sidebar-button">Edit Notifications</Link> */}
                {/* <Link to="/room-information" className="sidebar-button">Room Information</Link> */}
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
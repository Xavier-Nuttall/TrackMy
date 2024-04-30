import React, { useState, useEffect } from 'react';
import '../App.css';
import { useMainContent, useMenuOpen, useFloor } from './CustomHooks';
import '../FloorMap.css';
import { Link } from 'react-router-dom';


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
    3: {
        name: "Room 3",
        occupancy: [],
        threshold: ""
    },
    4: {
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
        console.log(responseData);

        // Update floorInfo based on responseData
        responseData.forEach(room => {
            const roomId = room.room_id; // assuming each room object has a room_id
            if (roomId === null) {
                console.log("was null");
                return;
            }

            if (floorInfo[roomId]) {
                floorInfo[roomId].occupancy = room.occupancy; // assuming room.occupancy is an array
                floorInfo[roomId].threshold = room.threshold; // assuming room.threshold is a string
            }
        });

        console.log('Updated floorInfo:', floorInfo);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function GetFirstFloor() {

    const handleR1Click = () => {
        displayedRoomID = 1;
        console.log(displayedRoomID);
    }

    const handleR2Click = () => {
        displayedRoomID = 2;
        console.log(displayedRoomID);

    }

    const handleR3Click = () => {
        displayedRoomID = 3;
        console.log(displayedRoomID);

    }

    const handleR4Click = () => {
        displayedRoomID = 4;
        console.log(displayedRoomID);

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

const HomePage = () => {
    fetchRoomData();
    console.log(floorInfo);

    const [menuOpen, setMenuOpen] = useMenuOpen(true); // Set default menu open state to true
    const [floor, setFloor] = useFloor(<GetFirstFloor />);

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

        </div>

    );
}

export default HomePage;
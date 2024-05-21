import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./view/Login";
import AboutUs from "./view/AboutUs";
import Title from "./components/Title";
import Navigation from "./components/Navigation";
import { useState } from "react";
import HomePage from "./view/TempHome";
import 'bootstrap/dist/css/bootstrap.css';
import AccountPage from "./view/AccountPage";
import GetRoomTrend from "./view/RoomTrends";
import UpdateNotifications from "./view/Notifications";
import AddNotification from "./view/AddNotification";

let ws = new WebSocket("ws://localhost:8081/");

function App() {
    const [isMenuOpen, setMenuOpen] = useState(true);
    const [currFloor, setCurrFloor] = useState(1);
    const [floorInfo, setFloorInfo] = useState({
        0: {
            name: "",
            occupancy: [],
            threshold: -1,
        },
    });

    const [dataFetched, setDataFetched] = useState(false);
    const [rooms, setRooms] = useState(getRoomInfo());
    const [notificationData, setNotificationData] = useState(null);

    const [userSession, setUserSession] = useState({});


    const fetchData = async () => {
        await fetchRoomData(floorInfo, setFloorInfo);
        await fetchRoomThresholdData(floorInfo, setFloorInfo);
        setDataFetched(true);
    };
    const [currRoom, setCurrRoom] = useState(0);

    function connect() {
        console.log('Attempting WebSocket connection...')
        ws = new WebSocket('ws://localhost:8081');
    }

    // Useffect for Websocket input
    useEffect(() => {
        ws.onopen = () => {
            console.log("WebSocket connected");
        };
        ws.onmessage = (event) => {
            console.log("Received Socket Home:", event);
            fetchData();
        };
        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setTimeout(connect, 2000);
        };
        fetchData();
    }, []);

    // UseEffect to run getColors after data is fetched
    useEffect(() => {
        if (dataFetched) {
            setRooms(getRoomInfo(floorInfo));
            setDataFetched(false); // Reset dataFetched if more updates are expected
        }
    }, [dataFetched]);

    // UseEffect to run getColors after data is fetched
    useEffect(() => {
        if (dataFetched) {
            setRooms(getRoomInfo(floorInfo));
            setDataFetched(false); // Reset dataFetched if more updates are expected
        }
    }, [currRoom]);

    return (
        <>
            <Title
                onToggle={() => setMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
            />
            <Navigation isOpen={isMenuOpen} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            isOpen={isMenuOpen}
                            floorNum={currFloor}
                            setCurrFloor={setCurrFloor}
                            floorInfo={floorInfo}
                            rooms={rooms}
                            currRoom={currRoom}
                            setCurrRoom={setCurrRoom}
                        />
                    }
                />
                <Route path="/login" element={<Login isOpen={isMenuOpen} userSession={userSession} setUserSession={setUserSession} />} />
                <Route path="/about" element={<AboutUs isOpen={isMenuOpen} />} />
                <Route path="/account" element={<AccountPage isOpen={isMenuOpen} setNotification={setNotificationData} />} />
                <Route path="/account/notification-update" element={<UpdateNotifications notification={notificationData} />} />
                <Route path="/room-trends" element={<GetRoomTrend isOpen={isMenuOpen} rooms={floorInfo} />} />
                <Route path="/account/add-notification" element={<AddNotification rooms={floorInfo} />} />
            </Routes>
        </>
    );
}

function getRoomInfo(floorInfo) {
    const rooms = {};
    for (let roomID in floorInfo) {
        if (floorInfo.hasOwnProperty(roomID)) {
            rooms[roomID] = {
                name: floorInfo[roomID].name
            };

            const threshold = floorInfo[roomID].threshold;
            let occupancy;
            if (!floorInfo[roomID].occupancy || floorInfo[roomID].occupancy.length === 0) {
                occupancy = 0;
            } else {
                occupancy = floorInfo[roomID].occupancy[floorInfo[roomID].occupancy.length - 1].value;
            }

            const diff = threshold - occupancy;
            const tenPercent = threshold / 10;

            if (diff <= tenPercent * 2) {
                rooms[roomID].color = "red";
            } else if (diff > tenPercent * 2 && diff <= tenPercent * 5) {
                rooms[roomID].color = "orange";
            } else if (diff > tenPercent * 5 && diff <= tenPercent * 8) {
                rooms[roomID].color = "yellow";
            } else {
                rooms[roomID].color = "green";
            }

            if (threshold === -1 || threshold === null) {
                rooms[roomID].color = "black";
            }
        }
    }

    return rooms;
}

async function fetchRoomData(floorInfo, setFloorInfo) {
    try {
        const response = await fetch("http://localhost:3001/api/rooms/occupancy", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json(); // assume responseData is an array of objects

        // Create a new object to hold updated floorInfo
        //const updatedFloorInfo = { ...floorInfo };

        // Update floorInfo based on responseData for occupancy
        responseData.forEach((room) => {
            const roomId = room.room_id; // assuming each room object has a room_id
            if (roomId === null) {
                return;
            }
            if (roomId !== null) {
                setFloorInfo((prevState) => ({
                    ...prevState,
                    [roomId]: {
                        name: prevState[roomId]?.name || "", // Use existing name or empty string
                        occupancy: room.occupancy,
                        threshold: prevState[roomId]?.threshold || 0, // Use existing threshold or 0
                        room_id: roomId,
                    },
                }));
            }
        });

        // Update floorInfo once with all changes
        //setFloorInfo(updatedFloorInfo);
    } catch (error) {
        console.error("Error fetching room data:", error.message);
    }
}

/** Function that fetches and assigns room threshold data and room name
 * to the floor Info variable
 */
async function fetchRoomThresholdData(floorInfo, setFloorInfo) {
    try {
        const response = await fetch("http://localhost:3001/api/rooms/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json(); // assume responseData is an array of objects

        // Create a new object to hold updated floorInfo
        //const updatedFloorInfo = { ...floorInfo };

        // Update floorInfo based on responseData for name and threshold
        responseData.forEach((room) => {
            const roomId = room.room_id; // assuming each room object has a room_id
            if (roomId === null) {
                return;
            }
            setFloorInfo((prevState) => ({
                ...prevState,
                [roomId]: {
                    ...prevState[roomId], // Keep existing data if roomId already exists
                    name: room.room_name,
                    threshold: room.threshold,
                    occupancy: prevState[roomId]?.occupancy || [],
                    room_id: roomId,
                },
            }));
        });

        // Update floorInfo once with all changes
        //setFloorInfo(updatedFloorInfo);
    } catch (error) {
        console.error("Error fetching room threshold data:", error.message);
    }
}

export default App;

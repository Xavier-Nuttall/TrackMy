const GetFloor = ({ floorNum, rooms, setCurrRoom }) => {
    const defaultColor = "black";

    const getRoomStyle = (roomId) => {
        const color = rooms[roomId]?.color || defaultColor;
        return { backgroundColor: color };
    };

    const handleRoomClick = (roomId) => {
        setCurrRoom(roomId)
    };


    let roomIds = Object.keys(rooms).map(Number);
    roomIds.sort((a, b) => a - b);

    let index = roomIds[roomIds.length];
    for (let i = roomIds.length; i < 9; i++) {
        roomIds.push(++index);
    }

    if (floorNum === 1) {
        return (
            <div className="floor">
                <div className="room1" style={getRoomStyle(roomIds[0])} onClick={() => handleRoomClick(roomIds[0])}>
                    {rooms[roomIds[0]]?.name || "No Data"}
                </div>
                <div className="room2" style={getRoomStyle(roomIds[1])} onClick={() => handleRoomClick(roomIds[1])}>
                    {rooms[roomIds[1]]?.name || "No Data"}
                </div>
                <div className="room3" style={getRoomStyle(roomIds[2])} onClick={() => handleRoomClick(roomIds[2])}>
                    {rooms[roomIds[2]]?.name || "No Data"}
                </div>
                <div className="room4" style={getRoomStyle(roomIds[3])} onClick={() => handleRoomClick(roomIds[3])}>
                    {rooms[roomIds[3]]?.name || "No Data"}
                </div>
                <div className="untracked1"></div>
                <div className="stairs1"></div>
            </div>
        );
    } else if (floorNum === 2) {
        return (
            <div className="floor">
                <div className="room5" style={getRoomStyle(4)} onClick={() => handleRoomClick(4)}>
                    {rooms[4]?.name || "No Data"}</div>
                <div className="room6" style={getRoomStyle(5)} onClick={() => handleRoomClick(5)}>
                    {rooms[5]?.name || "No Data"}</div>
                <div className="untracked2"></div>
                <div className="corridor1"></div>
                <div className="stairs2"></div>
                <div className="stairs3"></div>
                <div className="stairs4"></div>
                <div className="stairs5"></div>
            </div>
        );
    } else {
        return (
            <div className="floor">
                <div className="room7" style={getRoomStyle(6)} onClick={() => handleRoomClick(6)}>
                    {rooms[6]?.name || "No Data"}</div>
                <div className="room8" style={getRoomStyle(7)} onClick={() => handleRoomClick(7)}>
                    {rooms[7]?.name || "No Data"}</div>
                <div className="room9" style={getRoomStyle(8)} onClick={() => handleRoomClick(8)}>
                    {rooms[8]?.name || "No Data"}</div>
                <div className="untracked3"></div>
                <div className="stairs6"></div>
            </div>
        );
    }
};



export default GetFloor;

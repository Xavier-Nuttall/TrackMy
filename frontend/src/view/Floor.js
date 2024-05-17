const GetFloor = ({ floorNum, rooms, setCurrRoom }) => {
    const getRoomStyle = (roomId) => {
        const color = rooms[roomId]?.color || "default-color";
        return { backgroundColor: color };
    };

    const handleRoomClick = (roomId) => {
        setCurrRoom(roomId)
    };

    if (floorNum === 1) {
        return (
            <div className="floor">
                <div className="room1" style={getRoomStyle(0)} onClick={() => handleRoomClick(0)}>
                    {rooms[0]?.name || "Default Name 1"}
                </div>
                <div className="room2" style={getRoomStyle(1)} onClick={() => handleRoomClick(1)}>
                    {rooms[1]?.name || "Default Name 2"}
                </div>
                <div className="room3" style={getRoomStyle(2)} onClick={() => handleRoomClick(2)}>
                    {rooms[2]?.name || "Default Name 3"}
                </div>
                <div className="room4" style={getRoomStyle(3)} onClick={() => handleRoomClick(3)}>
                    {rooms[3]?.name || "Default Name 4"}
                </div>
                <div className="untracked1"></div>
                <div className="stairs1"></div>
            </div>
        );
    } else if (floorNum === 2) {
        return (
            <div className="floor">
                <div className="room5" style={getRoomStyle(4)} onClick={() => handleRoomClick(4)}>
                    {rooms[4]?.name || "Default Name 1"}</div>
                <div className="room6" style={getRoomStyle(5)} onClick={() => handleRoomClick(5)}>
                    {rooms[5]?.name || "Default Name 1"}</div>
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
                    {rooms[6]?.name || "Default Name 1"}</div>
                <div className="room8" style={getRoomStyle(7)} onClick={() => handleRoomClick(7)}>
                    {rooms[7]?.name || "Default Name 1"}</div>
                <div className="room9" style={getRoomStyle(8)} onClick={() => handleRoomClick(8)}>
                    {rooms[8]?.name || "Default Name 1"}</div>
                <div className="untracked3"></div>
                <div className="stairs6"></div>
            </div>
        );
    }
};



export default GetFloor;

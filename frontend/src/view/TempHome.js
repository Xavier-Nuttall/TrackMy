import React from "react";
import GetFloor from "./Floor";
import GetGraph from "./Graph";

function HomePage({ isOpen, floorNum, setCurrFloor, floorInfo, rooms, currRoom, setCurrRoom }) {
    // console.log(currRoom);
    console.log(rooms);
    const handleFloorChange = (floor) => {
        if (floor < 4 && floor > 0) {
            setCurrFloor(floor);
        }
    }
    return (
        <>
            <main className={`${isOpen ? '' : 'open'}`}>
                <h1>Floor Map</h1>
                <div id="graph-show">
                    <div className="map-container">
                        <GetFloor floorNum={floorNum} rooms={rooms} setCurrRoom={setCurrRoom} />
                    </div>
                    <div className="cycle-menu">
                        <div className="next-button arrow-up" onClick={() => handleFloorChange(floorNum + 1)}></div>
                        <h4>Floor:{floorNum}</h4>
                        <div className="prev-button arrow-down" onClick={() => handleFloorChange(floorNum - 1)}></div>
                    </div>
                </div>
                <h1>Floor Graph</h1>
                <GetGraph floorInfo={floorInfo} roomId={currRoom} />
            </main>
        </>
    );
}

export default HomePage;

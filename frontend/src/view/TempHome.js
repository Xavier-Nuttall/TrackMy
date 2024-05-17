import React from "react";
import GetFloor from "./Floor";
import GetGraph from "./Graph";

function HomePage({ floorNum, setCurrFloor, floorInfo, rooms, currRoom, setCurrRoom }) {
    return (
        <>
            <main>
                <div id="graph-show">
                    <GetFloor floorNum={floorNum} rooms={rooms} setCurrRoom={setCurrRoom} />
                </div>
                <GetGraph floorInfo={floorInfo} roomId={currRoom} />
            </main>
        </>
    );
}

export default HomePage;

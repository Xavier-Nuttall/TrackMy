import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import GetTrendGraph from './TrendGraph';

function GetRoomTrend({ isOpen, rooms }) {
    const periods = ["hour", "day", "month", "year"];

    const [selectedRoom, setSelectedRoom] = useState({ name: "None", roomid: 0, occupancy: [0] });
    const [selectedPeriod, setSelectedPeriod] = useState("hour");

    const handleRoomChange = (room) => {
        setSelectedRoom(room);
    };

    const handlePeriodChange = (periodId) => {
        setSelectedPeriod(periodId)
    };

    const roomList = Object.values(rooms);

    const graphInfo = generateGraphInfo(selectedRoom.occupancy, selectedPeriod);

    return (
        <main className={`room-trends ${isOpen ? '' : 'open'}`}>
            <h1>{selectedRoom.name}</h1>
            <Row className="mt-4">
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-room">
                            {selectedRoom.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {roomList.map(room => (
                                <Dropdown.Item key={room.id} onClick={() => handleRoomChange(room)}>
                                    {room.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-period">
                            {selectedPeriod}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {periods.map(period => (
                                <Dropdown.Item key={period} onClick={() => handlePeriodChange(period)}>
                                    {period}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="mt-4 trend-container ">
                <Col>
                    {/* Space for Chart */}
                    <GetTrendGraph floorInfo={rooms} roomId={0} timePeriod={selectedPeriod} graphInfo={graphInfo} />
                </Col>
            </Row>
        </main>

    );

}

function generateGraphInfo(occupancyData, selectedPeriod) {
    const periodMapping = {
        hour: date => date.getUTCHours(),
        day: date => date.getUTCDate(),
        month: date => date.getUTCMonth(),
        year: date => date.getUTCFullYear()
    };

    const periodKeyFunction = periodMapping[selectedPeriod];
    const occupancyStats = {};

    occupancyData.forEach(entry => {
        const date = new Date(entry.time);
        const periodKey = periodKeyFunction(date);

        if (!occupancyStats[periodKey]) {
            occupancyStats[periodKey] = {
                sum: 0,
                min: entry.value,
                max: entry.value,
                count: 0
            };
        }

        occupancyStats[periodKey].sum += entry.value;
        occupancyStats[periodKey].min = Math.min(occupancyStats[periodKey].min, entry.value);
        occupancyStats[periodKey].max = Math.max(occupancyStats[periodKey].max, entry.value);
        occupancyStats[periodKey].count += 1;
    });

    // Calculate average occupancy for each period
    Object.keys(occupancyStats).forEach(periodKey => {
        const stats = occupancyStats[periodKey];
        stats.average = parseFloat((stats.sum / stats.count).toFixed(2));
    });

    console.log(occupancyData);
    console.log(occupancyStats);
    return occupancyStats;
}


export default GetRoomTrend;

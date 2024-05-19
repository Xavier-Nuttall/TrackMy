import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import GetTrendGraph from './TrendGraph';

function GetRoomTrend({ isOpen, rooms }) {
    const periods = ["Hour", "Day", "Month", "Year"];

    const [selectedRoom, setSelectedRoom] = useState({ name: "None", roomid: 0, occupancy: [0] });
    const [selectedPeriod, setSelectedPeriod] = useState("Hour");

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
                    <GetTrendGraph floorInfo={rooms} room={selectedRoom} timePeriod={selectedPeriod} graphInfo={graphInfo} />
                </Col>
            </Row>
        </main>

    );

}
function generateGraphInfo(occupancyData, selectedPeriod) {

    const periodMapping = {
        Hour: date => date.getUTCHours(),
        Day: date => date.getUTCDay(),
        Month: date => date.getUTCMonth(),
        Year: date => date.getUTCFullYear()
    };

    const periodLabels = {
        Hour: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
            "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        Day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        Month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        Year: year => year.toString() // Keep the year as is
    };

    const periodKeyFunction = periodMapping[selectedPeriod];
    const labels = periodLabels[selectedPeriod];
    const occupancyStats = {};

    // Initialize occupancyStats with all period labels
    labels.forEach((label, index) => {
        occupancyStats[label] = {
            sum: 0,
            min: Infinity,
            max: -Infinity,
            count: 0
        };
    });

    occupancyData.forEach(entry => {
        const date = new Date(entry.time);
        const periodKey = periodKeyFunction(date);
        const periodLabel = labels[periodKey];

        if (!occupancyStats[periodLabel]) {
            occupancyStats[periodLabel] = {
                sum: 0,
                min: entry.value,
                max: entry.value,
                count: 0
            };
        }

        occupancyStats[periodLabel].sum += entry.value;
        occupancyStats[periodLabel].min = Math.min(occupancyStats[periodLabel].min, entry.value);
        occupancyStats[periodLabel].max = Math.max(occupancyStats[periodLabel].max, entry.value);
        occupancyStats[periodLabel].count += 1;
    });

    // Calculate average occupancy for each period
    Object.keys(occupancyStats).forEach(periodLabel => {
        const stats = occupancyStats[periodLabel];
        if (stats.count > 0) {
            stats.average = parseFloat((stats.sum / stats.count).toFixed(2));
        } else {
            stats.min = 0;
            stats.max = 0;
            stats.average = 0;
        }
    });

    // console.log(occupancyStats);
    // console.log(occupancyData);

    return {
        stats: occupancyStats,
        labels: labels
    };
}


export default GetRoomTrend;

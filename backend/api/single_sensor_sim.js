const time = Date.parse("2024-05-21T13:24:00Z");
const occupancy = 10;
const rId = 0;

async function single(timestamp, occupancy, rId) {
    ret = await fetch('http://localhost:3001/api/rooms/occupancy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_id: rId, time: timestamp, occupancy: occupancy })
    })
}


single(time, occupancy, rId);
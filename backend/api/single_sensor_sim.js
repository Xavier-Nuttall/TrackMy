const time = Date.parse("1970-01-01T22:00:00Z");
const occupancy = 2;
const rId = 0;

async function single(time, occupancy, rId) {


    ret = await fetch('http://localhost:3001/api/rooms/occupancy',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({room_id: rId, time: time, occupancy: occupancy})
})
}


single(time, occupancy, rId);
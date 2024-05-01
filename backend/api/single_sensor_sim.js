const time = Date.parse("2024-01-01T13:50:00Z");
const occupancy = 40;
const rId = 3;

async function single(){


    ret = await fetch('http://localhost:3001/api/rooms/occupancy',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({room_id: rId, time: time, occupancy: occupancy})
})
}

single();

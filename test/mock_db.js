
async function getRooms() {
    return [{ room_id: 0, room_name: 'Room0', threshold: 40 }, { room_id: 1, room_name: 'Room1', threshold: 20 }];
}
async function getOccupancy() {
    return [
        {
            room_id: 0,
            occupancy: 10,
            time: "2024-12-31T20:00:00.000Z"
        },
        {
            room_id: 1,
            time: "2024-12-31T20:00:00.000Z",
            occupancy: 12
        }
    ]
}

async function getRoomById(x) {
    return { room_id: 0, room_name: 'Room0', threshold: 40 };
}

async function getOccupancyByRoomId(x) {
    return [{ time: '2024-12-31T20:00:00.000Z', value: 10 }];
}

const dao = {
    getRooms,
    getOccupancy,
    getRoomById,
    getOccupancyByRoomId
};

module.exports = dao;
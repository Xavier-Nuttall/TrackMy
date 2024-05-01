
async function getRooms() {
    return [{ room_id: 0, room_name: 'Room0', threshold: 40 }, { room_id: 1, room_name: 'Room1', threshold: 20 }];
}
async function getOccupancy() {
    return [{ room_id: 0, occupancy: [{ time: '2024-12-31T20:00:00.000Z', value: 10 }] }, { room_id: 1, occupancy: [{ time: '2024-12-31T20:00:00.000Z', value: 12 }] }];
}

async function getRoomById() {
    return { room_id: 0, room_name: 'Room0', threshold: 40 };
}

async function getOccupancyByRoomId() {
    return [{ time: '2024-12-31T20:00:00.000Z', value: 10 }];
}

const dao = {
    getRooms,
    getOccupancy,
    getRoomById,
    getOccupancyByRoomId
};

module.exports = dao;
test("fetching/", async () => {
    let resp = await fetch("http://localhost:3001", { redirect: "manual" });
    expect(resp.status).toBe(302)
})

test("GetRooms/", async () => {
    let resp = await fetch("http://localhost:3001/api/rooms", { redirect: "manual" });
    let arr1 = [
        {
            room_id: 0,
            room_name: "Room0",
            threshold: 40
        },
        {
            room_id: 1,
            room_name: "Room1",
            threshold: 20
        },
    ]
    expect(resp.status).toBe(arr1);
});

test("GetRoomsOccupancy", async () => {
    let resp = await fetch("http://localhost:3001/api/rooms/occupancy", { redirect: "manual" });
    let arr1 = [
        {
            room_id: 0,
            occupancy: [
                {
                    time: "2024-12-31T20:00:00.000Z",
                    value: 10
                }
            ]
        },
        {
            room_id: 1,
            occupancy: [
                {
                    time: "2024-12-31T20:00:00.000Z",
                    value: 12
                }
            ]
        },
    ]
    expect(resp.status).toBe(arr1);
});

test("GetSpesificRoom/", async () => {
    let resp = await fetch("http://localhost:3001/api/rooms/0", { redirect: "manual" });
    let arr1 = {
        room_id: 0,
        room_name: "Room0",
        threshold: 40
    };
    expect(resp.status).toBe(arr1);
});

test("GetSpesificRoomsOccupancy", async () => {
    let resp = await fetch("http://localhost:3001/api/rooms/0/occupancy", { redirect: "manual" });
    let arr1 = [
        {
            time: "2024-12-31T20:00:00.000Z",
            value: 10
        }
    ]
    expect(resp.status).toBe(arr1);
});
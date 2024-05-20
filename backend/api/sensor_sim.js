const startTime = Date.now() - (Date.now() % (24 * 60 * 60 * 1000)) + 1000 * 60 * 60 * 8;
const endTime = Date.now() - (Date.now() % (24 * 60 * 60 * 1000)) + 1000 * 60 * 60 * 18;
const days = 1;
const steps = 10;

function generateRandomFunction() {
    const numFunctions = 100;
    const functions = [];
    const mean = 0.2;
    const std = 0.8;

    for (let i = 0; i < numFunctions; i++) {
        const amplitude = 1 / ((Math.random() * std + mean) * (i + 1) ** 2);
        const frequency = (Math.random() * std + mean) * i;

        functions.push((x) => amplitude * Math.sin(frequency * x));
    }

    return (x) => functions.reduce((sum, func) => sum + func(x), 0);
}

function generateDay(startTime, endTime, steps) {
    const data = [];
    const N = 1 / steps; // out x values
    const duration = endTime - startTime;
    const randomFunction = generateRandomFunction();

    for (let i = 0; i < steps + 1; i++) {
        data.push({
            time: startTime + duration * i * N,
            value: randomFunction(N * i * Math.PI),
        });
    }

    const endValue = data[data.length - 1].value;
    // subtract off x*endValue from each and take the absolute value
    for (let i = 0; i < data.length; i++) {
        data[i].value = Math.round(Math.abs(data[i].value - i * N * endValue) * 20);
    }

    return data;
}

async function generateRoom(days, startTime, endTime, steps, name) {
    const threshold = Math.floor(Math.random() * 20 + 4);
    // add the room to the database
    ret = await fetch("http://localhost:3001/api/rooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_name: name, threshold: threshold }),
    });

    // get the body of the fetch back and save it as room id
    const room_id = await ret.json();
    rId = room_id.room_id;

    // generate the data for each day
    for (let i = 0; i < days; i++) {
        const data = generateDay(
            startTime + i * 24 * 60 * 60 * 1000,
            endTime + i * 24 * 60 * 60 * 1000,
            steps
        );
        for (let j = 0; j < data.length; j++) {
            fetch("http://localhost:3001/api/rooms/occupancy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room_id: rId,
                    time: data[j].time,
                    occupancy: data[j].value,
                }),
            });
        }
    }
}

for (let i = 1; i < 11; i++) {
    setTimeout(() => {
        generateRoom(days, startTime, endTime, steps, "Room " + i);
    }, 50 * i);
}

setTimeout(() => {
    data = generateDay(endTime + 1000 * 60, endTime + 1000 * 60 * 30, 20);

    for (let i = 0; i < data.length; i++) {
        //wait 2s
        setTimeout(() => {
            console.log(data[i]);
            fetch("http://localhost:3001/api/rooms/occupancy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room_id: 0,
                    time: data[i].time,
                    occupancy: data[i].value,
                }),
            });
        }, 2000 * i);
    }
}, 5000);

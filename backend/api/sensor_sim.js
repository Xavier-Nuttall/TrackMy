const startTime = Date.parse("1970-01-01T08:00:00Z");
const endTime = Date.parse("1970-01-01T18:00:00Z");
const days = 7;
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
    const N = 1/steps; // out x values
    const duration = (endTime - startTime)
    const randomFunction = generateRandomFunction();



    for (let i = 0; i < steps + 1; i++) {
        data.push({ time: startTime + duration * i * N, value: randomFunction(N*i * Math.PI) });
    }

    const endValue = data[data.length - 1].value;
    // subtract off x*endValue from each and take the absolute value
    for (let i = 0; i < data.length; i++) {
        data[i].value = Math.round(Math.abs(data[i].value-i*N*endValue) * 20);
    }

    return data;
}

async function generateRoom(days, startTime, endTime, steps, name) {
    const threshold = Math.floor(Math.random() * 20 + 4);
    // add the room to the database
    ret = await fetch('http://localhost:3001/api/rooms',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({room_name: name, threshold: threshold})
    })

    // get the body of the fetch back and save it as room id
    const room_id = await ret.json();
    rId = room_id.room_id;


    // generate the data for each day
    for (let i = 0; i < 7; i++) {
        const data = generateDay(startTime + i * 24 * 60 * 60 * 1000, endTime + i * 24 * 60 * 60 * 1000, steps);
        console.log(data)
        for (j in data){
            ret = await fetch('http://localhost:3001/api/rooms/occupancy',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({room_id: rId, time: data[j].time, occupancy: data[j].value})
            })
        }

    }

}

generateRoom(days, startTime, endTime, steps, 'Room 1')




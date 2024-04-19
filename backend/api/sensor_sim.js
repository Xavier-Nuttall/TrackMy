
async function generateRandomData() {
    const startTime = new Date();
    startTime.setHours(1, 0, 0, 0); // Set start time to 12:00 am

    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999); // Set end time to 11:59 pm

    const data = [];
    let currentTime = new Date(startTime);

    // Get the current date and time in YYYY-MM-DD HH:mm:ss format
    const currentDate = new Date().toISOString().slice(0, 10);

    while (currentTime <= endTime) {
        const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        let change = Math.random() < 0.2 ? 1 : -1;

        // Adjust change probability based on time
        if (currentTime.getHours() >= 7 && currentTime.getHours() < 12) {
            change = Math.random() < 0.7 ? 1 : -1; // Higher chance of +1 between 7 am and 12 pm
        }

        // Adjust change probability based on time
        if (currentTime.getHours() >= 12 && currentTime.getHours() < 15) {
            change = Math.random() < 0.3 ? 1 : -1; // Higher chance of +1 between 7 am and 12 pm
        }

        // Adjust change probability based on time
        if (currentTime.getHours() >= 15 && currentTime.getHours() < 19) {
            change = Math.random() < 0.7 ? 1 : -1; // Higher chance of +1 between 7 am and 12 pm
        }

        const timestamp = `${currentDate} ${time}:00`;
        //console.log(timestamp);

        data.push({ room_id: 1, change: change, date: currentDate, time: timestamp });
        currentTime.setMinutes(currentTime.getMinutes() + Math.floor(Math.random() * 10)); // Add random minutes
    }

    for(let i = 0; i < data.length; i++){
        await fetch('http://localhost:3001/api/heatmap-update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data[i]),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error: Hello', error);
        });
    }
    

}

const randomData = generateRandomData();
// console.log(randomData);


// // Get the current date and time in YYYY-MM-DD HH:mm:ss format
// const currentDate = new Date().toISOString().slice(0, 10);
// const currentTime = new Date().toISOString().slice(11, 19);
// const dateTime = `${currentDate} ${currentTime}`;

// // Construct the roomData object with the generated values
// const roomData = {
//     room_id: 1, // Replace with actual room ID
//     change: change,
//     date: currentDate,
//     time: dateTime,
// };


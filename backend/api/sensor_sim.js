
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

        for(let i = 1; i < 3; i++){
            data.push({ room_id: i, change: change, date: currentDate, time: timestamp });
        }
        currentTime.setMinutes(currentTime.getMinutes() + Math.floor(Math.random() * 10)); // Add random minutes
    }

    let i = 0; // Initialize i outside of setInterval

    const intervalId = setInterval(async () => {
        if (i >= data.length) {
            clearInterval(intervalId); // Stop interval when all requests are sent
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/heatmap-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data[i]),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }

        i++; // Increment i after each request
    }, 2000); // Set interval to 5 seconds


}

generateRandomData();


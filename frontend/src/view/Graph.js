import Chart from "chart.js/auto";

function GetGraph({ floorInfo, roomId }) {
    //console.log(floorInfo[0]);
    const room = floorInfo[roomId];

    // Check if the room exists in floorInfo
    if (!room) {
        console.error(`Room ${roomId} not found in floorInfo`);
        return;
    }

    // Get the canvas element for the line graph
    const canvas = document.getElementById("lineChart");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        // Destroy existing chart if it exists
        if (window.chartInstance) {
            window.chartInstance.destroy();
        }

        // Create the line chart for the specified room
        window.chartInstance = new Chart(ctx, {
            type: "line",

            data: {
                labels: room.occupancy.map((data) => data.time),
                datasets: [
                    {
                        label: `Occupancy for ${room.name}`,
                        data: room.occupancy.map((data) => data.value),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                animation: false,
                responsive: true, // Allow chart to be responsive
                maintainAspectRatio: false, // Allow aspect ratio to change
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        display: false, // Hide x-axis labels
                    },
                },
            },
        });
    }
    return (
        <div className="chart">
            <canvas id="lineChart"></canvas>
        </div>
    );
}

export default GetGraph;

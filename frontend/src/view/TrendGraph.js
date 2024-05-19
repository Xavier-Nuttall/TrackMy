import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

function GetTrendGraph({ floorInfo, roomId, timePeriod, graphInfo }) {
    const room = floorInfo[roomId];
    const canvasRef = useRef(null); // Ref for the canvas element

    useEffect(() => {
        if (room && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (window.chartInstance) {
                window.chartInstance.destroy();
            }

            // Calculate max, average, and min occupancy based on time period
            const labels = Object.keys(graphInfo);
            const maxOccupancy = labels.map(label => graphInfo[label].max);
            const avgOccupancy = labels.map(label => graphInfo[label].average);
            const minOccupancy = labels.map(label => graphInfo[label].min);

            window.chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: `Max Occupancy for ${room.name}`,
                            data: maxOccupancy,
                            backgroundColor: "rgba(255, 99, 132, 1)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: `Average Occupancy for ${room.name}`,
                            data: avgOccupancy,
                            backgroundColor: "rgba(54, 162, 235, 1)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: `Min Occupancy for ${room.name}`,
                            data: minOccupancy,
                            backgroundColor: "rgba(75, 192, 192, 1)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Occupancy',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: timePeriod,
                            },
                            ticks: {
                                display: true,
                            },
                        },
                    },
                },
            });
        }
    }, [room, roomId, timePeriod, graphInfo]);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default GetTrendGraph;

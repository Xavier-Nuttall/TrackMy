import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

function GetGraph({ floorInfo, roomId }) {
    const room = floorInfo[roomId];
    const canvasRef = useRef(null); // Ref for the canvas element

    useEffect(() => {
        if (room && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (window.chartInstance) {
                window.chartInstance.destroy();
            }
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
                                text: 'Date & Time',
                            },
                            ticks: {
                                display: false,
                            },
                        },
                    },
                },
            });
        }
    }, [room, roomId]);

    return (
        <div className="chart">
            <div className="chart-container">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}

export default GetGraph;
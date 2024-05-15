import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import { useMainContent, useMenuOpen, useFloor } from './CustomHooks';

let floorInfo = {
  0: {
    name: "Room 1",
    occupancy: [],
    threshold: ""
  },
};

function updateFloorInfo(setOccupancyData){
  // Fetch room occupancy data for a specific time interval
  const fetchOccupancyData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/rooms/occupancy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch occupancy data');
      }
      const data = await response.json();
      //console.log(data);
      data.forEach(room => {
        const roomId = room.room_id; // assuming each room object has a room_id
        if (roomId === null) {
          //console.log("was null");
          return;
        }

        if (floorInfo[roomId]) {
          floorInfo[roomId].occupancy = room.occupancy; // assuming room.occupancy is an array
        }

      });

      //console.log(floorInfo);
      setOccupancyData(data);
    } catch (error) {
      console.error('Error fetching occupancy data:', error);
    }
  };
  fetchOccupancyData();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch occupancy data');
      }
      const data = await response.json();
      //console.log(data);
      data.forEach(room => {
        const roomId = room.room_id; // assuming each room object has a room_id
        if (roomId === null) {
          //console.log("was null");
          return;
        }

        if (floorInfo[roomId]) {
          floorInfo[roomId].name = room.room_name; // assuming room.occupancy is an array
          floorInfo[roomId].threshold = room.threshold; // assuming room.occupancy is an array
        }
        else {
          floorInfo[roomId] = {
              name: room.room_name,
              occupancy: [],
              threshold: room.threshold
          };
      }
      });
      fetchData();
      setOccupancyData(data);
    } catch (error) {
      console.error('Error fetching occupancy data:', error);
    }
  };
}

function RoomInformationPage() {
  const [menuOpen, setMenuOpen] = useMenuOpen(true);

  const [occupancyData, setOccupancyData] = useState([]);
  const roomId = 1;
  const startTime = '2024-04-030T00:00:00';
  const endTime = '2024-04-030T23:59:59';

  useEffect(() => {
    updateFloorInfo(setOccupancyData);
  }, []);

  function getChatData(rId) {

    const cartData = {
      labels: floorInfo[rId].occupancy.map(entry => entry.time),
      datasets: [{
        label: 'Occupancy',
        data: floorInfo[rId].occupancy.map(entry => entry.value),
      }],
    };
    return cartData
  };

  const chartOptions = {
    options: {
      animation: false,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          display: false // Hide x-axis labels
        }
      }
    }
  }

  updateFloorInfo(setOccupancyData);

  const toggleFilter = () => {
    setMenuOpen(!menuOpen);
  };


  return (
      <main>
        <div className="general-panel">
          <h1>Room information</h1>
          <p>This will be where all the graphs and such for each room will be</p>

          <Line data={getChatData(0)} options={chartOptions} />
        </div>
      </main>
  );
}

export default RoomInformationPage;
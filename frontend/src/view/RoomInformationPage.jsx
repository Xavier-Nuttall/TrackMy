import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Line} from "react-chartjs-2";

function RoomInformationPage() {
    return (
      <main>
        <div className="general-panel">
          <h1>Room information</h1>
          <p>This will be where all the graphs and such for each room will be</p>

          <Line 
            data = {{
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Revenue",
                  data: [200, 300, 400],
                }
              ],

            }}
          />
        </div>
      </main>
    );
  }

export default RoomInformationPage;
"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./dashboard.module.css";
import Popup from "../Popup/page";
import Navbar from "../Navbar/page";
import { getUserEmail } from "@/utils/getUserEmail";
import { GiAries } from "react-icons/gi";

Chart.register(...registerables);

interface NutritionData {
  name: string;
  amount: string;
  date: string;
  calories: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

const Dashboard = () => {
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [totalCalories, setTotalCalories] = useState(0);
  const dailyCalorieIntake = 2000;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = getUserEmail(); // Assuming you have a function to get the user email
        const response = await fetch(`/api/foods/fecth?userEmail=${userEmail}&filterDate=${selectedDate}`);
        if (response.ok) {
          const data = await response.json();
          setNutritionData(data);
          setTotalCalories(data.reduce((acc, item) => acc + item.calories, 0));
        } else {
          console.error("Error fetching nutrition data");
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };
  
    fetchData();
  }, [selectedDate]);

  const percentageCalories = (
    (totalCalories / dailyCalorieIntake) *
    100
  ).toFixed(2);

  const remainingCalories = Math.floor(dailyCalorieIntake - totalCalories);

  const energyProvidersData = {
    carbohydrates: nutritionData.reduce((acc, item) => acc + item.carbohydrates_total_g, 0),
    protein: nutritionData.reduce((acc, item) => acc + item.protein_g, 0),
    fat: nutritionData.reduce((acc, item) => acc + item.fat_total_g, 0),
    sugar: nutritionData.reduce((acc, item) => acc + item.sugar_g, 0),
  };

  const healthRegulatorsData = {
    fiber: nutritionData.reduce((acc, item) => acc + item.fiber_g, 0),
    cholesterol: nutritionData.reduce((acc, item) => acc + item.cholesterol_mg, 0),
    sodium: nutritionData.reduce((acc, item) => acc + item.sodium_mg, 0),
    potassium: nutritionData.reduce((acc, item) => acc + item.potassium_mg, 0),
  };

  const energyProvidersChartData = {
    labels: Object.keys(energyProvidersData),
    datasets: [
      {
        label: "Energy Providers",
        data: Object.values(energyProvidersData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const healthRegulatorsChartData = {
    labels: Object.keys(healthRegulatorsData),
    datasets: [
      {
        label: "Health Regulators",
        data: Object.values(healthRegulatorsData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const barChartData = {
    labels: nutritionData.map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1)),
    datasets: [
      {
        label: "Calories",
        data: nutritionData.map((item) => item.calories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966CC",
          "#FF8C00",
          "#87CEEB",
          "#FFD700",
          "#32CD32",
          "#FF69B4",
        ],
      },
    ],
    options: {
      scales: {
        x: {
          type: "category",
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial, sans-serif",
              size: 14,
              color: "#fff",
            },
          },
        },
      },
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: 14,
      defaultFontColor: "#fff",
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const pieChartData = {
    labels: [
      "Carbohydrates",
      "Protein",
      "Fat",
      "Calories",
      "Sodium",
      "Fat Saturate",
      "Cholesterol",
      "Sugar",
      "Fiber",
      "Potassium",
    ],
    datasets: [
      {
        data: [
          nutritionData.reduce(
            (acc, item) => acc + item.carbohydrates_total_g,
            0
          ),
          nutritionData.reduce((acc, item) => acc + item.protein_g, 0),
          nutritionData.reduce((acc, item) => acc + item.fat_total_g, 0),
          totalCalories,
          nutritionData.reduce((acc, item) => acc + item.sodium_mg, 0),
          nutritionData.reduce(
            (acc, item) => acc + item.fat_saturated_g,
            0
          ),
          nutritionData.reduce((acc, item) => acc + item.cholesterol_mg, 0),
          nutritionData.reduce((acc, item) => acc + item.sugar_g, 0),
          nutritionData.reduce((acc, item) => acc + item.fiber_g, 0),
          nutritionData.reduce((acc, item) => acc + item.potassium_mg, 0),
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966CC",
          "#FF8C00",
          "#87CEEB",
          "#FFD700",
          "#32CD32",
          "#FF69B4",
        ],
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial, sans-serif",
              size: 14,
              color: "#fff",
            },
          },
        },
      },
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: 14,
      defaultFontColor: "#fff",
      responsive: true,
      maintainAspectRatio: false,
    },
  };
  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[20%] h-[100%] relative">
        <Navbar />
      </div>
      <div className="w-[80%] h-[100%] ">
      <Popup />
 
        {/* <UserData/> */}
        <div className={styles.datee}>
        <input 
          type="date"
          value={selectedDate}
          onChange={handleDateChange}

          className="px-4 pt-1 border border-gray-300 h-[1%] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className=" w-[100%] h-[78%] flex justify-around items-center px-[30px] pt-3 bg-white flex-wrap gap-4">
        <div className="w-[80%] bg-white h-[100%] flex justify-around items-center  flex-wrap gap-3">


        <div className=" flex-col w-[45%] h-[50%] flex justify-center items-centerborder-2 mb-5 items-center gap-1 ">
            <div className="w-full h-[90%] border-white shadow-lg p-3 rounded-lg">
              <Bar
                data={energyProvidersChartData}
                className="h-[100%] "
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  
                  x: {
                    ticks: {
                      color: 'black',
                      font: {
                          size: 13,
                          family: 'Calibri'
                      }
                      
                    },}
                }}}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800 bg-white border-2 border-white shadow-lg">
              <p className="">Energy Providers</p>
            </div>
          </div>
          <div className=" flex-col w-[45%] h-[50%] flex justify-center items-centerborder-2 mb-5 items-center gap-1">
            <div className="w-full h-[90%] border-white shadow-lg p-3 rounded-lg">
              <Bar
                data={healthRegulatorsChartData}
                className="h-[100%] "
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      ticks: {
                        color: 'black',
                        
                        font: {
                            size: 13,
                            family: 'Calibri'
                        },
                        
                      },}
                  },
                }}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800 bg-white border-2 border-white shadow-lg">
              <p className="">Health Regulators</p>
            </div>
          </div>{" "}
          <div className=" flex-col w-[45%] h-[50%] flex justify-center items-centerborder-2 mb-5 items-center gap-1">
            <div className="w-full h-[90%] border-white shadow-lg p-3 rounded-lg">
              <Bar
                data={barChartData}
                className="h-[100%] "
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      ticks: {
                        color: 'black',
                        font: {
                            size: 13,
                            family: 'Calibri'
                        }
                        
                      },}
                  },
                }}
              />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800 bg-white border-2 border-white shadow-lg">
              <p className="text-2xl font-semibold text-slate-800 bg-white border-2 border-white shadow-lg">
                Remaining Calories: {remainingCalories} / {dailyCalorieIntake} ({percentageCalories} %)
              </p>
            </div>
          </div>
          <div className=" flex-col w-[45%] h-[50%] flex justify-center items-centerborder-2 mb-5 items-center gap-1">
            <div className="w-full h-[90%] border-white shadow-lg p-3 rounded-lg">
              <Pie data={pieChartData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
            <div className="w-full h-[10%] flex items-center justify-center text-center text-3xl font-semibold text-slate-800 bg-white border-2 border-white shadow-lg">
              <p className="">Total Nutrition</p>
            </div>
          </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
'use client';
import Navbar from '../Navbar/page';
import styles from './details.module.css';
import React, { useState, useEffect } from 'react';
import { getUserEmail } from "@/utils/getUserEmail";
import Swal from "sweetalert2";

const API_BASE_URL = 'https://api.calorieninjas.com/v1/nutrition';
const API_KEY = 'pkDVNbTRj0kGWfyI3S4KAQ==TuUoLflj2H7Wdfh6';

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
  mealType: string;
}

export default function DetailsPage() {
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 16));
  const [nutritionData, setNutritionData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 10));
  const [mealType, setMealType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNutritionData = async (query: string) => {
    const response = await fetch(`${API_BASE_URL}?query=${query}`, {
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nutrition data');
    }

    const data = await response.json();
    return data.items[0];
  };

  useEffect(() => {
  const fetchFilteredData = async () => {
    try {
      setIsLoading(true); // Set loading state to true before fetching data
      const userEmail = getUserEmail();
      const response = await fetch(`/api/foods/fecth?userEmail=${userEmail}&filterDate=${filterDate}`);
      console.log('API response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setNutritionData(data);
      } else {
        console.error('Error fetching filtered nutrition data');
      }
    } catch (error) {
      console.error('Error fetching filtered nutrition data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  fetchFilteredData();
}, [filterDate]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (foodName.trim() && amount.trim() && mealType.trim()) {
    const query = `${foodName} ${amount}g`;
    try {
      const data = await fetchNutritionData(query);
      const {
        name,
        calories,
        fat_total_g,
        fat_saturated_g,
        protein_g,
        sodium_mg,
        potassium_mg,
        cholesterol_mg,
        carbohydrates_total_g,
        fiber_g,
        sugar_g,
      } = data;

      // Get the user ID from the session or some other source
      const userId = getUserEmail();

      const response = await fetch('/api/foods/stored', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name: foodName,
          amount: `${amount}g`,
          date: selectedDate,
          calories,
          fat_total_g,
          fat_saturated_g,
          protein_g,
          sodium_mg,
          potassium_mg,
          cholesterol_mg,
          carbohydrates_total_g,
          fiber_g,
          sugar_g,
          mealType,
        }),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Nutrition data saved successfully');
        setFoodName('');
        setAmount('');
        setMealType('');
        setShowForm(false);

        // Update the nutritionData state with the new data
        const newData = {
          _id: Date.now().toString(), // Generate a unique id for the new data
          name: foodName,
          amount: `${amount}g`,
          date: selectedDate,
          calories,
          fat_total_g,
          fat_saturated_g,
          protein_g,
          sodium_mg,
          potassium_mg,
          cholesterol_mg,
          carbohydrates_total_g,
          fiber_g,
          sugar_g,
          mealType,
        };
        Swal.fire({
          icon: "success",
          // title: "Signup Successful",
          text: "Data added Successfully !",
        });
        setNutritionData([...nutritionData, newData]);
        
      } else {
        // Handle error response
        console.error('Error saving nutrition data');
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  } else {
    // alert('Please enter a valid food name, amount, and meal type.');
    Swal.fire({
      icon: "warning",
      // title: "Signup Successful",
      text: "Please enter a valid food name, amount, and meal type.",
    });
  }
};
  const handleCancel = () => {
    setShowForm(false);
    setFoodName('');
    setAmount('');
  };

  const handleDateFilter = (e) => {
    setFilterDate(e.target.value);
  };

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(`/api/foods/stored/${itemId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedData = nutritionData.filter((item) => item._id !== itemId);
        setNutritionData(updatedData);
        console.log('Item deleted successfully');
        Swal.fire({
          icon: "success",
          // title: "Signup Successful",
          text: "Item deleted successfully",
        });
      } else {
        console.error('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const filteredData = nutritionData.filter(item => item.date.includes(filterDate));


  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[20%] h-[100%]">
        <Navbar />
      </div>
      <div className="w-[80%] h-[100%]">
        <div className="p-5">
          {showForm && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <label>
                    Food Name:
                    <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Amount (grams):
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Meal Type:
                    <select style={{padding: '3px', marginLeft: '10px', borderRadius: '10px', padding: '7px'}} value={mealType} onChange={(e) => setMealType(e.target.value)}>
                      <option value="">Select Meal Type</option>
                      {mealTypes.map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <label>
                    Date and Time:
                    <input type="datetime-local" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  </label>
                  <br />
                  <button type="submit" className={styles.subBtn}>
                    Submit
                  </button>
                  <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          <div style={{ position: 'fixed', top: '4%', left: '25%', zIndex: 1 }}>
            <div>
              
            </div>
            <span className="inline-block mr-4" style={{ color: 'black', margin: "10px", fontWeight: "500", fontSize: "20px" }}>Filter by Date:</span>
            <input type="date" style={{ color: 'black', margin: "10px", fontWeight: "500", fontSize: "20px" }} value={filterDate} onChange={handleDateFilter} />
            <button onClick={() => setShowForm(true)} style={{
              backgroundColor: 'DarkGreen',
              padding: '12px',
              fontWeight: '500',
              color: 'white',
              border: '2px solid green',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              fontSize: '22px',
              marginLeft: '1050px',
            }}>
              Add Item
            </button>
          </div>
          <div style={{ maxHeight: '860px', overflowY: 'auto', marginBottom: '10px', marginTop: '5%', borderCollapse: 'collapse' }}>
  {mealTypes.map(mealType => (
    <React.Fragment key={mealType}>
      <h2 style={{ fontWeight: "600", fontSize: "20px" }}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
      <table style={{ width: '100%', marginBottom: '20px' }}>
        <thead className={`${styles[mealType]} sticky top-0 bg-white shadow-md`}>
          <tr>
            <th style={{ width: '15%' }}>Food Name</th>
            <th style={{ width: '10%' }}>Amount</th>
            <th style={{ width: '15%' }}>Date and Time</th>
            <th style={{ width: '10%' }}>Calories</th>
            <th style={{ width: '10%' }}>Total Fat</th>
            <th style={{ width: '10%' }}>Saturated Fat</th>
            <th style={{ width: '10%' }}>Protein</th>
            <th style={{ width: '10%' }}>Sodium</th>
            <th style={{ width: '10%' }}>Potassium</th>
            <th style={{ width: '10%' }}>Cholesterol</th>
            <th style={{ width: '10%' }}>Total Carbohydrates</th>
            <th style={{ width: '10%' }}>Fiber</th>
            <th style={{ width: '10%' }}>Sugar</th>
            <th style={{ width: '10%' }}>Delete item</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData
              .filter((item) => item.mealType === mealType)
              .map((item) => (
                <tr key={item._id}>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.name}</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.amount}</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.date}</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.calories}</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.fat_total_g}g</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.fat_saturated_g}g</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.protein_g}g</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.sodium_mg}mg</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.potassium_mg}mg</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.cholesterol_mg}mg</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>
                    {item.carbohydrates_total_g}g
                  </td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.fiber_g}g</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>{item.sugar_g}g</td>
                  <td style={{ padding: '8px', border: '1px solid lightgray' }}>
                    <button onClick={() => handleDelete(item._id)} className={styles.dele}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="14" style={{ padding: '8px', border: '3px solid lightgray', textAlign: 'center' }}>
                Loading..
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}
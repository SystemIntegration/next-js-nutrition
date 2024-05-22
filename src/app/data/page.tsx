
"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/page";

const UserData = () => {
  const [lastObject, setLastObject] = useState<any>(null); // State to store the last object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();

        console.log("Fetched data:", data); // Log the fetched data here

        if (data && data.length > 0) {
          const lastItem = data[data.length - 1]; // Get the last object from the array
          console.log("Last object:", lastItem); // Log the last object
          setLastObject(lastItem); // Update state with the last object
        } else {
          console.log("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
        {lastObject ? (
          <div>
            <p>{lastObject.username.charAt(0)}</p>
            {/* <p>Email: {lastObject.email}</p>
            <p>Gender: {lastObject.gender}</p> */}
            {/* Render other properties as needed */}
          </div>
        ) : (
          <p></p>
        )}
      </div>
  );
};

export default UserData;

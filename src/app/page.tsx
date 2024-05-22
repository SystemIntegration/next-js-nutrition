"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import events from 'events';
events.defaultMaxListeners = 20;

export default function SignupPage() {
  // const [users, setUsers] = useState([]);
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });
  const [buttonisabled, setButtonisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
  
      console.log("Signup success", response.data);
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "You have successfully signed up!",
      });
      localStorage.setItem("userEmail", user.email);
      router.push("/Dashboard");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      if (
        user.email.length === 0 ||
        user.password.length === 0 ||
        user.username.length === 0 ||
        user.age.length === 0 ||
        user.gender.length === 0 ||
        user.weight.length === 0 ||
        user.height.length === 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "Please Enter Required Details",
          text: "",
        });
      } else if (error.response.status === 409 && error.response.data.error.startsWith("E11000 duplicate key error")) {
        Swal.fire({
          icon: "error",
          title: "Username already exists",
          text: "Please choose a different username.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.response.data.error,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonisabled(false);
    } else {
      setButtonisabled(true);
    }
  }, [user]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get('/api/users'); // Fetch data from API route
  //             setUsers(response.data.data); // Update state with fetched data
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchData(); // Call fetch function when component mounts
  // }, []);

  return (
    <div className="w-[100vw] bg-gray-50 h-[100vh] flex justify-center items-center">
      <div className="bg-white w-[30%] border-2 border-white shadow-2xl p-9 rounded-lg">
        <h1 className="text-center text-2xl pb-5 font-medium">Welcome User</h1>
        {/* <br/> */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username "
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password "
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="gender">Gender</label>
        <div className=" flex items-center justify-between w-[50%] mb-4">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={user.gender === "male"}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          />
          Male
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={user.gender === "female"}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          />
          Female
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={user.gender === "other"}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          />
          Other
        </div>

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          id="weight"
          value={user.weight}
          onChange={(e) => setUser({ ...user, weight: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          id="height"
          value={user.height}
          onChange={(e) => setUser({ ...user, height: e.target.value })}
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black w-full py-3"
        />
        {/* <button onClick={onSignup}>{buttonisabled ? "No signup" :"Sign up"}</button> */}
        <br />
        <p className="text-center text-lg">
          Have an account?
          <span className="text-green-500">
            <Link href="/login"> Sign In</Link>
          </span>
        </p>
        <button
          onClick={onSignup}
          className="bg-green-500 p-3 font-bold text-white border-2 border-green-500 shadow-lg rounded-[4px] text-xl w-full mt-4"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

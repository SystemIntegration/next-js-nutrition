"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { getUserEmail } from "@/utils/getUserEmail";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const logout = async () => {
    try {
      const userEmail = getUserEmail();
      const response = await axios.get(`/api/users/logout?userEmail=${userEmail}`);

      if (response.status === 200) {
        setUserData(null); // Clear user data on successful logout
        router.push("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (showPopup) {
        try {
          const userEmail = getUserEmail();
          const response = await axios.get(`/api/users/logout?userEmail=${userEmail}`);

          if (response.status === 200) {
            setUserData(response.data);
          } else {
            console.error("Error fetching user data:", response.data.error);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };

    fetchUserData();
  }, [showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div
        className=" w-[100%] h-[10%] text-right text-2xl font-semibold text-slate-800 flex items-center justify-end bg-white border-2 border-white "
        onClick={togglePopup}
      >
        <button
          className="bg-green-500 p-2 w-[3%] rounded-full text-white border-2 border-gray-600 shadow-2xl mr-2"
          style={{ borderRadius: "50%" }}
        >
          <FaRegUser />
        </button>
      </div>
      {showPopup && userData && (
        <div className="absolute top-[11%] right-[1%] transform[-50%] bg-gray-100 text-black rounded-md p-8 shadow-lg w-[20%]">
          <div className="text-xl">
            <p className="font-bold">
              Name :{" "}
              <span className="font-medium">{userData?.username || "N/A"}</span>
            </p>
            <p className="font-bold pt-3">
              Email : <span className="font-medium">{userData?.email || "N/A"}</span>
            </p>
            {userData?.gender && (
              <p className="font-bold pt-3">
                Gender :{" "}
                <span className="font-medium">
                  {userData.gender.charAt(0).toUpperCase() +
                    userData.gender.slice(1)}
                </span>
              </p>
            )}
            <p className="font-bold pt-3">
              Age : <span className="font-medium">{userData?.age || "N/A"}</span>
            </p>
            <p className="font-bold pt-3">
              Weight :{" "}
              <span className="font-medium">{userData?.weight || "N/A"}</span>
            </p>
            <p className="font-bold pt-2">
              Height :{" "}
              <span className="font-medium">{userData?.height || "N/A"}</span>
            </p>
            <div className="flex items-center justify-between w-[100%] text-2xl text-white rounded-md m-auto mt-3">
              <button
                className="bg-green-500 p-1 w-full rounded-md "
                onClick={logout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
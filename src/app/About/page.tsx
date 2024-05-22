"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./about.module.css";
import Popup from "../Popup/page";
import Navbar from "../Navbar/page";



const Dashboard = () => {

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[20%] h-[100%] relative">
        <Navbar />
      </div>
      <div className="w-[80%] h-[100% ">
      <div className="w-[100%] h-[10%] text-right text-2xl font-semibold text-slate-800 flex items-center justify-end  bg-white border-2 border-white shadow-lg ">

        <Popup/>
      </div>
      <div className="w-[100%] h-[90%] px-28 pt-7">
      <h1 className={styles.title}>Welcome to BMV Nutrition Tracker</h1>
      <p className={styles.description}>
          a cutting-edge application developed by Akhil Viradiya and Meghana Dhanani, seasoned software developers at BMV System Integration Pvt. Ltd.
        </p>
        <p className={styles.description}>
          At BMV System Integration Pvt. Ltd., headquartered at A-503 The First, Behind The ITC Narmada Hotel, Keshavbaug Party Plot, Off, 132 Feet Ring Rd, Vastrapur, Ahmedabad, Gujarat 380015, we are dedicated to crafting innovative solutions that enhance your daily life.
        </p>
        <p className={styles.description}>
          Our nutrition tracker application is powered by Next.js and TypeScript, ensuring a seamless user experience. Leveraging MongoDB as our backend database, we offer robust data storage and retrieval capabilities, guaranteeing the precision and reliability of your nutrition tracking.
        </p>
        <p className={styles.description}>
          With our intuitive dashboard, users can effortlessly monitor their daily nutrition intake through interactive charts, gaining valuable insights into their dietary habits over time. Our user-friendly interface simplifies the process of adding foods to your feed, facilitating accurate tracking of your nutritional intake.
        </p>
        <p className={styles.description}>
          Furthermore, we prioritize user engagement and satisfaction by implementing email notifications upon signup, keeping you informed and motivated on your journey towards a healthier lifestyle.
        </p>
        <p className={styles.description}>
          Experience the power of BMV Nutrition Tracker today and take control of your nutrition with our comprehensive and efficient tracking solution. For any inquiries or assistance, feel free to reach out to us at <a href="mailto:info@systemintegration.in">info@systemintegration.in</a> or give us a call at <a href="tel:+917940396039">07940396039</a>. Join us now and embark on a journey towards better health and wellness!
        </p>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
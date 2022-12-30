import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

const pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) ? JSON.parse(localStorage.getItem("pendingRequests")) : 1;
const authenticationRequestList = JSON.parse(
    localStorage.getItem("authenticationRequestList")
) ? JSON.parse(
    localStorage.getItem("authenticationRequestList")
) : 1;
const authenticSellerList = JSON.parse(localStorage.getItem("authenticSellerListData")) ? JSON.parse(localStorage.getItem("authenticSellerListData")) : 1;
export default function ManufacturerChart() {
    return <Doughnut data={data} />;
}

export const data = {
    labels: [
        "Pending Product Requests",
        "Authentic Sellers",
        "Pending Authentication Requests",
    ],
    datasets: [
        {
            label: "My First Dataset",
            data: [pendingRequests.length, authenticSellerList.length, authenticationRequestList.length],
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(153, 102, 255)",
                "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
            hoverBorderWidth: 2,
        },
    ],
};

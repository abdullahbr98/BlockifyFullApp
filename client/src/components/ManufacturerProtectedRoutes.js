import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage"

export default function ManufacturerProtectedRoutes() {
  return (
    <div>
        <Route path="/register" element={<SignUpPage />} />
    </div>
  )
}

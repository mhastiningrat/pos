
import React, { useState } from 'react'

import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {

  return (
    <>
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
    <Navbar/>
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 h-full"
      >
        <Outlet/>
      </div>
    </main>
  </div>
    </>
   
  )
}

export default MainLayout
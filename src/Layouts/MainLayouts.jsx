import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
	return (
		<>
		<Navbar/>
		<div className="grid grid-cols-2 gap-4">
			{/* Sidebar */}
			

			
			<Sidebar />

			{/* Konten Halaman */}
			{/* fix type make changes */}
			<div className="p-4 sm:ml-64 col-span-5">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 w-full h-3/4 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
		</>
		
	);
};

export default MainLayout;

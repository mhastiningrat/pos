import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
	FaHome,
	FaBox,
	FaShoppingCart,
	FaChartBar,
	FaSignOutAlt,
	FaChevronDown,
	FaChevronUp,
} from "react-icons/fa";

import 'flowbite'

const Sidebar = () => {
	const location = useLocation();
	const [isMasterMenuOpen, setIsMasterMenuOpen] = useState(false);

	const toggleMasterMenu = () => {
		setIsMasterMenuOpen((prev) => !prev);
	  };

	const menuItems = [
		{ name: "Dashboard", path: "/dashboard", icon: <FaHome size={20} /> },
		{
			name: "Master",
			iconPop: isMasterMenuOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />,
			onClick: toggleMasterMenu,
			icon: <FaBox size={20} />,
			submenu: [
			  { name: "Master Account", path: "/masteraccount", icon: <FaBox size={20} /> },
			  { name: "Master Category", path: "/mastercategory", icon: <FaBox size={20} /> },
			  { name: "Master Barang", path: "/masterbarang", icon: <FaBox size={20} /> },
			],
		  },
		{
			name: "Transaksi",
			path: "/transaction-kulak",
			icon: <FaShoppingCart size={20} />,
		},
		// { name: "Laporan", path: "/report", icon: <FaChartBar size={20} /> },
		{ name: "Logout", path: "/", icon: <FaSignOutAlt size={20} /> },
	];

	return (
		<>
		<button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
			<span className="sr-only">Open sidebar</span>
			<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
			</svg>
		</button>
		<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
			<div className="p-4 font-bold text-xl text-center border-b ">
				Candra POS
			</div>
			<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
				<nav className="mt-4 flex-1">
				{menuItems.map((item, index) =>
					item.submenu ? (
						<div key={index}>
						<button
							onClick={item.onClick}
							className={`flex items-center p-4 hover:bg-green-500 transition-colors w-full ${
							location.pathname.startsWith(item.path) ? "bg-green-500" : ""
							}`}
						>
							{item.icon}
							<span className="ml-3 flex justify-between w-full">{item.name}{item.iconPop ? item.iconPop : ""}</span>
							
						</button>
						{isMasterMenuOpen && (
							<div className="pl-6">
							{item.submenu.map((subItem, subIndex) => (
								<Link
								key={subIndex}
								to={subItem.path}
								className={`flex items-center p-4 hover:bg-green-500 transition-colors ${
									location.pathname === subItem.path ? "bg-green-500" : ""
								}`}
								>
								{subItem.icon}
								<span className="ml-3">{subItem.name}</span>
								</Link>
							))}
							</div>
						)}
						</div>
					) : (
						<Link
						key={index}
						to={item.path}
						className={`flex items-center p-4 hover:bg-green-500 transition-colors ${
							location.pathname === item.path ? "bg-green-500" : ""
						}`}
						>
						{item.icon}
						<span className="ml-3">{item.name}</span>
						</Link>
					)
					)}
				</nav>
			</div>
			
		</aside>
		</>
		
	);
};

export default Sidebar;

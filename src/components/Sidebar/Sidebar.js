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

const Sidebar = ({sideBarOpen}) => {
	const location = useLocation();
	const [isMasterMenuOpen, setIsMasterMenuOpen] = useState(false);

	const toggleMasterMenu = () => {
		setIsMasterMenuOpen((prev) => !prev);
	};

	const [isTransactionMenuOpen, setIsTransactionMenuOpen] = useState(false);

  	const toggleTransactionMenu = () => {
		setIsTransactionMenuOpen((prev) => !prev);
	};

	const menuItems = [
		{ name: "Dashboard", path: "/dashboard", icon: <FaHome size={20} /> },
		{
			name: "Master",
      		state:isMasterMenuOpen,
			iconPop: isMasterMenuOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} color="#a4a4a4"/>,
			onClick: toggleMasterMenu,
			icon: <FaBox size={20} color="#a4a4a4"/>,
			submenu: [
			  { name: "Master Account", path: "/masteraccount", icon: <FaBox size={20} color="#a4a4a4"/> },
			  { name: "Master Category", path: "/mastercategory", icon: <FaBox size={20} color="#a4a4a4"/> },
			  { name: "Master Barang", path: "/masterbarang", icon: <FaBox size={20} color="#a4a4a4"/> },
			],
		},
      	{
			name: "Transaksi",
			state:isTransactionMenuOpen,
			iconPop: isTransactionMenuOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} color="#a4a4a4"/>,
			onClick: toggleTransactionMenu,
			icon: <FaShoppingCart size={20} color="#a4a4a4"/>,
			submenu: [
			{ name: "Transaksi Kulak", path: "/transaction-kulak", icon: <FaShoppingCart size={20} color="#a4a4a4"/> },
			{ name: "Transaksi Jual", path: "/transaction-sales", icon: <FaShoppingCart size={20} color="#a4a4a4"/> },
			],
        },
	];

	return (
		<>
			<aside
			className={"fixed top-0 left-0 z-10 w-64 h-screen pt-14 transition-transform md:translate-x-0 " + (sideBarOpen ? "":"-translate-x-full") +" bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:"} 
			aria-label="Sidenav"
			id="drawer-navigation"
			>
			<div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
				<ul className="space-y-2">
					{menuItems.map((item, index) =>
						item.submenu ? (
							<li key={index}>
							<button
								onClick={item.onClick}
								className={`flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
								location.pathname.startsWith(item.path) ? "bg-gray-100" : ""
								}`}
							>
								{item.icon}
								<span className="ml-3 flex justify-between w-full">{item.name}{item.iconPop ? item.iconPop : ""}</span>
								
							</button>
							<ul>
								{item.state && (
									<li className="pl-6">
									{item.submenu.map((subItem, subIndex) => (
										<Link
										key={subIndex}
										to={subItem.path}
										className={`flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
											location.pathname === subItem.path ? "bg-gray-1000" : ""
										}`}
										>
										{subItem.icon}
										<span className="ml-3">{subItem.name}</span>
										</Link>
									))}
									</li>
								)}
							</ul>
							
							</li>
						) : (
							<Link
							key={index}
							to={item.path}
							className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
								location.pathname === item.path ? "bg-gray-100" : ""
							}`}
							>
							{item.icon}
							<span className="ml-3">{item.name}</span>
							</Link>
						)
						)
					}
				</ul>
			</div>
			</aside>
		</>
		
	);
};

export default Sidebar;

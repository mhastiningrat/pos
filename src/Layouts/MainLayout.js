
import React, { useState } from 'react'
import {
	FaHome,
	FaBox,
	FaShoppingCart,
	FaChartBar,
	FaSignOutAlt,
	FaChevronDown,
	FaChevronUp,
} from "react-icons/fa";
import logods from "../media/logods.png"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarOpen,setSideBarOpen] = useState(false);
  const [userMenu,setUserMenu] = useState(false);
	const [isMasterMenuOpen, setIsMasterMenuOpen] = useState(false);
	const [isTransactionMenuOpen, setIsTransactionMenuOpen] = useState(false);

	const toggleMasterMenu = () => {
		setIsMasterMenuOpen((prev) => !prev);
	};

  const toggleTransactionMenu = () => {
		setIsTransactionMenuOpen((prev) => !prev);
	};

  const toggleSideBar = () => {
		setSideBarOpen((prev) => !prev);
	};

  const toggleUser = () => {
		setUserMenu((prev) => !prev);
	};

  const logout = () => {
    localStorage.removeItem("unknown");
    navigate("/")
  }

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
	
		// { name: "Laporan", path: "/report", icon: <FaChartBar size={20} /> },
		// { name: "Logout", path: "/", icon: <FaSignOutAlt size={20} /> },
	];


  return (
    <>
     <div className="antialiased bg-gray-50 dark:bg-gray-900">
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-30">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={toggleSideBar}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              //xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              //xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <a href="https://flowbite.com" className="flex items-center justify-between mr-4">
            <img
              src={logods}
              className="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Double M Stationary</span>
          </a>
        </div>
        <div className="flex items-center lg:order-2">
          <div className='z-50 relative inline-block text-left'>
            <button
              type="button"
              className="z-10 flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
              onClick={toggleUser}
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user photo"
              />
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              className={"absolute right-0 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl" + (userMenu ? " ":" hidden")} 
              style={{ }}
              id="dropdown"
            > 
              <div className="py-3 px-4">
                <span
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                  >Admin</span
                >
                
              </div>
              <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
              >
                {/* <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >My profile</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >Account settings</a
                  >
                </li> */}
              </ul>
              
              <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
              >
                <li>
                  <a
                    href="#" type='button'
                    onClick={()=>logout()}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* <!-- Sidebar --> */}

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

    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 h-full"
      ><Outlet/></div>
      
    </main>
  </div>
    </>
   
  )
}

export default MainLayout
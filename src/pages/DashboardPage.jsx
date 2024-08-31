import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import DashboardCard from "../components/Dashboard/DashboardCard";
import SalesChart from "../components/Dashboard/SalesChart";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import { FaShoppingCart, FaMoneyBillWave, FaBox } from "react-icons/fa";

const DashboardPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Dashboard</h2>

			{/* Cards Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<DashboardCard
					title="Total Penjualan"
					value="Rp 1,500,000"
					icon={<FaMoneyBillWave size={24} />}
				/>
				<DashboardCard
					title="Jumlah Transaksi"
					value="15"
					icon={<FaShoppingCart size={24} />}
				/>
				<DashboardCard
					title="Total Produk"
					value="50"
					icon={<FaBox size={24} />}
				/>
			</div>

			{/* Sales Chart */}
			{/* <div className="mb-8">
				<SalesChart />
			</div> */}

			{/* Recent Transactions */}
			<div>
				<RecentTransactions />
			</div>
		</div>
	);
};

export default DashboardPage;

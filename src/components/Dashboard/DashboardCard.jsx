import React from "react";

const DashboardCard = ({ title, value, icon }) => {
	return (
		<div className="bg-white p-4 rounded shadow-md flex items-center">
			<div className="p-3 bg-green-500 text-white rounded-lg">{icon}</div>
			<div className="ml-4">
				<h4 className="text-lg font-semibold">{title}</h4>
				<p className="text-2xl font-bold">{value}</p>
			</div>
		</div>
	);
};

export default DashboardCard;

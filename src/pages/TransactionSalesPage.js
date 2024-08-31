import { useNavigate } from "react-router-dom";
import TransactionSalesList from "../components/Transactions/TransactionSales/TransactionSalesList";
import { useEffect } from "react";

const TransactionSalesPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Transaksi Penjualan Barang</h2>
			<TransactionSalesList/>
		</div>
	);
};

export default TransactionSalesPage;

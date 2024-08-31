import { useNavigate } from "react-router-dom";
import TransactionKulakList from "../components/Transactions/TransactionKulak/TransactionKulakList";
import { useEffect } from "react";

const TransactionKulakPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Transaksi Kulak Barang</h2>
			<TransactionKulakList/>
		</div>
	);
};

export default TransactionKulakPage;

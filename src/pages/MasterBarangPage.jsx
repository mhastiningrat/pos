import { useNavigate } from "react-router-dom";
import ProductList from "../components/Master/Product/ProductList";
import { useEffect } from "react";

const MasterPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Master Barang</h2>
			<ProductList />
		</div>
	);
};

export default MasterPage;

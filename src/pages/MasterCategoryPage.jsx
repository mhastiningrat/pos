import { useNavigate } from "react-router-dom";
import CategoryList from "../components/Master/Category/CategoryList";
import { useEffect } from "react";



const MasterCategoryPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Master Category</h2>
			<CategoryList />
		</div>
	);
};

export default MasterCategoryPage;

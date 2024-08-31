import { useNavigate } from "react-router-dom";
import AccountList from "../components/Master/Account/AccountList";
import { useEffect } from "react";



const MasterAccountPage = () => {
	const navigate = useNavigate();

	useEffect(()=>{
		if(localStorage.getItem("unknown") === null){
			navigate("/")
		}
	},[])
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Master Account</h2>
			<AccountList />
		</div>
	);
};

export default MasterAccountPage;

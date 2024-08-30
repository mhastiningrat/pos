import TransactionKulakForm from "../components/Transactions/TransactionKulakForm";
import TransactionKulakList from "../components/Transactions/TransactionKulakList";

const TransactionPage = () => {
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Transaksi Kulak Barang</h2>
			<TransactionKulakForm />
			<TransactionKulakList />
		</div>
	);
};

export default TransactionPage;

import ProductList from "../components/Master/Product/ProductList";

const MasterPage = () => {
	return (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Master Barang</h2>
			<ProductList />
		</div>
	);
};

export default MasterPage;

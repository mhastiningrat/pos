const TransactionKulakForm = () => {
	return (
		<div className="mb-4 p-4 border rounded bg-white">
			<h3 className="text-lg font-semibold mb-2">Form Transaksi Kulak</h3>
			<form>
				<div className="mb-2">
					<input
						type="text"
						placeholder="Nama Barang"
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-2">
					<input
						type="number"
						placeholder="Jumlah"
						className="w-full p-2 border rounded"
					/>
				</div>

				<div className="mb-2">
					<input
						type="number"
						placeholder="Harga Satuan"
						className="w-full p-2 border rounded"
					/>
				</div>
				<button className="bg-blue-500 text-white px-4 py-2 rounded">
					Tambah Barang Kulakan
				</button>
			</form>
		</div>
	);
};

export default TransactionKulakForm;

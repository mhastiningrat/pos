import React from "react";

const TransactionKulakList = () => {
	// Contoh data transaksi yang bisa diambil dari API atau state
	const transactions = [
		{
			id: 1,
			product: "Produk A",
			qty: 2,
			satuan: 10000,
			total: 20000,
			date: "2024-08-19",
		},
		{
			id: 2,
			product: "Produk B",
			qty: 1,
			satuan: 15000,
			total: 15000,
			date: "2024-08-19",
		},
		{
			id: 3,
			product: "Produk C",
			qty: 3,
			satuan: 20000,
			total: 60000,
			date: "2024-08-18",
		},
	];

	return (
		<div className="mt-4 p-4 border rounded bg-white">
			<div className="flex justify-between mb-10">
				<h3 className="text-lg font-semibold mb-2">Riwayat Kulak Barang</h3>
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Cari Barang"
						className="w-25 p-2 border rounded "
					/>
					<button className="bg-orange-400 text-white px-4 py-2 rounded">
						Cari
					</button>
					<button className="bg-green-400 text-white px-4 py-2 rounded">
						Print
					</button>
				</div>
			</div>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Nama Produk</th>
						<th className="py-2 px-4 border-b">Jumlah</th>
						<th className="py-2 px-4 border-b">Harga Satuan</th>
						<th className="py-2 px-4 border-b">Total Harga</th>
						<th className="py-2 px-4 border-b">Tanggal</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td className="py-2 px-4 border-b text-center">
								{transaction.id}
							</td>
							<td className="py-2 px-4 border-b">{transaction.product}</td>
							<td className="py-2 px-4 border-b text-center">
								{transaction.qty}
							</td>
							<td className="py-2 px-4 border-b">
								Rp {transaction.satuan.toLocaleString()}
							</td>
							<td className="py-2 px-4 border-b">
								Rp {transaction.total.toLocaleString()}
							</td>
							<td className="py-2 px-4 border-b text-center">
								{transaction.date}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TransactionKulakList;

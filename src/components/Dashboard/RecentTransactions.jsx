import React from "react";

const RecentTransactions = () => {
	const transactions = [
		{
			id: 1,
			product: "Produk A",
			quantity: 2,
			total: 20000,
			date: "2024-08-19",
		},
		{
			id: 2,
			product: "Produk B",
			quantity: 1,
			total: 15000,
			date: "2024-08-19",
		},
		{
			id: 3,
			product: "Produk C",
			quantity: 3,
			total: 60000,
			date: "2024-08-18",
		},
	];

	return (
		<div className="bg-white p-4 rounded shadow-md">
			<h3 className="text-lg font-semibold mb-4">Transaksi Terbaru</h3>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Nama Produk</th>
						<th className="py-2 px-4 border-b">Jumlah</th>
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
								{transaction.quantity}
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

export default RecentTransactions;

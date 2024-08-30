import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Utilities/Loading'
import env from '../../../config/environment';
import Modal from '../../Utilities/Modal';

const ProductList = () => {
    const [loading,setLoading] = useState(false);
    const [product,setproduct] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
	const [nama,setNama] = useState("");
	const [deskripsi,setDeskripsi] = useState("");
	const [idUpdate,setIdUpdate] = useState(0);
	const [namaUpdate,setNamaUpdate] = useState("");
	const [deskripsiUpdate,setDeskripsiUpdate] = useState("");

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

	const openModalUpdate = () => setIsModalOpenUpdate(true);
  	const closeModalUpdate = () => setIsModalOpenUpdate(false);

    const getproduct = async() => {
        setLoading(true);
        try {
            let data = await axios.get(env.api + 'master/product');
            if(data && data.data.code == 200){
                setproduct(data.data.values);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

	const addproduct = async(e) =>{
		e.preventDefault();
		setLoading(true);
		try {
			let payload = {
				"name": nama,
  				"description": deskripsi
			}

			if(nama == "" && deskripsi == ""){
				alert("Nama dan deskripsi tidak boleh kosong");
				return;
			}

			await axios.post(env.api + 'master/product',payload);
			getproduct();
			closeModal();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);

		}
	}

	const deleteproduct = async(id) => {
		
		try {
			await axios.delete(env.api + 'master/product',{
				headers: {
				  'Content-Type': 'application/json'
				},
				data: {
				  id: id
				}
				});
			getproduct();
		} catch (error) {
			alert(error.message);
		}
	}

	const updateproduct = async() => {
		if((namaUpdate == "" && deskripsiUpdate == "") || namaUpdate == "" || deskripsiUpdate == ""){
			alert("Nama dan deskripsi tidak boleh kosong");
			return;
		}
		setLoading(true);
		try {
			await axios.put(env.api + 'master/product',{
				id: idUpdate,
				name:namaUpdate,
				description: deskripsiUpdate
			  },{
				headers: {
				  'Content-Type': 'application/json'
				}}
				);
			getproduct();
			closeModalUpdate();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);
		}
	}

    useEffect(()=>{
        getproduct();
    },[])
  return (
    <>
        {loading ? <Loading/> : ""}
        <div className="mt-4 p-4 border rounded bg-white overflow-x-auto ">
			<div className="flex justify-between mb-10">
				<h3 className="text-lg font-semibold mb-2">Daftar Barang</h3>
				<div className="flex gap-2 items-center">
					
                    <button className="bg-green-400 text-white px-4 py-2 rounded" onClick={openModal}>
						Tambah product
					</button>
				</div>
			</div>
			

			<div className="relative shadow-md sm:rounded-lg">
				<div className="pb-4 bg-white ">
					<label htmlFor="table-search" className="sr-only">Search</label>
					<div className="relative mt-1">
						<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
							</svg>
						</div>
						<input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
					</div>
				</div>
				<table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
						<tr>
							<th scope="col" className="px-6 py-3">
								NO
							</th>
							<th scope="col" className="px-6 py-3">
								Nama Barang
							</th>
							<th scope="col" className="px-6 py-3">
								Deskripsi
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Qty
							</th>
							<th scope="col" className="px-6 py-3">
								Harga
							</th>
							<th scope="col" className="px-6 py-3">
								Harga Kulak
							</th>
							<th scope="col" className="px-6 py-3">
								Margin
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{product.map((product,idx) => (
							<tr key={product.id} className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
								<th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
									{idx + 1}
								</th>
								<td className="px-6 py-4">
									{product.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{product.description}
								</td>
								<td className="px-6 py-4">
									{product.categoryName}
								</td>
								<td className="px-6 py-4">
									{product.quantity}
								</td>
								<td className="px-6 py-4">
									{product.price}
								</td>
								<td className="px-6 py-4">
									{product.buyPrice}
								</td>
								<td className="px-6 py-4">
									{product.margin}
								</td>
								<td className="px-6 py-4">
									<a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
							</tr>
						))}
						
					</tbody>
				</table>
			</div>

			
		</div>

		<Modal isOpen={isModalOpen} onClose={closeModal}>
			<h2 className="text-lg font-bold mb-10">Tambah product</h2>
			
			<div className="flex gap-2 items-center justify-between mb-2 w-full">
				<label className="w-50">Nama</label>
				<input
					type="text"
					placeholder="nama"
					className="w-50 p-2 border rounded "
					onChange={(e)=>setNama(e.target.value)}
				/>
						
			</div>
			<div className="flex gap-2 items-center justify-between mb-2 w-full">
				<label className="w-50"	>Deskripsi</label>
				<input
					type="text"
					placeholder="deskripsi"
					className="w-50 p-2 border rounded "
					onChange={(e)=>setDeskripsi(e.target.value)}
				/>
						
			</div>
			<div className='flex justify-between mt-14'>
				<button
				onClick={closeModal}
				className="mt-4 bg-red-500 text-white p-2 rounded"
				>
				Close Modal
				</button>
				<button
				onClick={(e)=>addproduct(e)}
				className="mt-4 bg-green-500 text-white p-2 rounded"
				>
				Simpan
				</button>
			</div>			
			
		</Modal>

		<Modal isOpen={isModalOpenUpdate} onClose={closeModalUpdate}>
			<h2 className="text-lg font-bold mb-10">Update product Id {idUpdate}</h2>
			
			<div className="flex gap-2 items-center justify-between mb-2 w-full">
				<label className="w-50">Nama</label>
				<input
					type="text"
					placeholder="nama"
					className="w-50 p-2 border rounded "
					defaultValue={namaUpdate}
					onChange={(e)=>setNamaUpdate(e.target.value)}
				/>
						
			</div>
			<div className="flex gap-2 items-center justify-between mb-2 w-full">
				<label className="w-50"	>Deskripsi</label>
				<input
					type="text"
					placeholder="deskripsi"
					className="w-50 p-2 border rounded "
					defaultValue={deskripsiUpdate}
					onChange={(e)=>setDeskripsiUpdate(e.target.value)}
				/>
						
			</div>
			<div className='flex justify-between mt-14'>
				<button
				onClick={closeModalUpdate}
				className="mt-4 bg-red-500 text-white p-2 rounded"
				>
				Close Modal
				</button>
				<button
				onClick={(e)=>updateproduct(e)}
				className="mt-4 bg-blue-500 text-white p-2 rounded"
				>
				Update
				</button>
			</div>			
			
		</Modal>
    </>
    
  )
}

export default ProductList
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Utilities/Loading'
import env from '../../../config/environment';
import Modal from '../../Utilities/Modal';

const CategoryList = () => {
    const [loading,setLoading] = useState(false);
    const [category,setcategory] = useState([]);
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

    const getcategory = async() => {
        setLoading(true);
        try {
            let data = await axios.get(env.api + 'master/category');
            if(data && data.data.code == 200){
                setcategory(data.data.values);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

	const addcategory = async(e) =>{
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

			await axios.post(env.api + 'master/category',payload);
			getcategory();
			closeModal();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);

		}
	}

	const deletecategory = async(id) => {
		
		try {
			await axios.delete(env.api + 'master/category',{
				headers: {
				  'Content-Type': 'application/json'
				},
				data: {
				  id: id
				}
				});
			getcategory();
		} catch (error) {
			alert(error.message);
		}
	}

	const updatecategory = async() => {
		if((namaUpdate == "" && deskripsiUpdate == "") || namaUpdate == "" || deskripsiUpdate == ""){
			alert("Nama dan deskripsi tidak boleh kosong");
			return;
		}
		setLoading(true);
		try {
			await axios.put(env.api + 'master/category',{
				id: idUpdate,
				name:namaUpdate,
				description: deskripsiUpdate
			  },{
				headers: {
				  'Content-Type': 'application/json'
				}}
				);
			getcategory();
			closeModalUpdate();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);
		}
	}

    useEffect(()=>{
        getcategory();
    },[])
  return (
    <>
        {loading ? <Loading/> : ""}

		<div className="mt-4 p-4 border rounded bg-white overflow-x-auto ">
			<div className="flex justify-between mb-10">
				<h3 className="text-lg font-semibold mb-2">Daftar Kategori</h3>
				<div className="flex gap-2 items-center">
					
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>{openModal()}}>
						Tambah Kategori
					</button>
				</div>
			</div>
			

			<div className="relative shadow-md sm:rounded-lg">
				<div className="pb-4 bg-white ">
					<label htmlFor="table-search" className="sr-only">Search</label>
					<div className="relative mt-1">
						<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
							</svg>
						</div>
						<input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari kategori ..."/>
					</div>
				</div>
				<table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
						<tr>
							<th scope="col" className="px-6 py-3 text-left">
								NO
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Kategori
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Deskripsi
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{category.map((category,idx) => (
							<tr key={category.id} className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
								<th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-left">
									{idx + 1}
								</th>
								<td className="px-6 py-4 text-center">
									{category.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									{category.description}
								</td>
								<td className="px-6 py-4 text-center">
									<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
									onClick={()=>{
										openModalUpdate();
										setIdUpdate(category.id);
										setNamaUpdate(category.name);
										setDeskripsiUpdate(category.description)}}>
										Edit
									</button>
									<button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
									onClick={()=>deletecategory(category.id)}>
										Hapus
									</button>
								</td>
							</tr>
						))}
						
					</tbody>
				</table>
			</div>

			
		</div>

		<Modal isOpen={isModalOpen} onClose={closeModal}>
			<h2 className="text-lg font-bold mb-10">Tambah Kategori</h2>
			
			<div className="grid gap-4 mb-4 grid-cols-2">
				<div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                    <input  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok" required="" onChange={(e)=>setNama(e.target.value)}/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                    <input  type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok isi 12" required="" onChange={(e)=>setDeskripsi(e.target.value)}/>
                </div>
			</div>
			<div className='flex justify-between mt-14'>
				<button
				onClick={closeModal}
				className="mt-4 bg-red-500 text-white p-2 rounded"
				>
				Close
				</button>
				<button
				onClick={(e)=>addcategory(e)}
				className="mt-4 bg-green-500 text-white p-2 rounded"
				>
				Simpan
				</button>
			</div>			
			
		</Modal>

		<Modal isOpen={isModalOpenUpdate} onClose={closeModalUpdate}>
			<h2 className="text-lg font-bold mb-10">Update Kategori Id {idUpdate}</h2>
			
			<div className="grid gap-4 mb-4 grid-cols-2">
				<div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                    <input defaultValue={namaUpdate} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok" required="" onChange={(e)=>setNamaUpdate(e.target.value)}/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                    <input defaultValue={deskripsiUpdate} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok isi 12" required="" onChange={(e)=>setDeskripsiUpdate(e.target.value)}/>
                </div>
			</div>
			<div className='flex justify-between mt-14'>
				<button
				onClick={closeModalUpdate}
				className="mt-4 bg-red-500 text-white p-2 rounded"
				>
				Close
				</button>
				<button
				onClick={(e)=>updatecategory(e)}
				className="mt-4 bg-blue-500 text-white p-2 rounded"
				>
				Update
				</button>
			</div>			
			
		</Modal>
    </>
    
  )
}

export default CategoryList
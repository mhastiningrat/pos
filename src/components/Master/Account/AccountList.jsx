import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Utilities/Loading'
import env from '../../../config/environment';
import Modal from '../../Utilities/Modal';

const AccountList = () => {
    const [loading,setLoading] = useState(false);
    const [account,setAccount] = useState([]);
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

    const getAccount = async() => {
        setLoading(true);
        try {
            let data = await axios.get(env.api + 'master/account');
            if(data && data.data.code == 200){
                setAccount(data.data.values);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

	const addAccount = async(e) =>{
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

			await axios.post(env.api + 'master/account',payload);
			getAccount();
			closeModal();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);

		}
	}

	const deleteAccount = async(id) => {
		
		try {
			await axios.delete(env.api + 'master/account',{
				headers: {
				  'Content-Type': 'application/json'
				},
				data: {
				  id: id
				}
				});
			getAccount();
		} catch (error) {
			alert(error.message);
		}
	}

	const updateAccount = async() => {
		if((namaUpdate == "" && deskripsiUpdate == "") || namaUpdate == "" || deskripsiUpdate == ""){
			alert("Nama dan deskripsi tidak boleh kosong");
			return;
		}
		setLoading(true);
		try {
			await axios.put(env.api + 'master/account',{
				id: idUpdate,
				name:namaUpdate,
				description: deskripsiUpdate
			  },{
				headers: {
				  'Content-Type': 'application/json'
				}}
				);
			getAccount();
			closeModalUpdate();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);
		}
	}

    useEffect(()=>{
        getAccount();
    },[])
  return (
    <>
        {loading ? <Loading/> : ""}
        <div className="mt-4 p-4 border rounded bg-white">
			<div className="flex justify-between mb-10">
				<h3 className="text-lg font-semibold mb-2">Daftar Barang</h3>
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Cari Barang"
						className="w-25 p-2 border rounded "
					/>
					<button className="bg-orange-400 text-white px-4 py-2 rounded">
						Cari
					</button>
                    <button className="bg-green-400 text-white px-4 py-2 rounded" onClick={openModal}>
						Tambah Account
					</button>
				</div>
			</div>

			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b text-left">Nama Account</th>
						<th className="py-2 px-4 border-b text-left">Deskripsi</th>
						<th className="py-2 px-4 border-b text-right">Action</th>
					</tr>
				</thead>
				<tbody>
					{account.map((account,idx) => (
						<tr key={account.id}>
							<td className="py-2 px-4 border-b text-center">{idx+1}</td>
							<td className="py-2 px-4 border-b">{account.name}</td>
							<td className="py-2 px-4 border-b">{account.description}</td>
							<td className="py-2 px-4 border-b text-right">
								<button className="bg-blue-400 text-white px-4 py-2 rounded me-1" onClick={()=>{setIdUpdate(account.id);setNamaUpdate(account.name);setDeskripsiUpdate(account.description);openModalUpdate()}}>
									Update
								</button>
								<button className="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>deleteAccount(account.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

		<Modal isOpen={isModalOpen} onClose={closeModal}>
			<h2 className="text-lg font-bold mb-10">Tambah Account</h2>
			
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
				onClick={(e)=>addAccount(e)}
				className="mt-4 bg-green-500 text-white p-2 rounded"
				>
				Simpan
				</button>
			</div>			
			
		</Modal>

		<Modal isOpen={isModalOpenUpdate} onClose={closeModalUpdate}>
			<h2 className="text-lg font-bold mb-10">Update Account Id {idUpdate}</h2>
			
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
				onClick={(e)=>updateAccount(e)}
				className="mt-4 bg-blue-500 text-white p-2 rounded"
				>
				Update
				</button>
			</div>			
			
		</Modal>
    </>
    
  )
}

export default AccountList
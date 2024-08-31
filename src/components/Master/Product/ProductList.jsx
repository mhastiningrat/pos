import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Utilities/Loading'
import env from '../../../config/environment';
import Modal from '../../Utilities/Modal';

const ProductList = () => {
    const [loading,setLoading] = useState(false);
    const [product,setproduct] = useState([]);
	const [category,setCategory] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
	

	const [idUpdate,setIdUpdate] = useState(0);
	const [categoryUpdate,setCategoryUpdate] = useState(0);

	// Tambah Payload
	// "categoryId": 0,
	// "categoryName": "string",
	// "name": "string",
	// "description": "string",
	// "quantity": 0,
	// "price": 0,
	// "buyPrice": 0
	const [categoryId,setCategoryId] = useState(0);
	const [categoryName,setcategoryName] = useState("");
	const [name,setName] = useState("");
	const [description,setDescription] = useState("");
	const [quantity,setQuantity] = useState(0);
	const [price,setPrice] = useState(0);
	const [buyPrice,setBuyPrice] = useState(0);

	const splitCategory = (val) => {
		setCategoryId(Number(val.split(",")[0]));
		setcategoryName(val.split(",")[1]);
	}

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

	const openModalUpdate = () => {
		setIsModalOpenUpdate(true)
		console.log(categoryUpdate)
	};
  	const closeModalUpdate = () => setIsModalOpenUpdate(false);

	const getCategory = async()=>{
		try {
            let data = await axios.get(env.api + 'master/category');
			console.log(data)
            if(data && data.data.code === 200){
                setCategory(data.data.values);
				console.log(category)
            }
        } catch (error) {
            console.log(error)
        }
	}

    const getproduct = async() => {
        setLoading(true);
        try {
            let data = await axios.get(env.api + 'master/product');
            if(data && data.data.code === 200){
                setproduct(data.data.values);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

	const addproduct = async(e) =>{
		e.preventDefault();
		
		try {
			let payload = {
				categoryId,
				categoryName,
				name,
				description,
				quantity,
				price,
				buyPrice
			}

			if(name == ""){
				alert("Nama barang tidak boleh kosong");
				return;
			}

			if(categoryId == ""){
				alert("Kategory tidak boleh kosong");
				return;
			}

			if(price === 0 || buyPrice === 0){
				alert("Harga tidak boleh kosong");
				return;
			}
			setLoading(true);
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
		try {
			if(name == ""){
				alert("Nama barang tidak boleh kosong");
				return;
			}

			if(categoryId == ""){
				alert("Kategory tidak boleh kosong");
				return;
			}

			if(price === 0 || buyPrice === 0){
				alert("Harga tidak boleh kosong");
				return;
			}
			setLoading(true);
			await axios.put(env.api + 'master/product',{
				id: idUpdate,
				categoryId,
				categoryName,
				name,
				description,
				quantity,
				price,
				buyPrice
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
					
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>{getCategory();openModal()}}>
						Tambah Barang
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
						<input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari barang ..."/>
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
									<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
									onClick={()=>{
										openModalUpdate();
										getCategory();
										setIdUpdate(product.id);
										setName(product.name);
										setDescription(product.description);
										setBuyPrice(product.buyPrice);
										setPrice(product.price);
										setCategoryUpdate(product.categoryId+","+product.categoryName);
										setQuantity(product.quantity)}}>
										Edit
									</button>
									<button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
									onClick={()=>deleteproduct(product.id)}>
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
			<h2 className="text-lg font-bold mb-10">Tambah product</h2>
			
			<div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok Eceran" required="" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                        <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
					<div className="col-span-2 sm:col-span-1">
                        <label htmlFor="buyprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Beli</label>
                        <input type="number" name="price" id="buyprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setBuyPrice(e.target.value)}/>
                    </div>
					<div className="col-span-2 sm:col-span-1">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setQuantity(e.target.value)}/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e)=>splitCategory(e.target.value)}>
							<option value="">Pilih Kategori</option>
							{category.length > 0 ? category.map((category) => (
								<option key={category.id} value={category.id+","+category.name}>{category.name}</option>
							)):""}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi barang</label>
                        <input id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" onChange={(e)=>setDescription(e.target.value)}/>                    
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
				onClick={(e)=>addproduct(e)}
				className="mt-4 bg-green-500 text-white p-2 rounded"
				>
				Simpan
				</button>
			</div>			
			
		</Modal>

		<Modal isOpen={isModalOpenUpdate} onClose={closeModalUpdate}>
			<h2 className="text-lg font-bold mb-10">Update product Id {idUpdate}</h2>
			<div className="grid gap-4 mb-4 grid-cols-2">
				<div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                    <input defaultValue={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rokok Eceran" required="" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                    <input defaultValue={price} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
				<div className="col-span-2 sm:col-span-1">
                    <label htmlFor="buyprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Beli</label>
                    <input defaultValue={buyPrice} type="number" name="price" id="buyprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setBuyPrice(e.target.value)}/>
                </div>
				<div className="col-span-2 sm:col-span-1">
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input defaultValue={quantity} type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000" required="" onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                    <select defaultValue={categoryUpdate} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e)=>splitCategory(e.target.value)}>
						<option value="">Pilih Kategori</option>
						{category.length > 0 ? category.map((category) => (
							<option key={category.id} value={category.id+","+category.name}>{category.name}</option>
						)):""}
                    </select>
                </div>
                <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi barang</label>
                    <input defaultValue={description} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" onChange={(e)=>setDescription(e.target.value)}/>                    
                </div>
			</div>
			<div className='flex justify-between mt-14'>
				<button
				onClick={closeModalUpdate}
				className="mt-4 bg-red-500 text-white p-2 rounded"
				>
				X
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
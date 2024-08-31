import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Utilities/Loading'
import env from '../../../config/environment';
import Modal from '../../Utilities/Modal';
import {FaPen, FaSave, FaTimes } from 'react-icons/fa';
import { rupiah } from '../../../helper/format';

const TransactionSalesList = () => {
    const [loading,setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
    const [product,setProduct] = useState([]);
    const [category,setCategory] = useState([]);
    const [detail,setDetail] = useState([]);
    const [isEdit,setEdit] = useState(false);

    const [qty,setQty] = useState(0);
    const [productId,setProductId] = useState(0);
    const [productPrice,setProductPrice] = useState(0);
    const [productName,setProductName] = useState("");
    const [categoryId,setCategoryId] = useState(0);
    const [categoryName,setCategoryName] = useState("");

    const [totalTransaksi,setTotalTransaksi] = useState(0);
    const [payment,setPayment] = useState("");

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

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
                setProduct(data.data.values);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const splitCategory = (val) => {
        if(val !== ""){
            setCategoryId(val.split(",")[0]);
            setCategoryName(val.split(",")[1]);
        }
       
    }

    const splitProduct = (val) => {
        if(val !== ""){
            setProductId(val.split(",")[0]);
            setProductName(val.split(",")[1]);
            setProductPrice(val.split(",")[2]);
            setCategoryId(val.split(",")[3]);
            setCategoryName(val.split(",")[4]);
        }
    }

    const addDetailTransaction = () => {
        let data = {
            "categoryId": categoryId,
            "categoryName": categoryName,
            "productId": productId,
            "productName": productName,
            "perPrice": productPrice,
            "quantity": qty
        }
        if(qty === 0){
           alert("Jumlah barang harus di isi!");
           return;
        }
        setDetail(i => [...i,data]);
       
       
    }

    const deleteDetail = (id) =>{
        let newDetail = detail.splice(detail.findIndex(item => item.productId === id), 1);
       
        setDetail(newDetail);

    }

    const calculateTotal = () => {
        let total = 0
            for(let i in detail){
                total += Number(detail[i].perPrice) * Number(detail[i].quantity);
                setTotalTransaksi(total);
            }
    }

    const editDetail = (val,name) => {
            let index = detail.findIndex(detail => detail.productName === name);
            if(index !== -1){
                detail[index].quantity = val;
                setDetail(detail);
                calculateTotal();
            }
    }

	const addTransaction = async(e) =>{
		e.preventDefault();
		
		try {
			let payload = {
				
                "paymentMethod": payment,
                "totalAmount": totalTransaksi,
                "listSalesDetail": detail
			}

			if(payment == ""){
				alert("Payment harus di pilih");
				return;
			}

            if(detail.length === 0){
				alert("Detail data tidak boleh kosong");
				return;
			}

			setLoading(true);
			await axios.post(env.api + 'transaction/sales',payload);
            window.location.reload();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);

		}
	}

    useEffect(()=>{
        getCategory();
        getproduct();
    },[])

    useEffect(()=>{
        calculateTotal();
    },[detail])

    useEffect(() => {
        function handleKeyDown(e) {
          console.log(e.target);
          console.log(e.keyCode);
          console.log('Enter');
          addTransaction(e)
        }
    
        document.addEventListener("keydown", handleKeyDown);
    
        return function cleanup() {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
  return (
    <>
        {loading ? <Loading/> : ""}
        <div className="mt-4 p-4 border rounded bg-white overflow-x-auto ">
            <div className="flex justify-between mb-10">
				<h3 className="text-2xl font-bold mb-2">Total : {rupiah(totalTransaksi)}</h3>
                <h2 className="text-2xl font-bold mb-2">Order ID : DMS-001</h2>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=>addTransaction(e)}>
                    Finish
                </button>
			</div>
			
			<div className="relative sm:rounded-lg">
                <div className="grid gap-4 mb-10 grid-cols-4">
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pembayaran</label>
                        <select id="payment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e)=>setPayment(e.target.value)}>
							<option value="">Pilih Pembayaran</option>
							<option selected value="cash">Cash</option>
							<option value="qris">Qris</option>
							<option value="transfer">Transfer Bank</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e)=>splitProduct(e.target.value)}>
							<option value="">Pilih Product</option>
							{product.length > 0 ? product.map((product) => (
								<option key={product.id} value={product.id+","+product.name+","+product.price+","+product.categoryId+","+product.categoryName}>{product.name}</option>
							)):""}
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="Quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
                        <input id="quantity" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" onChange={(e)=>setQty(e.target.value)}/>                    
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>.</label>
                        <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>addDetailTransaction()}>
                            Tambah
                        </button>
                    </div>
                </div>
			</div>
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
						<tr>
							<th scope="col" className="px-6 py-3">
								NO
							</th>
                            <th scope="col" className="px-6 py-3">
								Nama Kategori
							</th>
							<th scope="col" className="px-6 py-3">
								Nama Barang
							</th>
							<th scope="col" className="px-6 py-3">
								Kuantiti
							</th>
							<th scope="col" className="px-6 py-3 text-right">
								Harga Satuan
							</th>
							<th scope="col" className="px-6 py-3 text-right">
								Harga Total
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{detail.map((detail,idx) => (
							<tr key={product.id} className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
								<th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
									{idx + 1}
								</th>
                                <td className="px-6 py-4">
									{detail.categoryName}
								</td>
								<td className="px-6 py-4">
									{detail.productName}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<label className={isEdit?"hidden":"block"}>{detail.quantity}</label>
                                    <input type="number" name="orderid" id="orderid" defaultValue={detail.quantity} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 "+ (isEdit?"block":"hidden")} placeholder="TRX-001" required="" onChange={(e)=>editDetail(e.target.value,detail.productName)} />
								</td>
								<td className="px-6 py-4 text-right">
									{rupiah(detail.perPrice)}
								</td>
								<td className="px-6 py-4 text-right">
									{rupiah(Number(detail.quantity) * Number(detail.perPrice))}
								</td>
								<td className="px-6 py-4 text-center">
                                    {isEdit ? (
                                        <button className="text-white bg-transparent bg-grey-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
                                        onClick={()=>setEdit(false)}>
                                            <FaSave size={15} color='green'  />
                                        </button>
                                    ):(
                                        <button className="text-white bg-transparent bg-grey-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
                                        onClick={()=>setEdit(true)}>
                                            <FaPen size={15} color='blue'  />
                                        </button>
                                    )}
                                    
									<button className="text-white bg-transparent bg-grey-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
									onClick={()=>deleteDetail(detail.productId)}>
										<FaTimes size={15} color='red'  />
									</button>
								</td>
							</tr>
						))}
						
					</tbody>
				</table>
		</div>

		
    </>
    
  )
}

export default TransactionSalesList
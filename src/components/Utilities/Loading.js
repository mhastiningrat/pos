import React from 'react'
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <>
        <div className="w-full h-full absolute inset-0 z-50 bg-slate-400 opacity-25 flex justify-center items-center">
		    <FaSpinner className="animate-spin" size={70}/>
		</div>
    </>
  )
}

export default Loading
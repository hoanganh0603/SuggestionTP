import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'
import 'react-toastify/dist/ReactToastify.css';


export default function BestSuggestion () {
    const { setPendingBtn, setApprovedBtn, setImplementedBtn, setRejectBtn } = useStateContext();

   

  return (
    <div className=' border border-spacing-3 rounded-lg border-green-900 px-20 py-5'>
        <div className='text-center mb-5'>
            <button className='text-white border-none bg-zinc-600 text-16 rounded-lg px-3 py-2 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                type="button"
                //onClick={() => addNewButton()}
                >
                Print
            </button>
        </div>

        <div className=' relative'>
            <div className=' grid grid-flow-col place-content-center'>
                <div className='w-[960px] h-[540px]'>
                    <img src="/assets/best_suggestion.png" alt="headphones" className="w-[960px] h-[540px]"/>
                </div>
                    <p className=' absolute top-[0%] right-[60%]'>Nguyễn Gia Hoàng Anh</p>
            
            </div>
        </div>
      
    
            
       
    </div>
  )
}



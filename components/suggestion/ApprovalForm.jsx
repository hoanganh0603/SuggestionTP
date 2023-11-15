import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Link from 'next/link';


export default function ApprovalForm () {
    const { idApprove, setPendingBtn, setApprovedBtn } = useStateContext();

    const [status, setStatus] = useState("")
    const [pic, setPIC] = useState("")
    const [startDate, setStartDate] = useState("")
    const [deadline, setDeadline] = useState("")
    const [comment, setComment] = useState("")
    const [nextAction, setNextAction] = useState("")
    
    const [message, setMessage] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault(); // 👈️ prevent page refresh
      
        if (status==="Approved" && (pic ==="" || startDate ==="" || deadline ==="" || nextAction ==="")){
            setMessage("err")
        }
        if(status!=="Approved" && comment===""){
            setMessage("err")
        }
        if((status==="Approved" && pic !=="" && startDate !=="" && deadline !=="" && nextAction !=="") || status==="Reject" && comment !==""){
            const dataAppove = {"id":idApprove.id,"comment":comment, "status":status, "startDate":startDate, "deadline":deadline, "pic":pic, "next_action":nextAction, "action":"pending"}
            const updateData = await fetch(`http://vnczc014b68l:3000/api/mySQL/suggestion/getSuggestion`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataAppove )
                }
            )
            const res = await updateData.json()
            if(res==="update_success"){
                setMessage("right")
            }

            window.location.reload();
        }
       
      };

    const handleBackBtn = () =>{
        setPendingBtn(true)
        setApprovedBtn(false)
    }


  return (
    <div className=' border border-spacing-3 rounded-lg px-20 py-5'>
        <h1 className=' text-center text-3xl font-bold mb-5'>APPROVAL FORM</h1>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Owner
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.owner}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="type_sug"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Type Suggestion
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.type_sug}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="submit_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Submit Date
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.submit_date}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Title
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.title_sug}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.description}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="benifit"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Benefit
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idApprove.benefit}
                    </p>
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Status
                    </label>
                    <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(e) => setStatus(e.target.value)}
                           // defaultValue={dataEdit[4]}
                    >
                        <option value="">--Select--</option>
                        <option value="Approved">Approved</option>
                        <option value="Reject">Reject</option>
                    </select>
                </div>
            {status === 'Approved' ?
                <div>
                    <label
                        htmlFor="pic"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Assign PIC
                    </label>
                    <input
                        type="text"
                        id="pic"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Input name"
                        required=""
                        //defaultValue={dataEdit[3]}
                        onChange={(e) => setPIC(e.target.value)}
                    />
                </div>
                 : null
            }
            {status === 'Approved' ?
                <div>
                    <label
                        htmlFor="deadline"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Start Date <span className=' text-xs text-red-500 italic'>Chú ý định dạng : Ngày/Tháng/Năm</span>
                    </label>
                    <input
                        type="text"
                        id="start_date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Vd: 22/03/2023"
                        required=""
                        //defaultValue={dataEdit[3]}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                : null
            }
            {status === 'Approved' ?
                <div>
                    <label
                        htmlFor="deadline"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Deadline <span className=' text-xs text-red-500 italic'>Chú ý định dạng : Ngày/Tháng/Năm</span>
                    </label>
                    <input
                        type="text"
                        id="date_order"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Vd: 22/03/2023"
                        required=""
                        //defaultValue={dataEdit[3]}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
                : null
            }   
            {status === 'Approved' ?
                <div>
                    <label
                        htmlFor="domment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Next Action
                    </label>
                    <input
                        type="text"
                        id="next_action"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Input next action"
                        required=""
                        //defaultValue={dataEdit[14]}
                        onChange={(e) => setNextAction(e.target.value)}
                    />
                </div>
                : null
            } 
            {status === 'Reject' ?
                <div>
                    <label
                        htmlFor="domment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Comment
                    </label>
                    <input
                        type="text"
                        id="Comment"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Input the reason"
                        required=""
                        //defaultValue={dataEdit[14]}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            : null
            } 
            </div>

            <div>
                <div className=' space-x-40'>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                        id="btnSend"
                    >
                        SEND
                    </button>
              
               
                    <button 
                        className="flex-shrink-0 bg-stone-600 hover:bg-stone-600 border-stone-600 hover:border-stone-600 border-4 text-white py-1 px-7 rounded" 
                        type="button"
                        id="btnSave"
                        onClick={() => handleBackBtn()}
                        >
                        Back
                    </button>
                </div>
    
            </div>
        </form>

        {message === "err" ?
            <h2 className='mt-5 text-red-500 font-bold'>Chú ý nhập đầy đủ thông tin trước khi nhấn nút GỬI</h2>
            : message === "right" ?
            <h2 className='mt-5 text-lime-600 font-bold'>Cảm ơn bạn. Thông tin của bạn đã được gửi</h2>
            : null
        }
            
       
    </div>
  )
}



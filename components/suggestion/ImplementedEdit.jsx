import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'

import 'react-toastify/dist/ReactToastify.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function ImplementedEdit () {
    const { idScore, setPendingBtn, setApprovedBtn, setImplementedBtn } = useStateContext();

    const [status, setStatus] = useState("")

    const [score1, setScore1] = useState("")
    const [score2, setScore2] = useState("")
    const [score3, setScore3] = useState("")
    const [score4, setScore4] = useState("")
    const [score5, setScore5] = useState("")
    const [score, setScore] = useState("")
    
    const [message, setMessage] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault(); // 👈️ prevent page refresh
        if(idScore.score === 0 ){
            if (score1==="" || score2 ==="" || score3 ==="" || score4 ==="" || score5 ===""){
                setMessage("err")
            }
            else{
                const total_score = parseInt(score1) + parseInt(score2) + parseInt(score3) + parseInt(score4) + parseInt(score5)

                const dataAppove = {"id":idScore.id, "score":total_score, "action":"score"}
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
                    window.location.reload();
                }
            }

        }else{
            if(status === ""){
                setMessage("err")
            }else{
                const dataAppove = {"id":idScore.id, "status":status, "action":"best_suggestion"}
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
            }
        }
      };

    const handleBackBtn = () =>{
        setPendingBtn(false)
        setApprovedBtn(false)
        setImplementedBtn(true)
    }


  return (
    <div className=' border border-spacing-3 rounded-lg px-20 py-5'>
        <h1 className=' text-center text-3xl font-bold mb-5'>EVALUATE TO CHOICE BEST SUGGESTION</h1>
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
                       {idScore.owner}
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="pic"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        PIC
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idScore.pic}
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
                       {idScore.title_sug}
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
                       {idScore.description}
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
                       {idScore.benefit}
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Last Comment
                    </label>
                    <p className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                       {idScore.comment}
                    </p>
                </div>

            </div>

        {idScore.score === 0 ?
            <div>
                <div className='grid grid-cols-8 mt-20 px-10 py-5'>
                    <div className=' col-span-2'>
                        <p className=' font-bold'>1. Technical Feasible</p>
                    </div>

                    <div className=' col-span-5 px-2'>
                        <p>Khả năng thực hiện sáng kiến mà không gặp phải rào cản về kỹ thuật, nguồn lực. Ý tưởng có thể thực hiện dựa trên kiến thức, kỹ năng, công nghệ và nguồn lực hiện có.</p>
                    </div>

                    <div className=' col-span-1 px-4'>
                        <select id="score" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setScore1(e.target.value)}
                        >
                            <option value="">--Score--</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-8 px-10 py-5'>
                    <div className=' col-span-2'>
                        <p className=' font-bold'>2. Cost to Implement</p>
                    </div>

                    <div className=' col-span-5 px-2'>
                        <p>Tổng chi phí cần thiết để thực hiện ý tưởng.</p>
                    </div>

                    <div className=' col-span-1 px-4'>
                        <select id="score1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setScore2(e.target.value)}
                        >
                            <option value="">--Score--</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-8 px-10 py-5'>
                    <div className=' col-span-2'>
                        <p className=' font-bold'>3. Countermeasure Ladder</p>
                    </div>

                    <div className=' col-span-5 px-2'>
                        <p> Lớn hơn hoặc bằng 3.</p>
                    </div>

                    <div className=' col-span-1 px-4'>
                        <select id="sore2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setScore3(e.target.value)}
                        >
                            <option value="">--Score--</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-8 px-10 py-5'>
                    <div className=' col-span-2'>
                        <p className=' font-bold'>4. Cost saving</p>
                    </div>

                    <div className=' col-span-5 px-2'>
                        <p> Tổng số tiền tiết kiệm được khi thực hiện sáng kiến này.</p>
                    </div>

                    <div className=' col-span-1 px-4'>
                        <select id="sore3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setScore4(e.target.value)}
                        >
                            <option value="">--Score--</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-8 px-10 py-5 mb-10'>
                    <div className=' col-span-2'>
                        <p className=' font-bold'>5. Application for others</p>
                    </div>

                    <div className=' col-span-5 px-2'>
                        <p> Có khả năng sử dụng, triển khai hoặc mở rông cho các máy, process, bộ phận khác.</p>
                    </div>

                    <div className=' col-span-1 px-4'>
                        <select id="score4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setScore5(e.target.value)}
                        >
                            <option value="">--Score--</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>

            : 

            <div className=' col-span-1 px-4 mb-10 mt-10'>
                 <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Change Status <span className=' text-xs text-red-500 italic'>Chú ý: Sau khi họp các phòng ban và bầu chọn mới chuyển status</span>
                </label>
                <select id="score5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">--Select--</option>
                    <option value="Best Suggestion">Best Suggestion</option>
                </select>
            </div>
        }


        {message === "score" ?
            <div className='flex gap-5 justify-center items-end'>
                <p className=' font-bold text-lg text-lime-800'>Total Score:</p>
                <p className=' font-bold text-4xl text-lime-800'>{score}</p>
            </div>
            : null
        }

            <div>
                <div className=' space-x-32'>
                    {/* <button
                        className="text-white bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        id="btnScore"
                        onClick={() => handleScore()}
                    >
                        Total Score
                    </button> */}

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                        id="btnSend_"
                    >
                        SEND
                    </button>
              
               
                    <button 
                        className="flex-shrink-0 bg-stone-600 hover:bg-stone-600 border-stone-600 hover:border-stone-600 border-4 text-white py-1 px-7 rounded" 
                        type="button"
                        id="btnSave_"
                        onClick={() => handleBackBtn()}
                        >
                        Back
                    </button>
                </div>
    
            </div>
        </form>

        {message === "err" ?
            <h2 className='mt-5 text-red-500 font-bold'>Chú ý nhập đầy đủ thông tin trước khi nhấn nút SEND</h2>
            : message === "right" ?
            <h2 className='mt-5 text-lime-600 font-bold'>Cảm ơn bạn. Thông tin của bạn đã được gửi</h2>
            : null
        }
            
       
    </div>
  )
}



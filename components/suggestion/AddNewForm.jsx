import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'
import 'react-toastify/dist/ReactToastify.css';


export default function AddNewForm () {
    const { setPendingBtn, setApprovedBtn, setImplementedBtn, setRejectBtn } = useStateContext();

    const [owner, setOwner] = useState("")
    const [department, setDepartment] = useState("")
    const [typeSug, setTypeSug] = useState("")
    const [machine, setMachine] = useState("")
    const [submitDate, setSubmitDate] = useState("")
    const [titleSug, setTitleSug] = useState("")
    const [description, setDescription] = useState("")
    const [benefit, setBenefit] = useState("")
    const [picture, setPicture] = useState("")

    const [message, setMessage] = useState("")

    // Date object
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    // we will display the date as DD-MM-YYYY 
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const handleSubmit = async(event) => {
        event.preventDefault(); // 👈️ prevent page refresh
        if (owner==="" || department==="" || typeSug==="" || machine==="" || titleSug==="" || description==="" || benefit===""){
            setMessage("err")
        }else{
            //Convert format date
            // var d_arr = submitDate.split("/");
            // var newdate = d_arr[2] + '-' + d_arr[1] + '-' + d_arr[0];
            //Save information change roller
            insertNewSuggestion({'owner':owner, 'department':department, 'typeSug':typeSug, 'machine':machine,'submitDate':currentDate, 
                                'titleSug':titleSug, 'description':description, 'benefit':benefit, 'action':"insert_suggestion"})
            
            //Clear form
            setOwner("")
            setDepartment("")
            setTypeSug("")
            setMachine("")
            setSubmitDate("")
            setTitleSug("")
            setDescription("")
            setBenefit("")

            window.location.reload();
        }
      };

    const insertNewSuggestion = async(dataUpdate) => {
        const insertSuggestion = await fetch(`http://vnczc014b68l:3000/api/mySQL/suggestion/getSuggestion`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        })

        const res = await insertSuggestion.json()
        if(res==="insert_success"){
            console.log(res)
            setMessage("right")
        }
    }

    const handleBackBtn = () => {
        setPendingBtn(false)
        setApprovedBtn(false)
        setImplementedBtn(false)
        setRejectBtn(false)
    }



  return (
    <div className=' border border-spacing-3 rounded-lg px-20 py-5'>
        <h1 className=' text-center text-2xl font-bold mb-10'>Nhập Thông Tin Suggestion</h1>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="mb-6">
                    <label
                        htmlFor="nip_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Họ & Tên Người Tạo
                    </label>
                    <input
                        type="text"
                        id="owner"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Vd: Nguyen Van Manh"
                        required=""
                        onChange={(event) => setOwner(event.target.value)}
                        value={owner}
                    />
                </div>

                <div>
                    <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Bộ Phận
                    </label>
                    <select id="machine" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setDepartment(e.target.value)}
                            value={department}
                    >
                        <option value="">--Bấm chọn--</option>
                        <option value="Prepress-Printing">Prepress-Printing</option>
                        <option value="Laminating">Laminating</option>
                        <option value="Finishing">Finishing</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="QA team">QA team</option>
                        <option value="Warehouse">Warehouse</option>
                    </select>
                </div>

                {/* <div>
                    <label
                        htmlFor="date_order"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Ngày Tạo <span className=' text-xs text-red-500 italic'>Chú ý định dạng : Ngày/Tháng/Năm</span>
                    </label>
                    <input
                        type="text"
                        id="date_order"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Vd: 22/03/2023"
                        required=""
                        value={submitDate}
                        onChange={(e) => setSubmitDate(e.target.value)}
                    />
                </div> */}

                <div>
                    <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Danh Mục
                    </label>
                    <select id="type" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setTypeSug(e.target.value)}
                            value={typeSug}
                    >
                        <option value="">--Bấm chọn--</option>
                        <option value="Safety">Safety</option>
                        <option value="Quality">Quality</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Enviroment">Enviroment</option>
                        <option value="Cost saving">Cost saving</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="target"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Khu Vực / Máy
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={(event) => setMachine(event.target.value)}
                        value={machine}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="target"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Tiêu Đề
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={(event) => setTitleSug(event.target.value)}
                        value={titleSug}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="target"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Mô Tả
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="target"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Lợi Ích Mang Lại
                    </label>
                    <textarea
                        type="text"
                        id="benefit"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required=""
                        onChange={(event) => setBenefit(event.target.value)}
                        value={benefit}
                    />
                </div>
            </div>

            <div className='flex gap-10'>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    GỬI
                </button>

                <button 
                    className=" bg-stone-600 hover:bg-stone-600 border-stone-600 hover:border-stone-600 border-4 text-white py-1 px-7 rounded" 
                    type="button"
                    onClick={() => handleBackBtn()}
                    >
                    Back
                </button>
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



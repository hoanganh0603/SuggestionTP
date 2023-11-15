import React, {useEffect, useState} from 'react'
import { BiSortAlt2 } from "react-icons/bi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dropdown } from "@nextui-org/react";
import { useStateContext } from '../../context/StateContext'
import PopupForm from '../PopupForm';


export default function ApprovedList({ mySuggestion }) {
    const { setPendingBtn, setApprovedBtn, setImplementedBtn, confirmBtn, setShowPopup, showPopup, selectDepartment, setSelectDepartment} = useStateContext();

    const [comment, setComment] = useState("")
    const [status, setStatus] = useState("")

    const [selected, setSelected] = React.useState(new Set(["Select Department"]));

    const [showDetail, setShowDetail] = useState(()=>{
        const arrApproved = mySuggestion.filter(filterApproved)
        return arrApproved
    })

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const dataApproved = (allData) => {
        const arrApproved = allData.filter(filterApproved)

        const arrPrePrin = arrApproved.filter(filterPrePrin)
        const arrLam = arrApproved.filter(filterLam)
        const arrFin = arrApproved.filter(filterFin)
        const arrMain = arrApproved.filter(filterMain)
        const arrQA = arrApproved.filter(filterQA )
        const arrWH = arrApproved.filter(filterWH)

        const dataApproved = [arrPrePrin, arrLam, arrFin, arrMain, arrQA, arrWH, arrApproved]
        return dataApproved
    }


    const handleSaveBtn = async (id) => {
        const checkUserAdmin = await fetch(`http://vnczc014b68l:3000/api/auth/login`)
        const userInfo = await checkUserAdmin.json()

        if(userInfo.message === "Invalid token!"){
            setShowPopup(true)
        }else{
            if(comment=== "" || status==="") {
                toast.warning('Please input your comment and status!', {
                    position: toast.POSITION.TOP_CENTER
                    })
            }
            else{
                const dataAppove = {"id":id,"comment":comment, "status":status, "action":"update_status"}
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
                    toast.success('Your change is saved successfully !', {
                        position: toast.POSITION.TOP_CENTER
                        })
                    setComment("")
                    window.location.reload();
                }
            }
        }
        
    }

    useEffect(() => {
        const arrApproved = mySuggestion.filter(filterApproved)
        setShowDetail(arrApproved)
    },[confirmBtn])

    useEffect(() => {
        if(selectedValue === "Prepress-Printing"){
            setShowDetail(dataApproved(mySuggestion)[0])
            }
        if(selectedValue === "Laminating"){
            setShowDetail(dataApproved(mySuggestion)[1])
            }
        if(selectedValue === "Finishing"){
            setShowDetail(dataApproved(mySuggestion)[2])
            }
        if(selectedValue === "Maintenance"){
            setShowDetail(dataApproved(mySuggestion)[3])
            }
        if(selectedValue === "QA team"){
            setShowDetail(dataApproved(mySuggestion)[4])
            }
        if(selectedValue === "Warehouse"){
            setShowDetail(dataApproved(mySuggestion)[5])
            }
        if(selectedValue === "Select Department"){
            setShowDetail(dataApproved(mySuggestion)[6])
            }

    },[selected])

    const  handleBackBtn = () => {
        setPendingBtn(false)
        setApprovedBtn(false)
        setImplementedBtn(false)
        setSelectDepartment(false)
    }

    const [order, setOrder] = useState("ASC")
    const sorting = (col) => {
        if(order === "ASC"){
            const sorted = [...showDetail].sort((a,b) => 
                a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
            );
            setShowDetail(sorted);
            setOrder("DSC")
        }
        if(order === "DSC"){
            const sorted = [...showDetail].sort((a,b) => 
                a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
            );
            setShowDetail(sorted);
            setOrder("ASC")
        }
    }

  return (
    <div>
    {showPopup ? 
        <PopupForm/>
        :
        <div className='border border-green-800 rounded-lg p-5'>
            {/* -----------Display form edit data-------- */}
                <div>
                    <div className='flex mb-5'>
                        <h2 className='text-blue-800 text-3xl font-bold mb-2 mt-5 mr-20'>Seclect Department To See Suggestions Approved</h2>
                    </div>
                    <div className='flex mt-10 items-end'>
                        <Dropdown>
                            <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="primary"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}
                                onAction={()=>setSelectDepartment(true)}
                            >
                                <Dropdown.Item key="Select Department">Select Department</Dropdown.Item>
                                <Dropdown.Item key="Prepress-Printing">Prepress-Printing</Dropdown.Item>
                                <Dropdown.Item key="Laminating">Laminating</Dropdown.Item>
                                <Dropdown.Item key="Finishing">Finishing</Dropdown.Item>
                                <Dropdown.Item key="Maintenance">Maintenance</Dropdown.Item>
                                <Dropdown.Item key="QA team">QA team</Dropdown.Item>
                                <Dropdown.Item key="Warehouse">Warehouse</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <h2 className=' text-2xl font-bold ml-10'>No. Suggestion Approved:</h2>
                        <p className=' text-blue-700 text-4xl font-bold ml-5'>{showDetail.length}</p>
                        <div className='absolute right-[10%]'>
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
               </div>

     
            {/* ----display detail table ------*/}
            <div>
               
                <div className=' mt-2 px-5'>
                    <div className=' my-7 relative overflow-x-auto'>
                        <table className="w-full text-black text-left">
                            <thead className=' text-base text-gray-700 uppercase bg-gray-50'>
                                <tr>
                                    <th scope='col' className=' w-[1/25] py-3 px-3 text-center'>No.</th>
                                    <th onClick={()=> sorting("owner")} scope='col' className='w-[2/25] py-3 px-3 text-center'><p className='flex'>Owner<BiSortAlt2/></p></th>
                                    <th scope='col' className='w-[2/25] py-3 px-3 text-center'>PIC</th>
                                    <th scope='col' className='w-[4/25] py-3 px-3 text-center'>Title</th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Submit Date</th>
                                    <th scope='col' className='w-[5/25] py-3 px-3 text-center'>Description</th>
                                    <th scope='col' className='w-[4/25] py-3 px-3 text-center'>Next Action</th>
                                    <th onClick={()=> sorting("deadline")} scope='col' className='w-[1/25] py-3 px-3 text-center'><p className='flex'>Deadline<BiSortAlt2/></p></th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Update status</th>
                                    <th scope='col' className='w-[3/25] py-3 px-3 text-center'>Comment</th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'></th>
                                </tr>
                            </thead>
                            <tbody className='px-2'>
                                {showDetail&&showDetail.map((item, index) => (
                                <tr key={index} className=" bg-white border-b">
                                    <td className="py-1 px-1 text-center">{index+1}</td>
                                    <td className="py-1 px-1 text-center">{item.owner}</td>
                                    <td className="py-1 px-1 text-center">{item.pic}</td>
                                    <td className='py-2 px-3 text-left'>{item.title_sug}</td>
                                    <td className='py-2 px-2 text-left'>{item.submit_date}</td>
                                    <td className='py-2 px-3 text-left'>{item.description}</td>
                                    <td className='py-2 px-2 text-left'>{item.next_action}</td>
                                    <td className='py-2 px-2 text-center'>{item.deadline}</td>

                                    <td className='py-2 px-2 text-center'>
                                        <div>
                                            <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(event) => setStatus(event.target.value)}
                                                //value={station}
                                            >
                                                <option value="">--Select--</option>
                                                <option value="Implemented">Implemented</option>
                                                <option value="unimplemented">Hard to do</option>
                                            </select>
                                        </div>
                                    </td>

                                    <td className='py-2 px-1 text-center'>
                                        <div className="flex items-center border-b border-teal-500">
                                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                                id="Form"
                                                type="text" 
                                                placeholder="Input your explanation"
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className='py-1 px-1 text-center'>
                                        <button 
                                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" 
                                            type="button"
                                            id="btnSave"
                                            onClick={() => handleSaveBtn(item.id)}
                                            >
                                            Save
                                        </button>
                                        <ToastContainer />
                                    </td>

                                </tr>
                                ))} 
                            </tbody>
                        </table>
                        <div className='mt-10'>
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
                </div> 
          </div>
        </div>
    }

    </div>
  )
}



const filterApproved = (item) => {
    if (item.status === "Approved") {
        return true;
    }
    return false;
    }
    // const filterReject = (item) => {
    // if (item.status === "Reject") {
    //     return true;
    // }
    // return false;
    // }
    // const filterImplement = (item) => {
    // if (item.status === "Implemented") {
    //     return true;
    // }
    // return false;
    // }
    // const filterPending = (item) => {
    //     if (item.status === "" || item.status === "nan") {
    //         return true;
    //     }
    //     return false;
    // }

    const filterPrePrin = (item) => {
    if (item.department === "Prepress-Printing") {
        return true;
    }
    return false;
    }
    const filterLam = (item) => {
    if (item.department === "Laminating") {
        return true;
    }
    return false;
    }
    const filterFin = (item) => {
    if (item.department === "Finishing") {
        return true;
    }
    return false;
    }
    const filterMain = (item) => {
    if (item.department === "Maintenance") {
        return true;
    }
    return false;
    }
    const filterQA = (item) => {
    if (item.department === "QA team") {
        return true;
    }
    return false;
    }
    const filterWH = (item) => {
    if (item.department === "Warehouse") {
        return true;
    }
    return false;
    }



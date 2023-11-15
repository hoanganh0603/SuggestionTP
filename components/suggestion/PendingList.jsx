import React, {useEffect, useState} from 'react'
import { BiSortAlt2 } from "react-icons/bi";

import NipRollerLam from '../NipRollerLam';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dropdown } from "@nextui-org/react";
import { useStateContext } from '../../context/StateContext'
import PopupForm from '../PopupForm';


export default function PendingList({ mySuggestion }) {
    const { setPendingBtn, setApprovedBtn, confirmBtn, setIDApprove, setImplementedBtn, setRejectBtn, setShowPopup, showPopup, setSelectDepartment} = useStateContext();

    const [selected, setSelected] = React.useState(new Set(["Select Department"]));
    const [isChecked, setIsChecked] = useState(false)

    const [showDetail, setShowDetail] = useState(()=>{
        const arrPending = mySuggestion.filter(filterPending)
        return arrPending
    })

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const dataPending = (allDate) => {
        const arrPending = allDate.filter(filterPending)

        const arrPrePrin = arrPending.filter(filterPrePrin)
        const arrLam = arrPending.filter(filterLam)
        const arrFin = arrPending.filter(filterFin)
        const arrMain = arrPending.filter(filterMain)
        const arrQA = arrPending.filter(filterQA )
        const arrWH = arrPending.filter(filterWH)

        const dataPending = [arrPrePrin, arrLam, arrFin, arrMain, arrQA, arrWH, arrPending]
        return dataPending
    }

    useEffect(() => {
        const arrPending = mySuggestion.filter(filterPending)
        setShowDetail(arrPending)
    },[confirmBtn])

    useEffect(() => {
        if(selectedValue === "Prepress-Printing"){
            setShowDetail(dataPending(mySuggestion)[0])
            }
        if(selectedValue === "Laminating"){
            setShowDetail(dataPending(mySuggestion)[1])
            }
        if(selectedValue === "Finishing"){
            setShowDetail(dataPending(mySuggestion)[2])
            }
        if(selectedValue === "Maintenance"){
            setShowDetail(dataPending(mySuggestion)[3])
            }
        if(selectedValue === "QA team"){
            setShowDetail(dataPending(mySuggestion)[4])
            }
        if(selectedValue === "Warehouse"){
            setShowDetail(dataPending(mySuggestion)[5])
            }
        if(selectedValue === "Select Department"){
            setShowDetail(dataPending(mySuggestion)[6])
            }

    },[selected])


    const handleEditBtn = async (item) => {
        const checkUserAdmin = await fetch(`http://vnczc014b68l:3000/api/auth/login`)
        const userInfo = await checkUserAdmin.json()

        if(userInfo.message === "Invalid token!"){
            setShowPopup(true)
        }else{
            setIDApprove(item)

            setPendingBtn(true)
            setApprovedBtn(true)
            setImplementedBtn(false)
            setRejectBtn(false)

        }
    }

    const  handleBackBtn = () => {
        setPendingBtn(false)
        setApprovedBtn(false)
        setImplementedBtn(false)
        setRejectBtn(false)
        setSelectDepartment(false)
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
                        <h2 className='text-amber-600 text-3xl font-bold mb-2 mt-5 mr-20'>Seclect Department To See Suggestions Pending</h2>
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
                        <h2 className=' text-2xl font-bold ml-10'>No. Suggestion Pending:</h2>
                        <p className=' text-amber-500 text-4xl font-bold ml-5'>{showDetail.length}</p>
                        <div className='absolute right-[10%]'>
                            <button 
                                className="flex-shrink-0 bg-stone-600 hover:bg-stone-600 border-stone-600 hover:border-stone-600 border-4 text-white py-1 px-7 rounded" 
                                type="button"
                                id="back2"
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
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Owner</th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Type Suggestion</th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Machine</th>
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Submit Date</th>
                                    <th scope='col' className='w-[4/25] py-3 px-3 text-center'>Title</th>
                                    <th scope='col' className='w-[8/25] py-3 px-3 text-center'>Description</th>
                                    <th scope='col' className='w-[7/25] py-3 px-3 text-center'>Benefit</th>
                                    
                                    {/* <th scope='col' className='w-[1/25] py-3 px-3 text-center'>Status</th>
                                    <th scope='col' className='w-[3/25] py-3 px-3 text-center'>Comment</th> */}
                                    <th scope='col' className='w-[1/25] py-3 px-3 text-center'></th>
                                </tr>
                            </thead>
                            <tbody className='px-2'>
                                {showDetail&&showDetail.map((item, index) => (
                                <tr key={index} className=" bg-white border-b">
                                    <td className="py-2 px-1 text-center">{index+1}</td>
                                    <td className="py-2 px-1 text-center">{item.owner}</td>
                                    <td className="py-2 px-1 text-center">{item.type_sug}</td>
                                    <td className='py-2 px-1 text-center'>{item.machine}</td>
                                    <td className='py-2 px-1 text-center'>{item.submit_date}</td>
                                    <td className='py-2 px-3 text-left'>{item.title_sug}</td>
                                    <td className='py-2 px-3 text-left'>{item.description}</td>
                                    <td className='py-2 px-2 text-left'>{item.benefit}</td>
                                    <td className='py-1 px-1 text-center'>
                                        <button 
                                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-2 rounded" 
                                            type="button"
                                            id="edit1"
                                            // onClick={() => handleSaveBtn(item.id)}
                                            onClick={() => handleEditBtn(item)}
                                            >
                                            Edit
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
                                id="back3"
                                onClick={() => handleBackBtn()}
                                >
                                Back
                            </button>
                        </div>
                        
                    </div>
                </div> 
            
                {/* <button 
                        className="flex-shrink-0 bg-orange-400 hover:bg-orange-400 border-orange-400 hover:border-orange-400 text-sm border-4 text-white py-1 px-2 rounded" 
                        type="button"   
                        onClick={() => setIsChecked(false)}
                >
                    Thu gọn           
                </button> */}
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
    const filterReject = (item) => {
    if (item.status === "Reject") {
        return true;
    }
    return false;
    }
    const filterImplement = (item) => {
    if (item.status === "Implemented") {
        return true;
    }
    return false;
    }
    const filterPending = (item) => {
        if (item.status === "" || item.status === "nan") {
            return true;
        }
        return false;
    }

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



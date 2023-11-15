import React, { useEffect, useState } from 'react'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useStateContext } from '../../context/StateContext';

export default function SelectDate({ data }) {
  const [searchBtn, setSearchBtn] = useState("");
 
  const { 
          startDate, 
          setStartDate, 
          endDate, 
          setEndDate, 
          setEndTimeStamp, 
          setStartTimeStamp,
          setConfirmBtn,
          startTimeStamp,
          selectDepartment
        } = useStateContext()

  //const lastDateReport = data.data.slice(data.data.length-1, data.data.length)[0].Date
  const reportDateStart = startDate.toLocaleDateString()
  const reportDateEnd = endDate.toLocaleDateString()

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const formatDate = (date) =>{
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
     return yyyy + '-' + mm + '-' + dd;
  }

  const handleBtnOk = () =>{
    setConfirmBtn("OK");
    setSearchBtn("")
  }

  const handleSelect = (ranges) => {
    const startDateFormat = formatDate(ranges.selection.startDate)
    const startTimeStamp = new Date(startDateFormat).getTime()

    const endDateFormat = formatDate(ranges.selection.endDate)
    const endTimeStamp = new Date(endDateFormat).getTime()

    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate)

    setStartTimeStamp(startTimeStamp)
    setEndTimeStamp(endTimeStamp)
  }
  
  return (
      <div className=''>
        <button className='text-white border-none bg-red-700 text-16 rounded-full p-3 z-50 cursor-pointer' 
                type="button"
                onClick={() => setSearchBtn("Yes")}
                disabled={selectDepartment}
                >
          Select Date
        </button>

      {searchBtn && (
        <div className='flex flex-col'>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            // rangeColors={["#FD5B61"]}
            // minDate={new Date()}
          />
          <div className='flex py-5 px-40 font-semibold text-white space-x-10'>
            <button className=' bg-blue-600 px-5 py-2 rounded-md hover:scale-110 transition transform duration-200' onClick={() => handleBtnOk()}>OK</button>
            <button className=' bg-red-600 px-5 py-2 rounded-md hover:scale-110 transition transform duration-200' onClick={() => setSearchBtn("")}>Cancle</button>
          </div>
        </div>
      )}

        <div className="flex flex-col text-[#324d67] absolute right-[5%] bottom-[5%] w-[300px] leading-[1.3] text-end">
          <h5 className='mb-[12px] text-16 font-[500]'>Create Date</h5>
            {startTimeStamp ? 
              <p>From: <span className=' text-lg font-[900] mr-4'>{reportDateStart}</span>To: <span className='font-[900]'>{reportDateEnd}</span></p>
            : 
              <p className=' text-lg font-[900]'>All Suggestion Data</p>
            }
        </div>
      </div>
   
  )
}

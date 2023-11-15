import React, {useEffect, useState, useRef} from 'react'
import { useStateContext } from '../../context/StateContext'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StatisticalSuggestion from '../../components/suggestion/StatisticalSuggestion';
import SelectDate from '../../components/suggestion/SelectDate';
import PendingList from '../../components/suggestion/PendingList';
import ApprovedList from '../../components/suggestion/ApprovedList';
import ApprovalForm from '../../components/suggestion/ApprovalForm';
import ImplementedList from '../../components/suggestion/ImplementedList';
import ImplementedEdit from '../../components/suggestion/ImplementedEdit';
import RejectList from '../../components/suggestion/RejectList';
import AddNewForm from '../../components/suggestion/AddNewForm';

import BestSuggestionList from '../../components/suggestion/BestSuggestionList';



export default function suggestion({ mySuggestion }) {
  const inputRef = useRef(null);

  const [selectData, setSelectDate] = useState(mySuggestion)
  const [isSelected, setIsSelected] = useState();
  const [selectedFile, setSelectedFile] = useState("");

  const { pendingBtn, setPendingBtn, approvedBtn, setApprovedBtn, implementedBtn, setImplementedBtn, setRejectBtn, rejectBtn,
          getDataSuggestion, confirmBtn, setConfirmBtn, setUserAdmin, setSelectDepartment } = useStateContext();


  const pendingButton = () =>{
    setPendingBtn(true)
    setApprovedBtn(false)
    setImplementedBtn(false)
    setRejectBtn(false)
    setSelectDepartment(false)
  }

  const approvedButton = () =>{
    setPendingBtn(false)
    setApprovedBtn(true)
    setImplementedBtn(false)
    setRejectBtn(false)
    setSelectDepartment(false)
}

  const implementedButton = () => {
    setPendingBtn(false)
    setApprovedBtn(false)
    setImplementedBtn(true)
    setRejectBtn(false)
    setSelectDepartment(false)
  }

  const rejectButton = () => {
    setPendingBtn(false)
    setApprovedBtn(false)
    setImplementedBtn(false)
    setRejectBtn(true)
    setSelectDepartment(false)
  }

  const bestButton = () => {
    setPendingBtn(true)
    setApprovedBtn(true)
    setImplementedBtn(true)
    setRejectBtn(true)
    setSelectDepartment(true)
  }

  const addNewButton = () => {
    setPendingBtn(false)
    setApprovedBtn(false)
    setImplementedBtn(true)
    setRejectBtn(true)
    setSelectDepartment(false)
  }

  useEffect(() => {
    if (confirmBtn === "OK"){
        setSelectDate(getDataSuggestion(mySuggestion))
        setConfirmBtn("")
    }
  },[confirmBtn])



  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    if(event.target.files[0].name !== "Buffer3.xlsx"){
      setIsSelected("notOk");
    }else{
      setIsSelected("Ok");
    }
	}

  const handleSubmission = async () => {                 
		const formData = new FormData();

		formData.append('File', selectedFile);
        const importFile = await fetch('http://vnczc014b68l:3000/api/save_file/saveTXTFile', { method: 'POST', body: formData })
        const res = await importFile.json()
        
        if (res){
          setIsSelected("Thêm File thành công.")
        }
	};

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  const handleReload = async () => {         
    try {
      const resSuggestion = await fetch('http://vnczc014b68l:8000/suggestion/import')
      const dataSuggestion = await resSuggestion.json()
      // console.log(dataSuggestion)
      if (dataSuggestion.changeMysqlStatus==="insert_success"){
        toast('New Data is loaded success!', { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'top-center' })
      }

    } catch (error) {
      console.log(error);
    }
    
    setIsSelected("")
    resetFileInput()
	};

  const exportData = async () =>{
    const exportData = 'http://vnczc014b68l:3000/api/mySQL/suggestion/exportSuggestionData'
    console.log("exportData")
  }
 
  return (
    <div>
      {/* ----------Begin Banner area------- */}
        <div className=' px-10'>
          <div className='relative my-5 bg-[#dcdcdc] border rounded-[15px] h-auto md:leading-[0.9] leading-[1.3] px-[30px] py-[40px]'>
            <div>
              <h3 className='md:text-[4rem]'>WCM</h3>
              <h1 className='text-white md:text-[7em] mt-6 ml-[-20px] uppercase'>Suggestion</h1>
              <img src="/assets/suggestion.jpg" alt="headphones" className="absolute top-[5%] right-[1%] w-[349px] h-[218px]" />
              <ToastContainer />
            </div>

            <div className='flex gap-10 mt-10'>
              <div>
                  <h2 className=' text-lg font-bold mb-2'>Import File</h2>
                  <input ref={inputRef} type="file" name="file" onChange={changeHandler}/>
                  <div>
                    { isSelected == "Ok" ? 
                      (<button className='text-white border-none bg-red-700 text-16 rounded-full p-3 z-50 mt-5 cursor-pointer hover:scale-110 transition transform duration-200' 
                              type="button"
                              onClick={() => handleSubmission()}
                              >
                        OK
                      </button>
                      ): isSelected == "notOk" ? 
                        (<p className='mt-3 text-red-500'>Please import right file</p>
                      ): isSelected == "Thêm File thành công." ? 
                        <div>
                          <p className='mt-3 text-emerald-500'>{isSelected} <span className='text-sky-500'>Press below button to load the new data.</span></p>
                          <button className='text-white border-none bg-green-900 text-16 rounded-full p-3 z-50 mt-5 cursor-pointer hover:scale-110 transition transform duration-200' 
                              type="button"
                              onClick={() => handleReload()}
                            >
                              Load New Data
                            </button>
                        </div>
                      : null
                    }
                  </div>

                  <div className='mt-3'>
                    <a
                      className="text-black font-bold border-none text-16 rounded-lg z-50 cursor-pointer hover:scale-110 transition transform duration-200" 
                      href='http://vnczc014b68l:3000/api/mySQL/suggestion/exportSuggestionData'
                      //id="export"
                      //onClick={() => exportData()}
                    >
                        Click to Export Data    
                    </a>
                  </div>
              </div>

              <SelectDate data={ mySuggestion }/>

              <div className=''>
                <button className='text-white border-none bg-amber-500 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => pendingButton()}
                    >
                  Pending
                </button>
              </div>

              <div className=''>
                <button className='text-white border-none bg-blue-700 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => approvedButton()}
                    >
                  Approved
                </button>
              </div>

              <div className=''>
                <button className='text-white border-none bg-teal-600 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => implementedButton()}
                    >
                  Implemented
                </button>
              </div>

              <div className=''>
                <button className='text-white border-none bg-amber-700 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => rejectButton()}
                    >
                  Rject
                </button>
              </div>

              <div className=''>
                <button className='text-white border-none bg-indigo-700 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => bestButton()}
                    >
                  Best
                </button>
              </div>

              <div className=''>
                <button className='text-white border-none bg-zinc-600 text-16 rounded-lg p-3 z-50 cursor-pointer hover:scale-110 transition transform duration-200' 
                    type="button"
                    onClick={() => addNewButton()}
                    >
                  Add New
                </button>
              </div>

              

             

            </div>
          </div>
      </div>
    {/* ----------End Banner area------- */}


      <div className=' px-10'>

        {!pendingBtn && !approvedBtn && !implementedBtn && !rejectBtn? 
              <StatisticalSuggestion mySuggestion={selectData}/>
            : pendingBtn && !approvedBtn && !implementedBtn && !rejectBtn?
              <PendingList mySuggestion={selectData}/>
            : !pendingBtn && approvedBtn && !implementedBtn && !rejectBtn?
              <ApprovedList mySuggestion={selectData}/>
            : !pendingBtn && !approvedBtn && implementedBtn && !rejectBtn?
              <ImplementedList mySuggestion={selectData}/>
            : pendingBtn && approvedBtn && !implementedBtn && !rejectBtn?
              <ApprovalForm/>
            : !pendingBtn && approvedBtn && implementedBtn && !rejectBtn?
              <ImplementedEdit/>
            : !pendingBtn && !approvedBtn && !implementedBtn && rejectBtn?
              <RejectList mySuggestion={selectData}/>
            : !pendingBtn && !approvedBtn && implementedBtn && rejectBtn?
              <AddNewForm/>
               //<BestSuggestion/>
            : pendingBtn && approvedBtn && implementedBtn && rejectBtn?
              <BestSuggestionList mySuggestion={selectData}/>
            :
            null
        }
        
      </div>

    </div>
  )
}

export async function getServerSideProps() {
//  ----- Get data from MySQL------
  const resMySqlSuggestion = await fetch(`http://vnczc014b68l:3000/api/mySQL/suggestion/getSuggestion`)
  const mySuggestion = await resMySqlSuggestion.json()

  if (!mySuggestion) {

    return {
      notFound: true,
    }
  }

  return {
    props: {

      mySuggestion: mySuggestion.data,

    }, 
  }
}

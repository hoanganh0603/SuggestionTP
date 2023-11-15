import React, { createContext, useContext, useState, useEffect } from 'react';
//import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTimeStamp, setStartTimeStamp] = useState("");
  const [endTimeStamp, setEndTimeStamp] = useState("");

  //Suggestion
  const [confirmBtn, setConfirmBtn] = useState("")
  const [pendingBtn, setPendingBtn] = useState(false)
  const [approvedBtn, setApprovedBtn] = useState(false)
  const [implementedBtn, setImplementedBtn] = useState(false)
  const [rejectBtn, setRejectBtn] = useState(false)
  const [idApprove, setIDApprove] = useState("")
  const [idScore, setIDScore] = useState("")
  const [selectDepartment, setSelectDepartment] = useState(false)

  const [refresh, setRefresh] = useState("")
  const [emitSocketP11, setEmitSocketP11] = useState(false)
  const [emitSocketP12, setEmitSocketP12] = useState(false)
  const [emitSocketWH, setEmitSocketWH] = useState(false)


  const [showPopup, setShowPopup] = useState(false);

  const [userAdmin, setUserAdmin] = useState(false);

  //History design
  const [switchPage, setSwitchPage] = useState("")
  const [dataSearch, setDataSearch] = useState("")
  const [designNumber, setDesignNumber] = useState("")
  const [activeStatus, setActiveStatus] = useState(1)

  const processDateData = (dateData) =>{
    const dateTimeFormat = new Date(dateData)
    return dateTimeFormat.getTime()
  }

  const getDataSearch = (data) => {
    const listDataSearch = []
    if (data) {
      data.map((item) => {
      if(processDateData(item.date) >= startTimeStamp && processDateData(item.date) <= endTimeStamp){
        listDataSearch.push(item)
        }
      })
    }
    return listDataSearch
  }

  const getDataSuggestion = (data) => {
    const listDataSuggestion = []
    if (data) {
      data.map((item) => {
      if(processDateData(item.submit_date) >= startTimeStamp && processDateData(item.submit_date) <= endTimeStamp){
        listDataSuggestion.push(item)
        }
      })
    }
    return listDataSuggestion
  }


  //----handle data search Plate---
  const processDatePlate = (dateData) =>{
    const formatDate =  dateData.slice(6,10) + "-" + dateData.slice(3,5) + "-" + dateData.slice(0,2)
    const dateTimeFormat = new Date(formatDate)

    return dateTimeFormat.getTime()
  }

  const getDataSearchPlate = (data) => {
    var listDataSearch = []
    
    if (data) {
        for(var i=0; i<data.length; i++){
            if(processDatePlate(data[i].reportDate) === startTimeStamp){
                listDataSearch.push(data[i])
                }
            }
        }
    return listDataSearch
    }

  const getDataSearchLossForm = (data) => {
    var listDataLossForm = []
    
    if (data) {
        for(var i=0; i<data.length; i++){
            if(processDatePlate(data[i].date_record) === startTimeStamp){
                listDataLossForm.push(data[i])
                }
            }
        }
      return listDataLossForm
    }

 
  return (
    <Context.Provider
      value={{
        setStartDate,
        setEndDate,
        setStartTimeStamp,
        setEndTimeStamp,

        setConfirmBtn,
        setPendingBtn,
        setApprovedBtn,
        setImplementedBtn,
        setRejectBtn,
        setIDApprove,
        setIDScore,
        setSelectDepartment,

        setShowPopup,

        setRefresh,
        setEmitSocketP11,
        setEmitSocketP12,
        setEmitSocketWH,

        getDataSearch,
        getDataSuggestion,
        getDataSearchPlate,
        getDataSearchLossForm,

        setUserAdmin,

        setSwitchPage,
        setDataSearch,
        setDesignNumber,
        setActiveStatus,
        
        startDate,
        endDate,

        confirmBtn,
        pendingBtn,
        approvedBtn,
        implementedBtn,
        rejectBtn,
        idApprove,
        idScore,
        selectDepartment,

        startTimeStamp,
        refresh,
        emitSocketP11,
        emitSocketP12,
        emitSocketWH,

        showPopup,
        userAdmin,

        switchPage,
        dataSearch,
        designNumber,
        activeStatus
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
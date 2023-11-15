import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import TestPosition from './TestPosition';

export default function StatisticalSuggestion ({ mySuggestion }) {
    const { confirmBtn } = useStateContext();
    
    const [numSuggStatus, setNumSuggStatus] = useState(() =>{
        const arrApproved = mySuggestion.filter(filterApproved)
        const arrReject = mySuggestion.filter(filterReject)
        const arrImplement = mySuggestion.filter(filterImplement)
        const arrPending = mySuggestion.filter(filterPending)
        const arrBestSug = mySuggestion.filter(filterBestSug)
        const numByStatus = [mySuggestion.length, arrApproved.length, arrImplement.length, arrPending.length, arrReject.length, arrBestSug.length]
        return numByStatus
        })

    const [dataBarChart, setDataBarChart] = useState(() =>{
        const arrPrePrin = mySuggestion.filter(filterPrePrin)
        const arrLam = mySuggestion.filter(filterLam)
        const arrFin = mySuggestion.filter(filterFin)
        const arrMain = mySuggestion.filter(filterMain)
        const arrQA = mySuggestion.filter(filterQA )
        const arrWH = mySuggestion.filter(filterWH)

        const PPPending = arrPrePrin.filter(filterPending).length
        const LamPending = arrLam.filter(filterPending).length
        const FinPending = arrFin.filter(filterPending).length
        const MainPending = arrMain.filter(filterPending).length
        const QAPending = arrQA.filter(filterPending).length
        const WHPending = arrWH.filter(filterPending).length

        const PPApproved = arrPrePrin.filter(filterApproved).length
        const LamApproved = arrLam.filter(filterApproved).length
        const FinApproved = arrFin.filter(filterApproved).length
        const MainApproved = arrMain.filter(filterApproved).length
        const QAApproved = arrQA.filter(filterApproved).length
        const WHApproved = arrWH.filter(filterApproved).length

        const PPImplement = arrPrePrin.filter(filterImplement).length
        const LamImplement = arrLam.filter(filterImplement).length
        const FinImplement = arrFin.filter(filterImplement).length
        const MainImplement = arrMain.filter(filterImplement).length
        const QAImplement = arrQA.filter(filterImplement).length
        const WHImplement = arrWH.filter(filterImplement).length

        const barChartNum = [arrPrePrin.length, arrLam.length, arrFin.length, arrMain.length, arrQA.length, arrWH.length]
        const barChartApproved = [PPApproved, LamApproved, FinApproved, MainApproved, QAApproved, WHApproved]
        const barChartImplement = [PPImplement, LamImplement, FinImplement, MainImplement, QAImplement, WHImplement]
        const barChartPending = [PPPending, LamPending, FinPending, MainPending, QAPending, WHPending]
        return {barChartNum, barChartApproved, barChartImplement, barChartPending}
        })

    const calNumSuggestion = (selectDate) => {
        const arrApproved = selectDate.filter(filterApproved)
        const arrReject = selectDate.filter(filterReject)
        const arrImplement = selectDate.filter(filterImplement)
        const arrPending = selectDate.filter(filterPending)
        const arrBestSug = selectDate.filter(filterBestSug)
        const numByStatus = [selectDate.length, arrApproved.length, arrImplement.length, arrPending.length, arrReject.length, arrBestSug.length]
        return numByStatus
    }

    const calBarChart = (selectDate) => {
        const arrPrePrin = selectDate.filter(filterPrePrin)
        const arrLam = selectDate.filter(filterLam)
        const arrFin = selectDate.filter(filterFin)
        const arrMain = selectDate.filter(filterMain)
        const arrQA = selectDate.filter(filterQA )
        const arrWH = selectDate.filter(filterWH)

        const PPPending = arrPrePrin.filter(filterPending).length
        const LamPending = arrLam.filter(filterPending).length
        const FinPending = arrFin.filter(filterPending).length
        const MainPending = arrMain.filter(filterPending).length
        const QAPending = arrQA.filter(filterPending).length
        const WHPending = arrWH.filter(filterPending).length

        const PPApproved = arrPrePrin.filter(filterApproved).length
        const LamApproved = arrLam.filter(filterApproved).length
        const FinApproved = arrFin.filter(filterApproved).length
        const MainApproved = arrMain.filter(filterApproved).length
        const QAApproved = arrQA.filter(filterApproved).length
        const WHApproved = arrWH.filter(filterApproved).length

        const PPImplement = arrPrePrin.filter(filterImplement).length
        const LamImplement = arrLam.filter(filterImplement).length
        const FinImplement = arrFin.filter(filterImplement).length
        const MainImplement = arrMain.filter(filterImplement).length
        const QAImplement = arrQA.filter(filterImplement).length
        const WHImplement = arrWH.filter(filterImplement).length

        const barChartNum = [arrPrePrin.length, arrLam.length, arrFin.length, arrMain.length, arrQA.length, arrWH.length]
        const barChartApproved = [PPApproved, LamApproved, FinApproved, MainApproved, QAApproved, WHApproved]
        const barChartImplement = [PPImplement, LamImplement, FinImplement, MainImplement, QAImplement, WHImplement]
        const barChartPending = [PPPending, LamPending, FinPending, MainPending, QAPending, WHPending]
        return {barChartNum, barChartApproved, barChartImplement, barChartPending}
    }
    
    useEffect(() => {
            setNumSuggStatus(calNumSuggestion(mySuggestion))
            setDataBarChart(calBarChart(mySuggestion))
    },[confirmBtn])

    // useEffect(() => {
    //     if (confirmBtn === "OK"){
    //         setNumSuggStatus(calNumSuggestion(getDataSuggestion(mySuggestion)))
    //         setDataBarChart(calBarChart(getDataSuggestion(mySuggestion)))
    //         setConfirmBtn("")
    //     }
    // },[confirmBtn])
    

    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, ChartDataLabels);
    const options1 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            },
          title: {
            display: true,
            text: 'Total Suggestion',
            },
          datalabels: { // This code is used to display data values
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold',
                size: 16
                }
            },
        },
      };
    const data1 = {
        labels: ['Pre-Printing', 'Laminating', 'Finishing', 'Maintenace', 'QA Team', 'Warehouse'],
        datasets: [{
          label: '# Suggestion',
          data: dataBarChart.barChartNum,
          backgroundColor: ['#006699' ],
          borderColor: ['#006666'],
          borderWidth: 1
        }]
      }

    const options2 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            },
          title: {
            display: true,
            text: 'Approved Suggestion',
            },
          datalabels: { // This code is used to display data values
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold',
                size: 16
                }
            },
        },
      };
    const data2 = {
        labels: ['Pre-Printing', 'Laminating', 'Finishing', 'Maintenace', 'QA Team', 'Warehouse'],
        datasets: [{
          label: '# Suggestion',
          data: dataBarChart.barChartApproved,
          backgroundColor: ['#3366FF' ],
          borderColor: ['#155e75'],
          borderWidth: 1
        }]
      }


    const options3 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            },
          title: {
            display: true,
            text: 'Implemented Suggestion',
            },
          datalabels: { // This code is used to display data values
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold',
                size: 16
                }
            },
        },
      };
    const data3 = {
        labels: ['Pre-Printing', 'Laminating', 'Finishing', 'Maintenace', 'QA Team', 'Warehouse'],
        datasets: [{
          label: '# Suggestion',
          data: dataBarChart.barChartImplement,
          backgroundColor: ['#00CCCC'],
          borderColor: ['#00CCCC'],
          borderWidth: 1
        }]
      }


      const options4 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            },
          title: {
            display: true,
            text: 'Pending By Department',
            },
          datalabels: { // This code is used to display data values
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold',
                size: 16
                }
            },
        },
      };
    const data4 = {
        labels: ['Pre-Printing', 'Laminating', 'Finishing', 'Maintenace', 'QA Team', 'Warehouse'],
        datasets: [{
          label: '# Pending',
          data: dataBarChart.barChartPending,
          backgroundColor: ['rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 206, 86, 1)',],
          borderWidth: 1
        }]
      }


  return (
    <div>
        <div className='border border-green-800 rounded-lg p-5'>
            <div className='grid grid-cols-6 gap-4 '>
                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-sky-700 mb-1'>{numSuggStatus[0]}</h1>
                    <h3 className=' text-base mb-5'>Total Suggestion</h3>
                </div>

                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-blue-700 mb-1'>{numSuggStatus[1]}</h1>
                    <h3 className=' text-base mb-5'>Approved</h3>
                </div>

                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-teal-600 mb-1'>{numSuggStatus[2]}</h1>
                    <h3 className=' text-base mb-5'>Implemented</h3>
                </div>

                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-indigo-700 mb-1'>{numSuggStatus[5]}</h1>
                    <h3 className=' text-base mb-5'>Best Suggestion</h3>
                </div>

                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-amber-500 mb-1'>{numSuggStatus[3]}</h1>
                    <h3 className=' text-base mb-5'>Pending</h3>
                </div>

                <div className='text-center'>
                    <h1 className='text-[3rem] font-extrabold text-amber-700 mb-1'>{numSuggStatus[4]}</h1>
                    <h3 className=' text-base mb-5'>Reject</h3>
                </div>
            </div>
       

        {/* ------------Barchart--------------- */}
            <div className='row' >
                {/* Total suggesstion */}
                <div className=' grid grid-cols-2'>
                    <div className='flex max-h-[50vh] justify-center align-middle mt-10 px-10'>
                        <Bar
                            data={data1}
                            // width={400}
                            // height={200}
                            options={options1}
                        />
                    </div>
                     {/* Implement suggesstion */}
                     <div className='flex max-h-[50vh] justify-center align-middle mt-10 px-10'>
                        <Bar
                            data={data3}
                            // width={400}
                            // height={200}
                            options={options3}
                        />
                    </div>
                </div>

                <div className=' grid grid-cols-2'>
                   {/* Approved suggesstion */}
                   <div className='flex max-h-[50vh] justify-center align-middle mt-10 px-10'>
                        <Bar
                            data={data2}
                            // width={400}
                            // height={200}
                            options={options2}
                        />
                    </div>
                    {/* Pending suggesstion */}
                    <div className='flex max-h-[50vh] justify-center align-middle mt-10 px-10'>
                        <Bar
                            data={data4}
                            // width={400}
                            // height={200}
                            options={options4}
                        />
                    </div>
                </div>
            </div>
        </div>
        {/* //<TestPosition/> */}
        
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

    const filterBestSug = (item) => {
        if (item.status === "Best Suggestion") {
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





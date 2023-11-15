import React from 'react'

export default function TestPosition() {
  return (
    <div className=' relative bg-slate-500 w-full h-80'>
        <div className=' grid grid-flow-row place-content-center'>
            <div className='border-t-4 border-red-600 w-40 rotate-45 ml-28'></div>
            <div className='border-t-4 border-red-600 w-40 rotate-[135deg]'></div>
            <div className=' absolute left-10 w-5 h-5 bg-green-400 rounded-full text-sm text-center'>8</div>
        </div>
    </div>
  )
}

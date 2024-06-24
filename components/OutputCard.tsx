'use client'
import React from 'react'
import useMap  from '@/hooks/useMap';

const OutputCard = () => {
  const {distance, source, destination} = useMap();

  return (
    <div className='distance h-[158px] w-[351px] sm:w-[490px] border border-slate-300/70 rounded-lg overflow-hidden'>
        <div className='bg-white flex justify-between h-[50%] items-center px-5 '>
            <h2 className='text-[#1E2A32] font-[700] text-[20px] ibm-plex-sans'>Distance</h2>

            <p className='text-[#0079ff] font-[700] text-[30px] ibm-plex-sans'>{distance} kms</p>
        </div>
        <div className='bg-[#E9EEF2] h-[50%] flex items-center justify-center px-7'>
            <p className='text-[#1E2A32]  text-[12px] leading-[14.4px] ibm-plex-sans'>The distance between <span className='font-[700]'>{source}</span> and <span className='font-[700]'>{destination}</span> via the selected route is <span className='font-[700]'>{distance} kms.</span></p>
        </div>
    </div>
  )
}

export default OutputCard
'use client'
import React, { SetStateAction, createContext, useState } from 'react'

interface mapContextType {
    distance: number,
    setDistance: React.Dispatch<SetStateAction<number>>,
    source: string,
    setSourceName: React.Dispatch<SetStateAction<string>>,
    destination: string,
    setDestinationName: React.Dispatch<SetStateAction<string>>,
    sourceCoords: ([number, number]),
    setSourceCoords: React.Dispatch<SetStateAction<([number, number])>>
    destCoords:( [number, number]),
    setDestCoords: React.Dispatch<SetStateAction<([number, number])>>
    driveMode: string,
    setDriveMode: React.Dispatch<SetStateAction<string>>,
}

export const mapContext = createContext<mapContextType>({
    distance:0,
    setDistance:()=>{},
    source: '',
    setSourceName:()=>{},
    destination: '',
    setDestinationName: ()=>{},
    sourceCoords: [0,0],
    setSourceCoords: ()=>{},
    destCoords: [0,0],
    setDestCoords: ()=>{},
    driveMode: "drive",
    setDriveMode: ()=>{},
})

const mapProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const [distance, setDistance] = useState(0)
    const [source, setSourceName] = useState('Kashmir')
    const [destination, setDestinationName] = useState('Mumbai')
    const [sourceCoords, setSourceCoords] = useState<[number, number]>([34.083658, 74.797368])
    const [destCoords, setDestCoords] = useState <[number, number]>([19.0785451, 72.878176])
    const [driveMode, setDriveMode] = useState ("drive")

  return (
    <mapContext.Provider value={{distance, setDistance, source, setSourceName, destination, setDestinationName, destCoords, setDestCoords, sourceCoords, setSourceCoords, driveMode, setDriveMode}}>
        {children}
    </mapContext.Provider>
  )
}

export default mapProvider
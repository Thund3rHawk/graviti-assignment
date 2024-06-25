"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMap from "@/hooks/useMap";
import Image from "next/image";
import sourceLogo from '@/public/Source.png'
import waypointLogo from '@/public/Waypoints.png'
import destinationLogo from '@/public/Destination.png'
import TransitOption from "./TransitOption";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const InputForm = () => {
  const [source, setSource] = useState("Kashmir");
  const [destination, setDestination] = useState("Mumbai");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<any[]>([]);
  const [sourceCoordinates, setSourceCoordinates] = useState<[number, number]>();
  const [destCoordinates, setDestCoordinates] = useState<[number, number]>();

  const { setDestinationName, setSourceName, setDestCoords, setSourceCoords } = useMap();

  const calculateDistance = () => {
    setDestinationName(destination);
    setSourceName(source);
    if (sourceCoordinates) setSourceCoords (sourceCoordinates);
    if (destCoordinates) setDestCoords (destCoordinates) 
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (source.length > 2) {
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${source}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
          );
          setSuggestions(response.data.features);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [source]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length > 2) {
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
          );
          setDestSuggestions(response.data.features);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setDestSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [destination]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
    const matchedSuggestion = suggestions.find(
      (suggestion) => suggestion.properties.formatted === event.target.value
    );

    if (matchedSuggestion) {
      handleSelect(matchedSuggestion);
    }
  };

  const handleChangeDest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);

    const matchedSuggestion = destSuggestions.find(
      (suggestion) => suggestion.properties.formatted === event.target.value
    );

    if (matchedSuggestion) {
      handleSelectDest(matchedSuggestion);
    }
  };

  const handleSelect = (suggestion: any) => {
    setSource(suggestion.properties.formatted);
    const lat = suggestion.geometry.coordinates[1];
    const lon = suggestion.geometry.coordinates[0];
    setSourceCoordinates([lat, lon]);
    setSuggestions([]);
  };
  const handleSelectDest = (suggestion: any) => {
    setDestination(suggestion.properties.formatted);
    const lat = suggestion.geometry.coordinates[1];
    const lon = suggestion.geometry.coordinates[0];
    setDestCoordinates([lat, lon]);
    setDestSuggestions([]);
  };

  return (
    <div className="xl:w-[490px]">
      <div className="items-center sm:flex sm:justify-between">
        <div className="flex flex-col  w-[350px]">
          <span className="hidden sm:block text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Origin
          </span>
          <div className="border border-slate-300/70 px-2 mb-4 lg:mb-0 2xl:mb-10 h-[40px] 2xl:h-[45px] sm:w-[250px] rounded-md flex items-center bg-white">
            <Image alt= 'source icon' src ={sourceLogo} className="border border-black rounded-full"/>
            <input
              type="text"
              list="suggestions"
              className="px-2 border-none outline-none flex-grow text-lg text-gray-700 bg-transparent"
              value={source}
              onChange={handleChange}
            />
          </div>

          <datalist id="suggestions">
            {suggestions.map((suggestion) => (
              <option
                key={suggestion.properties.osm_id}
                value={suggestion.properties.formatted}
              />
            ))}
          </datalist>

          <span className="hidden sm:block text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Stop
          </span>
          <div className="border border-slate-300/70 px-2 mb-1 lg:mb-0 2xl:mb-3 h-[40px] 2xl:h-[45px] sm:w-[250px] rounded-md flex items-center bg-white">
          <Image alt= 'waypoint icon' src ={waypointLogo} />
            <input
              type="text"
              placeholder="Enter Waypoints"
              className="px-2 border-none outline-none flex-grow text-lg text-gray-700 bg-transparent"
              />
          </div>
          <div className="flex justify-end sm:w-[250px] w-full">
            <button className="mb-2">
              <span><ControlPointIcon fontSize="small"/>&nbsp;</span>             
              Add another stop</button>
          </div>
          <span className= "hidden sm:block text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Destination
          </span>
          <div className="border border-slate-300/70 px-2 mb-4 lg:mb-0 2xl:mb-10 h-[40px] 2xl:h-[45px]  sm:w-[250px] rounded-md flex items-center bg-white">
            <Image alt= 'destination icon' src ={destinationLogo} />

            <input
              type="text"
              list="destSuggestions"
              className="px-2 border-none outline-none flex-grow text-lg text-gray-700 bg-transparent"
              value={destination}
              onChange={handleChangeDest}
            />
          </div>
          <datalist id="destSuggestions">
            {destSuggestions.map((suggestion) => (
              <option
                key={suggestion.properties.osm_id}
                value={suggestion.properties.formatted}
              />
            ))}
          </datalist>

          <span className="text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Transite Mode
          </span>
          <TransitOption/>
        </div>
        <div className="text-center">
          <button
            onClick={calculateDistance}
            className="bg-[#1B31A8] text-white font-[600] text-[18px] leading-[20px] rounded-[32px] w-[141px] sm:h-[62px] h-[40px] ibm-plex-sans mb-6 sm:mb-16"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;

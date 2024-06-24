"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMap from "@/hooks/useMap";
import Image from "next/image";
import sourceLogo from '@/public/Source.png'
import TransitOption from "./TransitOption";

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
          <span className="text-black text-[14px] leading-[16.8px] font-[400] sm:my-2 ibm-plex-sans">
            Origin
          </span>
          <input
            type="text"
            list="suggestions"
            className="border border-slate-300/70 px-4 mb-3 sm:mb-5 xl:mb-10 h-[45px] sm:w-[250px] rounded-md relative"
            value={source}
            onChange={handleChange}
          />
            {/* <Image alt = "source logo" src = {sourceLogo}/> */}

          <datalist id="suggestions">
            {suggestions.map((suggestion) => (
              <option
                key={suggestion.properties.osm_id}
                value={suggestion.properties.formatted}
              />
            ))}
          </datalist>

          <span className="text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Stop
          </span>
          <input
            type="text"
            className="border border-slate-300/70 px-4 mb-3 sm:mb-5 xl:mb-10 h-[45px] sm:w-[250px] rounded-md"
          />

          <span className="text-black text-[14px] leading-[16.8px] font-[400] my-2 ibm-plex-sans">
            Destination
          </span>
          <input
            type="text"
            list="destSuggestions"
            className="border border-slate-300/70 px-4 mb-6 sm:mb-5 xl:mb-10 h-[45px] sm:w-[250px] rounded-md"
            value={destination}
            onChange={handleChangeDest}
          />
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

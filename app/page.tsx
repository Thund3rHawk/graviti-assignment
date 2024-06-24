"use client";
import InputForm from "@/components/InputForm";
// import Map from "@/components/Map";
import OutputCard from "@/components/OutputCard";
import Image from "next/image";
import Logo from "@/public/graviti_logo.png";
import dynamic from "next/dynamic";

const hardcodedOrigin = { lat: 37.7749, lng: -122.4194 }; // San Francisco, CA
const hardcodedDestination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles, CA
const hardcodedWaypoints = [
  { location: { lat: 36.7783, lng: -119.4179 }, stopover: true }, // Fresno, CA
  { location: { lat: 35.3733, lng: -119.0187 }, stopover: true }, // Bakersfield, CA
];

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return (
    <>
    {/* Navbar */}
      <div className="h-[9vh] hidden sm:flex sm:items-center">
        <Image
          src={Logo}
          alt="logo"
          height={69}
          width={160}
          className="mx-16"
        />
      </div>
      <div className="sm:h-[91vh] bg-[#E9EEF2]">
        <h2 className="hidden sm:text-center text-[#1B31A8] font-[400] work-sans text-[20px] leading-[24px] pt-10">
          Let&apos;s calculate the <b>distance </b>form Google maps
        </h2>
        <div className="sm:flex sm:justify-center">
          <div className="sm:container flex flex-col-reverse sm:flex-row justify-between ">
            <div className="sm:mx-32 my-10 sm:my-20 flex flex-col items-center sm:justify-between ">
              <InputForm />
              <OutputCard />
            </div>
            <div className="sm:mx-32 sm:my-20">
              <Map/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

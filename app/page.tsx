"use client";
import InputForm from "@/components/InputForm";
import OutputCard from "@/components/OutputCard";
import Image from "next/image";
import Logo from "@/public/graviti_logo.png";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('../components/Map'), { ssr: false });



export default function Home() {
  return (
    <>
      <div className="h-[9vh] hidden sm:flex sm:items-center">
        <Image
          src={Logo}
          alt="logo"
          height={60}
          width={160}
          className="mx-16"
        />
      </div>
      <div className="2xl:h-[91vh] xl:h-[91vh] bg-[#E9EEF2]">
        <h2 className= "hidden sm:block text-center text-[#1B31A8] font-[400] work-sans text-[20px] leading-[24px] pt-10">
          Let&apos;s calculate the <b>distance </b>form Google maps
        </h2>
        <div className="sm:flex sm:justify-center">
          <div className="sm:container flex flex-col-reverse sm:flex-row justify-between ">
            <div className="2xl:mx-32 my-6 2xl:my-14 lg:mx-10 flex flex-col items-center sm:justify-between">
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

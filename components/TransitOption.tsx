import React, { useState } from "react";
import Dropdown, { Option } from "react-dropdown";
import useMap from "@/hooks/useMap";

const TransitOption = () => {
  const options:Option[] = [
    { value: "drive", label: "Drive" },
    { value: "walk", label: "Walk" },
    { value: "transit", label: "Transit" },
    { value: "bicycle", label: "Bicycle" },
  ];
  const defaultOption = options[0];
  const [selectOption, setSelectOption] = useState(defaultOption);
  const { setDriveMode } = useMap();

  const handleChange = (options: any) => {
    console.log(options);
    setDriveMode(options.value);
    setSelectOption(options.value);
  };

  return (
    <div className="border border-slate-300/70 mb-3 lg:mb-0 2xl:mb-10 h-[45px] sm:w-[250px] rounded-md bg-white">
      <Dropdown
        options={options}
        value={selectOption}
        onChange={handleChange}
        placeholder="Select an option"
        className="sm:mb-10 h-[45px] sm:w-[250px] z-10 absolute py-2 px-4"
        arrowClosed={<span className="arrow-closed" />}
        arrowOpen={<span className="arrow-open" />}
      />
    </div>
  );
};

export default TransitOption;
